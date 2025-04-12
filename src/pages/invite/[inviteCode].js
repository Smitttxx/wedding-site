import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import { loadStripe } from '@stripe/stripe-js';

import PartyHeader from '../../components/PartyHeader';
import AccommodationOptions from '../../components/AccommodationOptions';
import GuestFormItem from '../../components/GuestFormItem';
import FridayPartySection from '../../components/FridayPartySection';
import Link from 'next/link';
import theme from '../../theme';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Page = styled.div`
  padding: 2rem;
  background-color: ${props => props.theme.colors.background};
  font-family: ${props => props.theme.fonts.base};
  color: ${props => props.theme.colors.text};
  max-width: 800px;
  margin: 0 auto;
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

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  font-style: italic;
  color: ${props => props.theme.colors.success};
`;

const InfoNote = styled.p`
  margin-top: 1rem;
  padding: 1rem;
  background: #fff8e6;
  border-left: 4px solid ${props => props.theme.colors.accent};
  font-size: 1rem;
  line-height: 1.5;
  color: black;
`;

const StyledLink = styled.a`
  text-decoration: underline;
  color: ${props => props.theme.colors.primary};
`;

export default function GuestPage() {
  const router = useRouter();
  const { inviteCode } = router.query;
  const [party, setParty] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState([]);
  const [message, setMessage] = useState('');
  const [fridayParty, setFridayParty] = useState(false);
  const [needsBus, setNeedsBus] = useState(false);
  const [accommodationOption, setAccommodationOption] = useState('');
  const [hasSelectedOnsite, setHasSelectedOnsite] = useState(false);

  const fetchParty = async () => {
    const res = await axios.get(`/api/invite/${inviteCode}`);
    const data = res.data;
    setParty(data);
    setFormData(
      data.guests.map(g => ({
        ...g,
        dietary: g.dietary || '',
        rsvp: g.rsvp ?? null,
      }))
    );
    setFridayParty(data.fridayParty || false);
    setNeedsBus(data.needsBus || false);
  };

  useEffect(() => {
    if (inviteCode) {
      fetchParty();
    }
  }, [inviteCode]);

  useEffect(() => {
    const accessGranted = sessionStorage.getItem('hasAccess');
  
    if (!accessGranted) {
      router.replace('/invite');
    } else if (inviteCode) {
      fetchParty();
    }
  }, [inviteCode]);

  useEffect(() => {
    if (accommodationOption === 'onsite') {
      setHasSelectedOnsite(true);
    } else {
      setHasSelectedOnsite(false);
    }
  }, [accommodationOption]);

  const handleChange = (index, key, value) => {
    const updated = [...formData];
    updated[index][key] = value;
    setFormData(updated);
  };

  const handleSave = async () => {
    await axios.post('/api/guest/update', {
      partyId: party.id,
      guests: formData,
      fridayParty,
      needsBus,
    });

    const attending = formData.some(g => g.rsvp === 'Yes');

    if (accommodationOption === 'onsite' && attending) {
      router.push(`/guest/${party.partyName}/payment`);
    } else {
      fetchParty();
      const baseMsg = attending
        ? '🎉 Thanks for confirming your attendance!'
        : '😢 Sorry you can’t make it – we’ll miss you!';
      const hasDietary = formData.some(g => g.dietary);
      const dietaryMsg = hasDietary
        ? ' We’ll pass any dietary requirements on to our very special chefs at the venue!'
        : '';
      setMessage(baseMsg + dietaryMsg);
    }
  };

  if (!party) return <p>Loading...</p>;

  const attending = formData.some(g => g.rsvp === 'Yes');
  const isOnsite = accommodationOption === 'onsite';

  return (
    <ThemeProvider theme={theme}>
      <Page>
        {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

        <PartyHeader party={party} />

        <AccommodationOptions
          guestType={party.guestType}
          accommodationOption={accommodationOption}
          setAccommodationOption={setAccommodationOption}
          needsBus={needsBus}
          setNeedsBus={setNeedsBus}
        />

        {hasSelectedOnsite && (
          <InfoNote>
            💡 Please continue to the next page once RSVPd to pay for your accommodation. If we don’t receive payment by [insert date], we may need to offer your room to another guest.
          </InfoNote>
        )}

        <FridayPartySection
          fridayParty={fridayParty}
          setFridayParty={setFridayParty}
        />

        {formData.map((guest, index) => (
          <GuestFormItem
            key={guest.id}
            guest={guest}
            index={index}
            handleChange={handleChange}
          />
        ))}

        <Button onClick={handleSave}>
          {isOnsite && attending ? 'Proceed to Payment' : '💾 Save RSVP'}
        </Button>

        {message && <Message>{message}</Message>}
      </Page>
    </ThemeProvider>
  );
}