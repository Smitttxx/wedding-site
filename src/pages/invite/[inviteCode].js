// pages/invite/[inviteCode].js

import { useRouter } from 'next/router';
import { useRef, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
import { GoldInfoBox } from '@/components/GoldInfoBox';
import { RedInfoBox } from '@/components/RedInfoBox';
import { faChild, faBed, faFire, faBus, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { Page } from '@/components/Page';
import { TartanInfoBox } from '@/components/TartanInfoBox';
import {Button} from "@/components/Button";

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
  const [errors, setErrors] = useState({ rsvp: [], accommodation: false, fridayParty: false, needsBus: false });
  const [validationMessages, setValidationMessages] = useState([]);

  const rsvpRef = useRef(null);
  const accommodationRef = useRef(null);
  const fridayRef = useRef(null);
  const busRef = useRef(null);

  const allSaidNo = formData.every(g => g.rsvp === 'No');

  const fetchParty = async () => {
    try {
      const res = await axios.get(`/api/invite/${inviteCode}`);
      const data = res.data;

      if (data.rsvpLocked) {
        if (data.guestType === 'OnSite') {
          router.push(`/accommodationDetails/${inviteCode}`);
        } else {
          router.push(`/confirmed/${inviteCode}`);
        }
      } else {
        router.push(`/invite/${inviteCode}`);
      }

      setParty(data);
      setFormData(data.guests.map(g => ({ ...g, rsvp: g.rsvp ?? null })));
      setFridayParty(typeof data.fridayParty === 'boolean' ? data.fridayParty : null);
      setNeedsBus(typeof data.needsBus === 'boolean' ? data.needsBus : null);
      setDietary(data.dietary ?? '');
      setIsRsvpLocked(data.rsvpLocked);
      setAccommodationPreference(data.guestType === "AccommodationNotOffered" ? "other" : null)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchParty();
  }, [inviteCode]);

  const validateForm = () => {
    const messages = [];
    const someoneSaidYes = formData.some(g => g.rsvp === 'Yes');
    const isOffsite = accommodationPreference === 'other';

    const newErrors = {
      rsvp: [],
      accommodation: false,
      fridayParty: false,
      needsBus: false
    };

    formData.forEach(g => {
      if (g.rsvp !== 'Yes' && g.rsvp !== 'No') newErrors.rsvp.push(g.id);
    });

    if (someoneSaidYes) {
      if (accommodationPreference === null) {
        newErrors.accommodation = true;
        messages.push({
          icon: faBed,
          text: 'Please select your accommodation preference.'
        });
      }
      if (fridayParty === null) {
        newErrors.fridayParty = true;
        messages.push({
          icon: faFire,
          text: 'Please let us know if you are coming to the Friday night party.'
        });
      }
      if (isOffsite && needsBus === null) {
        newErrors.needsBus = true;
        messages.push({
          icon: faBus,
          text: 'Please let us know if you need a spot on the bus.'
        });
      }
    }
    
    if (newErrors.rsvp.length > 0) {
      messages.push({
        icon: faUserCheck,
        text: 'Please RSVP "Yes" or "No" for all guests.'
      });
    }    

    setErrors(newErrors);
    setValidationMessages(messages);

    return messages.length === 0;
  };

  const handleSave = async () => {
    const allSaidNo = formData.every(g => g.rsvp === 'No');

    if (allSaidNo) {
      setAccommodationPreference('other');
      setFridayParty(false);
      setNeedsBus(false);
    }

    const isValid = validateForm();
    if (!isValid) return;

    setIsLoading(true);
    const attending = formData.some(g => g.rsvp === 'Yes');

    const payload = {
      partyId: party.id,
      guests: formData,
      dietary,
      rsvpLocked: true,
      fridayParty: attending ? fridayParty : false,
      needsBus: attending ? needsBus : false
    };

    if (party.guestType === 'OnSite' && (accommodationPreference === 'other' || allSaidNo)) {
      payload.guestType = 'OtherAccommodation';
    }

    try {
      setIsLoading(true);
      await axios.post('/api/invite/update', payload);
    
      const target = attending && accommodationPreference === 'onsite'
        ? `/accommodationDetails/${inviteCode}`
        : `/confirmed/${inviteCode}`;
    
      router.push(target);
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
            <TartanInfoBox>
                Please RSVP for all guests by July 13th 2025.
            </TartanInfoBox>
            <br/>
            {party.guests.some(g => g.isChild || g.isBaby) && (
              <GoldInfoBox icon={faChild}>
                {party.guests.filter(g => g.isChild || g.isBaby).length === 1 ? (
                  <>We see a little one is joining — yay! Kids are warmly invited and can be looked after, if you wish after by lovely wedding nannies on the big day.</>
                ) : (
                  <>We see little ones are joining — yay! Children are warmly invited and can be looked after by lovely wedding nannies on the big day.</>
                )}
              </GoldInfoBox>
            )}
            <RSVPWrapper>
              {formData.map((guest, i) => (
                <RSVP key={guest.id} guest={guest} index={i} handleChange={(index, key, val) => {
                  const updated = [...formData];
                  updated[index][key] = val;
                  setFormData(updated);
                }} />
              ))}
            </RSVPWrapper>
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

          {validationMessages.length > 0 && (
              validationMessages.map((msg, idx) => (
                <GoldInfoBox icon={msg.icon}  key={idx}>{msg.text}</GoldInfoBox>
                ))
          )}

          <Button onClick={handleSave}>
            {!allSaidNo && accommodationPreference === 'onsite'
              ? 'Save RSVP & Go to Accommodation Details'
              : 'Save RSVP'}
          </Button>
        </Page>
      </Layout>
    </Fragment>
  );
}
