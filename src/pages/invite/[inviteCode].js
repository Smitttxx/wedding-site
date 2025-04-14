// Updated GuestPage with validation scroll and ref wiring

import {useRouter} from 'next/router';
import {useRef, Fragment} from 'react';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import PartyHeader from '../../components/PartyHeader';
import AccommodationOptions from '../../components/AccommodationOptions';
import FridayPartySection from '../../components/FridayPartySection';
import BusOption from '@/components/BusOption';
import DietaryNotes from '@/components/DietaryNotes';
import Layout from '@/components/Layout';
import RSVP from '../../components/RSVP';
import {Section, SectionHeading} from '@/components/Section';
import BusInfoOption from "@/components/BusInfoOption";
import LoadingIndicator from '@/components/LoadingOverlay';
import {TartanInfoBox} from '@/components/TartanInfoBox';
import NavBar from "@/components/NavBar";
import {motion, AnimatePresence} from 'framer-motion';
import {GoldInfoBox} from "@/components/GoldInfoBox";
import {
  faChild,
  faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';

const Page = styled.div`
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
  font-family: ${props => props.theme.fonts.base};
  color: ${props => props.theme.colors.text};
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.7),
    0 0 0 4px ${props => props.theme.colors.accent},
    0 0 12px 4px ${props => props.theme.colors.accent},
    inset 0 0 6px rgba(0, 0, 0, 0.2);
`;

const RefContainer = styled.div`
padding: 1px;
text-align: center;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  font-style: italic;
  text-align: center;
  font-size: 28px;
`;

const InfoNote = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #e6f2e6;
  border-left: 4px solid ${props => props.theme.colors.accent};
  font-size: 0.95rem;
  color: #333;
  border-radius: ${props => props.theme.borderRadius};
`;

const WarningText = styled.p`
  color: ${props => props.theme.colors.error};
  font-weight: bold;
  margin-bottom: 1rem;
`;

const RSVPWrapper = styled.div`
display: flex; 
flex-direction: row; 
gap: 10px;
justify-content: center;
flex-wrap: wrap;
margin-top: 3rem;
`;

const FinalCTA = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.95rem;
  line-height: 1.4;
  color: ${props => props.theme.colors.text};

  strong {
    display: block;
    font-size: 1.15rem;
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.fonts.heading};
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export default function GuestPage() {
  const router = useRouter();
  const {inviteCode} = router.query;

  const [party, setParty] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState([]);
  const [message, setMessage] = useState('');
  const [fridayParty, setFridayParty] = useState(null);
  const [needsBus, setNeedsBus] = useState(null);
  const [accommodationOption, setAccommodationOption] = useState(null);
  const [dietary, setDietary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rsvpLocked, setIsRsvpLocked] = useState(false);
  const [allSaidNo, setAllSaidNo] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [apiError, setApiError] = useState('');
  const hasSelectedOnsite = accommodationOption === 'onsite';

  const [errors, setErrors] = useState({
    rsvp: [],
    accommodation: false,
    fridayParty: false,
    needsBus: false
  });

  const rsvpRef = useRef(null);
  const accommodationRef = useRef(null);
  const fridayRef = useRef(null);
  const busRef = useRef(null);

  const scrollToFirstError = () => {
    if (errors.rsvp.length) rsvpRef.current?.scrollIntoView({behavior: 'smooth'});
    else if (errors.accommodation) accommodationRef.current?.scrollIntoView({behavior: 'smooth'});
    else if (errors.fridayParty) fridayRef.current?.scrollIntoView({behavior: 'smooth'});
    else if (errors.needsBus) busRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const validateForm = () => {
    const allSaidNo = formData.every(g => g.rsvp === 'No');
    const someoneSaidYes = formData.some(g => g.rsvp === 'Yes');
    const isOffsite = accommodationOption === 'other';

    const newErrors = {
      rsvp: formData.filter(g => g.rsvp === null).map(g => g.id),
      accommodation: someoneSaidYes && accommodationOption === null,
      fridayParty: someoneSaidYes && fridayParty === null,
      needsBus: someoneSaidYes && isOffsite && needsBus === null
    };

    setErrors(newErrors);

    const hasErrors =
      newErrors.rsvp.length > 0 ||
      newErrors.accommodation ||
      newErrors.fridayParty ||
      newErrors.needsBus;

    if (hasErrors) scrollToFirstError();
    return !hasErrors;
  };

  const fetchParty = async () => {
    setIsFetching(true);
    try {
      const res = await axios.get(`/api/invite/${inviteCode}`);
      const data = res.data;
  
      const allSaidYes = data.guests.every(g => g.rsvp === 'Yes');
      const allSaidNo = data.guests.every(g => g.rsvp === 'No');
  
      if (data.paid || allSaidYes) {
        router.push(`/accommodationDetails/${inviteCode}`);
      } else {
        // Either at least one RSVP is pending, or all said no
        router.push(`/invite/${inviteCode}`);
      }      
  
      setAllSaidNo(allSaidNo);
      setParty(data);
      setFormData(data.guests.map(g => ({ ...g, rsvp: g.rsvp ?? null })));
      setFridayParty(typeof data.fridayParty === 'boolean' ? data.fridayParty : null);
      setNeedsBus(typeof data.needsBus === 'boolean' ? data.needsBus : null);
      setAccommodationOption(data.accommodationOption ?? null);
      setDietary(data.dietary ?? '');
      setIsRsvpLocked(data.rsvpLocked);
      console.log(data)
    } catch (error) {
      console.error('Error fetching party:', error);
      setApiError('Something went wrong while loading your invite. Please try again shortly or contact us!');
    } finally {
      setIsFetching(false);
    }
  };  

  useEffect(() => {
    if (!router.isReady) return;
    if (!sessionStorage.getItem('hasAccess')) {
      router.replace('/invite');
      return;
    }
  
    if (router.query.inviteCode) {
      fetchParty();
    }
  }, [router.isReady, router.query.inviteCode]);
  
  const handleChange = (index, key, value) => {
    const updated = [...formData];
    updated[index][key] = value;
    setFormData(updated);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const everyoneSaidNo = formData.every(g => g.rsvp === 'No');
    const attending = formData.some(g => g.rsvp === 'Yes');
  
    const updatedPartyPayload = {
      partyId: party.id,
      guests: formData,
      dietary,
      rsvpLocked: everyoneSaidNo,
      accommodationOption,
      fridayParty,
      needsBus
    };
  
    // Adjust guestType if they said "no" to on-site
    if (party.guestType === 'OnSite' && accommodationOption === 'other') {
      updatedPartyPayload.guestType = 'OtherAccommodation';
    }
  
    try {
      await axios.post('/api/invite/update', updatedPartyPayload);
  
      router.push(
        attending && accommodationOption === 'onsite'
          ? `/accommodationDetails/${inviteCode}`
          : `/confirmed/${inviteCode}`
      );
    } catch (err) {
      console.error('Error saving RSVP:', err);
      setMessage('Something went wrong while saving. Please try again.');
      setIsLoading(false);
    }
  };  

  if (isFetching || isLoading) {
    return (
      <Fragment>
        <NavBar />
        <Layout>
          <Page>
            <LoadingIndicator
              title={isLoading ? 'Saving your RSVP...' : 'Loading your invite...'}
              subtitle={isLoading ? 'Hold tight, we’re just wrapping it up.' : 'Please wait while we load your details.'}
            />
            {apiError && (
              <TartanInfoBox error style={{ marginTop: '2rem' }}>
                {apiError}
              </TartanInfoBox>
            )}
          </Page>
        </Layout>
      </Fragment>
    );
  }
  
  if (rsvpLocked) {
    return (
      <Fragment>
        <NavBar />
        <Layout>
          <Page>
            <PartyHeader party={party} />
            <Section ref={rsvpRef}>
              <SectionHeading>RSVP</SectionHeading>
              <RSVPWrapper>
                {formData.map((guest, index) => (
                  <RSVP
                    key={guest.id}
                    guest={guest}
                    index={index}
                    handleChange={handleChange}
                    rsvpDisabled={party.rsvpLocked}
                  />
                ))}
              </RSVPWrapper>
              <Message>Sorry you can’t make it – we’ll miss you! Let us know if your plans change and you are able to make it!</Message>
            </Section>
          </Page>
        </Layout>
      </Fragment>
    );
  }

  const hasChildrenInParty = party?.guests?.some(g => g.isChild || g.isBaby) || false;

  return (
    <Fragment>
      <NavBar />

      <Layout>
        <Page>
          {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
          <PartyHeader party={party} />

          <Section ref={rsvpRef}>
            <SectionHeading>RSVP</SectionHeading>
            <RSVPWrapper>
              {errors.rsvp.length > 0 && <WarningText>Please RSVP for all guests.</WarningText>}
              {formData.map((guest, index) => (
                <RSVP
                  key={guest.id}
                  guest={guest}
                  index={index}
                  handleChange={handleChange}
                  rsvpDisabled={party.rsvpLocked}
                />
              ))}
              {/* Childcare Note */}
              {hasChildrenInParty && (
                <GoldInfoBox icon={faChild}>
                  Kids are invited — yay! Wedding nannies will be on hand with fun activities on the big day (ball pits, crafts, games) to keep them entertained while you celebrate.
                </GoldInfoBox>
              )}
            </RSVPWrapper>
          </Section>

          {formData.length > 0 && formData.every(g => g.rsvp === 'No') ? (
            <AnimatePresence>
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.4}}
              >
                <Message>Sorry you can’t make it – we’ll miss you! Let us know if your plans change and you are able to make it!</Message>
                <Button onClick={handleSave}>
                  💾 Save RSVP
                </Button>
              </motion.div>
            </AnimatePresence>

          ) : (
            <>
              <RefContainer ref={accommodationRef}>
                <AccommodationOptions
                    guestType={party.guestType}
                  accommodationOption={accommodationOption}
                  setAccommodationOption={setAccommodationOption}
                  needsBus={needsBus}
                  setNeedsBus={setNeedsBus}
                  fullWidth
                />
                {errors.accommodation && <WarningText>Please choose your accommodation preference.</WarningText>}
              </RefContainer>

              <AnimatePresence>
                {hasSelectedOnsite && (
                  <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.4}}
                  >
                    <GoldInfoBox icon={faCircleExclamation}>
                      <span>
                        Please continue to the next page once RSVPd to view and pay for your accommodation. If we don’t receive payment by <strong>June 1st 2025</strong>, we may need to offer your room to another guest.
                      </span>
                    </GoldInfoBox>
                  </motion.div>
                )}
              </AnimatePresence>

              <RefContainer ref={busRef}>
                {accommodationOption === "other"
                  ? <BusOption needsBus={needsBus} setNeedsBus={setNeedsBus} />
                  : <BusInfoOption />
                }
                {errors.needsBus && <WarningText>Please let us know if you need a bus.</WarningText>}
              </RefContainer>

              <RefContainer ref={fridayRef}>
                <FridayPartySection
                  fridayParty={fridayParty}
                  setFridayParty={setFridayParty}
                />
                {errors.fridayParty && <WarningText>Let us know about the welcome party.</WarningText>}
              </RefContainer>

              <DietaryNotes dietary={dietary} setDietary={setDietary} />
              <Section>
                <SectionHeading>All sounds good?</SectionHeading>
                {hasSelectedOnsite ? (
                  <>Save your RSVP below and continue to the next page to confirm your accommodation and secure your on-site room.</>
                ) : (
                  <>Save your RSVP below — we’ll keep you posted about the big day!</>
                )}
              </Section>
              {errors.rsvp.length > 0 && <TartanInfoBox error>Please RSVP for all guests.</TartanInfoBox>}
              {errors.accommodation && <TartanInfoBox error>Please choose your accommodation preference.</TartanInfoBox>}
              {errors.needsBus && <TartanInfoBox error>Please let us know if you need a bus.</TartanInfoBox>}
              {errors.fridayParty && <TartanInfoBox error>Let us know about the welcome party.</TartanInfoBox>}
              {message && <TartanInfoBox error>{message}</TartanInfoBox>}

              <Button onClick={handleSave}>
                {hasSelectedOnsite ? 'Save RSVP & Go to Accommodation Details' : 'Save RSVP'}
              </Button>
              {message && <Message>{message}</Message>}
            </>
          )}
        </Page>
      </Layout>
    </Fragment>
  );
}