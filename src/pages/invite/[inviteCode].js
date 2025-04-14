// pages/invite/[inviteCode].js

import { useRouter } from 'next/router';
import { useRef, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Confetti from 'react-confetti';
import Layout from '@/components/Layout';
import NavBar from '@/components/NavBar';
import RSVP from '@/components/RSVP';
import PartyHeader from '@/components/PartyHeader';
import AccommodationOptions from '@/components/AccommodationOptions';
import FridayPartySection from '@/components/FridayPartySection';
import BusOption from '@/components/BusOption';
import BusInfoOption from '@/components/BusInfoOption';
import DietaryNotes from '@/components/DietaryNotes';
import { Section, SectionHeading } from '@/components/Section';
import LoadingIndicator from '@/components/LoadingOverlay';
import { TartanInfoBox } from '@/components/TartanInfoBox';
import { GoldInfoBox } from '@/components/GoldInfoBox';
import { faChild, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import {Page} from "@/components/Page";

const RSVPWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
`;

const RefContainer = styled.div`
  padding: 1px;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  width: 100%;
  background: ${props => props.theme.colors.primary};
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border-radius: ${props => props.theme.borderRadius};
  border: none;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const Message = styled.p`
  font-style: italic;
  text-align: center;
  font-size: 1.25rem;
  margin-top: 1rem;
`;

export default function GuestPage() {
  const router = useRouter();
  const { inviteCode } = router.query;

  const [party, setParty] = useState(null);
  const [formData, setFormData] = useState([]);
  const [accommodationPreference, setAccommodationPreference] = useState(null);
  const [fridayParty, setFridayParty] = useState(null);
  const [needsBus, setNeedsBus] = useState(null);
  const [dietary, setDietary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rsvpLocked, setIsRsvpLocked] = useState(false);
  const [apiError, setApiError] = useState('');
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

  const fetchParty = async () => {
    try {
      const res = await axios.get(`/api/invite/${inviteCode}`);
      const data = res.data;

      setParty(data);
      setFormData(data.guests.map(g => ({ ...g, rsvp: g.rsvp ?? null })));
      setFridayParty(typeof data.fridayParty === 'boolean' ? data.fridayParty : null);
      setNeedsBus(typeof data.needsBus === 'boolean' ? data.needsBus : null);
      setDietary(data.dietary ?? '');
      setRsvpLocked(data.rsvpLocked);
    } catch (err) {
      console.error(err);
      setApiError('Something went wrong loading your invite.');
    }
  };

  useEffect(() => {
    if (router.isReady && sessionStorage.getItem('hasAccess')) {
      fetchParty();
    } else {
      router.replace('/invite');
    }
  }, [router.isReady]);

  const validateForm = () => {
    const someoneSaidYes = formData.some(g => g.rsvp === 'Yes');
    const isOffsite = accommodationPreference === 'other';

    const newErrors = {
      rsvp: formData.filter(g => g.rsvp === null).map(g => g.id),
      accommodation: someoneSaidYes && accommodationPreference === null,
      fridayParty: someoneSaidYes && fridayParty === null,
      needsBus: someoneSaidYes && isOffsite && needsBus === null
    };

    setErrors(newErrors);
    if (
      newErrors.rsvp.length ||
      newErrors.accommodation ||
      newErrors.fridayParty ||
      newErrors.needsBus
    ) {
      if (newErrors.rsvp.length) rsvpRef.current?.scrollIntoView({ behavior: 'smooth' });
      else if (newErrors.accommodation) accommodationRef.current?.scrollIntoView({ behavior: 'smooth' });
      else if (newErrors.fridayParty) fridayRef.current?.scrollIntoView({ behavior: 'smooth' });
      else if (newErrors.needsBus) busRef.current?.scrollIntoView({ behavior: 'smooth' });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const attending = formData.some(g => g.rsvp === 'Yes');

    const payload = {
      partyId: party.id,
      guests: formData,
      dietary,
      rsvpLocked: true,
      fridayParty,
      needsBus
    };

    if (party.guestType === 'OnSite' && accommodationPreference === 'other') {
      payload.guestType = 'OtherAccommodation';
    }

    try {
      await axios.post('/api/invite/update', payload);
      router.push(attending && accommodationPreference === 'onsite'
        ? `/accommodationDetails/${inviteCode}`
        : `/confirmed/${inviteCode}`);
    } catch (err) {
      console.error('Error saving:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!party || isLoading) {
    return (
      <Fragment>
            <NavBar />
      <Layout>
        <Page>
          <LoadingIndicator />
        </Page>
        </Layout>
        </Fragment>
    );
  }

  return (
    <Fragment>
            <NavBar />
    <Layout>
      <Page>
        <PartyHeader party={party} />

        <Section ref={rsvpRef}>
          <SectionHeading>RSVP</SectionHeading>
          <RSVPWrapper>
            {formData.map((guest, i) => (
              <RSVP key={guest.id} guest={guest} index={i} handleChange={(index, key, val) => {
                const updated = [...formData];
                updated[index][key] = val;
                setFormData(updated);
              }} />
            ))}
            </RSVPWrapper>
            {party.guests.some(g => g.isChild || g.isBaby) && (
              <GoldInfoBox icon={faChild}>
              We see a little one is joining the RSVP — yay!  
              Kids are warmly invited and will be looked after by lovely wedding nannies on the big day, with activities like ball pits, crafts, and games to keep them entertained while you celebrate.
            </GoldInfoBox>
            )}
        </Section>

        {formData.some(g => g.rsvp === 'Yes') && (
          <>
            <RefContainer ref={accommodationRef}>
              <AccommodationOptions
                guestType={party.guestType}
                accommodationOption={accommodationPreference}
                setAccommodationOption={setAccommodationPreference}
                needsBus={needsBus}
                setNeedsBus={setNeedsBus}
                fullWidth
              />
            </RefContainer>

            {accommodationPreference === 'onsite' && (
              <GoldInfoBox icon={faCircleExclamation}>
                <span>Please continue to the next page once RSVPd to view and pay for your accommodation. If we don’t receive payment by <strong>June 1st 2025</strong>, we may need to offer your room to another guest.</span>
              </GoldInfoBox>
            )}

            <RefContainer ref={busRef}>
              {accommodationPreference === 'other'
                ? <BusOption needsBus={needsBus} setNeedsBus={setNeedsBus} />
                : <BusInfoOption />
              }
            </RefContainer>

            <RefContainer ref={fridayRef}>
              <FridayPartySection
                fridayParty={fridayParty}
                setFridayParty={setFridayParty}
              />
            </RefContainer>

            <DietaryNotes dietary={dietary} setDietary={setDietary} />
          </>
        )}

        <Button onClick={handleSave}>
          {accommodationPreference === 'onsite'
            ? 'Save RSVP & Go to Accommodation Details'
            : 'Save RSVP'}
        </Button>
      </Page>
      </Layout>
      </Fragment>
  );
}