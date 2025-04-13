import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import styled from 'styled-components';
import CheckoutForm from '../../components/CheckoutForm';
import PartyHeader from '../../components/PartyHeader';
import Layout from '../../components/Layout';
import Link from 'next/link';
import {Section, SectionHeading} from '@/components/Section';
import {Page} from "@/components/Page";
import {TartanInfoBox} from "@/components/TartanInfoBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faUsers,
  faUserFriends,
  faSuitcase,
  faBaby
} from '@fortawesome/free-solid-svg-icons';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Message = styled.p`
  margin-top: 1rem;
  font-style: italic;
  color: ${props => props.theme.colors.success};
`;

const StyledButtonLink = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  margin-top: 2rem;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const List = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;

  li {
    font-size: 1rem;
    color: ${props => props.theme.colors.text};
    border-bottom: 1px dashed ${props => props.theme.colors.primary};
    padding: 0.25rem 0;
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
`;

const Text = styled.div`
  color: ${props => props.theme.colors.text};
`;

export default function PaymentPage() {
  const router = useRouter();
  const {inviteCode} = router.query;

  const [party, setParty] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentError, setPaymentError] = useState(false);

  // Load error state from query
  useEffect(() => {
    const error = router.query.error === 'true';
    setPaymentError(error);
  }, [router.query]);

  useEffect(() => {
    const fetchParty = async () => {
      try {
        const res = await axios.get(`/api/invite/${inviteCode}`);
        const data = res.data;
        setParty(data);

        if (data.accommodationCost && !data.paid) {
          const intentRes = await axios.post('/api/create-payment-intent', {
            guestId: data.id,
          });
          if (intentRes.data.clientSecret) {
            setClientSecret(intentRes.data.clientSecret);
          }
        }
      } catch (err) {
        console.error('Error loading payment info:', err);
      }
    };

    if (inviteCode) fetchParty();
  }, [inviteCode, router.asPath]); // 🧠 refetches after redirect

  if (!party) {
    return (
      <Layout>
        <Page>Loading...</Page>
      </Layout>
    );
  }

  const yourRooms = Array.from(new Set(
    party.guests.map(g => g.room?.name).filter(Boolean)
  ));

  const partyGuestIds = new Set(party.guests.map(g => g.id));

  const othersInCabin = party.cabin?.rooms
    ?.flatMap(room => room.guests)
    ?.filter(g => !partyGuestIds.has(g.id));

  const yourRoomIds = party.guests.map(g => g.room?.id).filter(Boolean);

  const otherGuestsInYourRooms = party.cabin?.rooms?.reduce((acc, room) => {
    if (!yourRoomIds.includes(room.id)) return acc;

    const others = room.guests.filter(g => !partyGuestIds.has(g.id));
    if (others.length) acc[room.name] = others;
    return acc;
  }, {});

  return (
    <Layout>
      <Page>
        <PartyHeader party={party} />

        {!party.paid && (
          <Section>
            <SectionHeading>Accommodation Summary</SectionHeading>
            <Text>
              You’re almost done! Please check your accommodation details below and proceed to payment or change your selection.
            </Text>
          </Section>
        )}

        {party.cabin && (
          <Section>
            <SectionHeading>Your Cabin</SectionHeading>
            <Text><strong>{party.cabin.name}</strong></Text>
          </Section>
        )}

        <div>
        {party.cabin?.rooms
  ?.filter(room => room.guests.some(g => partyGuestIds.has(g.id)))
  ?.sort((a, b) => a.name.localeCompare(b.name))
  .map(room => {
    const partyGuestsInRoom = room.guests.filter(g => partyGuestIds.has(g.id));
    const otherGuestsInRoom = room.guests.filter(g => !partyGuestIds.has(g.id));
    const hasBaby = partyGuestsInRoom.some(g => g.isBaby);

    return (
      <Section key={room.id}>
        <SectionHeading>{room.name}</SectionHeading>

        {/* Room Info */}
        <Text style={{ marginBottom: '0.5rem' }}>
          <FontAwesomeIcon icon={faBed} /> <strong>Type:</strong> {room.roomType} &nbsp; | &nbsp;
          <FontAwesomeIcon icon={faUsers} /> <strong>Capacity:</strong> {room.capacity}
        </Text>

        {/* Baby note */}
        {hasBaby && (
          <TartanInfoBox style={{ marginTop: '0.5rem' }}>
            <FontAwesomeIcon icon={faBaby} style={{ marginRight: '0.5rem' }} />
            We see you’ve got a little one joining you! Unfortunately, we aren’t able to supply travel cots —
            please bring your own if needed.
          </TartanInfoBox>
        )}

        {/* Party guests */}
        {partyGuestsInRoom.length > 0 && (
          <>
            <Text><FontAwesomeIcon icon={faUserFriends} /> <strong>Guests on your booking:</strong></Text>
            <List>
              {partyGuestsInRoom.map(g => (
                <li key={g.id}>
                  {g.firstName} {g.lastName} {g.isBaby && <FontAwesomeIcon icon={faBaby} style={{ marginLeft: '0.5rem' }} />}
                </li>
              ))}
            </List>
          </>
        )}

        {/* Other guests */}
        {otherGuestsInRoom.length > 0 ? (
          <>
            <Text><FontAwesomeIcon icon={faSuitcase} /> <strong>Other guests sharing this room:</strong></Text>
            <List>
              {otherGuestsInRoom.map(g => (
                <li key={g.id}>{g.firstName} {g.lastName}</li>
              ))}
            </List>
          </>
        ) : (
          <Text><em>This room is private — only your group is staying here.</em></Text>
        )}
      </Section>
    );
  })}

        </div>

        {othersInCabin?.length > 0 && (
          <Section>
            <SectionHeading>Other Guests in Your Cabin</SectionHeading>
            <List>
              {othersInCabin.map(g => (
                <li key={g.id}>{g.firstName} {g.lastName}</li>
              ))}
            </List>
          </Section>
        )}

        {!party.paid && (
          <Section>
            <Link href={`/invite/${inviteCode}`} passHref legacyBehavior>
              <StyledButtonLink>← I want to change my accommodation selection</StyledButtonLink>
            </Link>
          </Section>
        )}

        {party.paid ? (
          <Section>
            <SectionHeading>Payment Successful</SectionHeading>
            <TartanInfoBox>
              Your room is secured — thanks for paying!
              We’re so excited to have you staying on-site with us — it means the world.
              Borelands is such a special place, and we’re sure you’re going to fall in love with the views, the vibe, and the weekend ahead.
              Keep an eye out — you’ll receive your booking confirmation soon!
            </TartanInfoBox>
          </Section>
        ) : paymentError ? (
          <>
            <Section>
              <SectionHeading>Payment Failed</SectionHeading>
              <Message style={{color: 'red'}}>
                Oops, something went wrong. Would you like to try again?
              </Message>
            </Section>
            <Elements stripe={stripePromise} options={{clientSecret}}>
              <CheckoutForm
                partyId={party.id}
                clientSecret={clientSecret}
                amount={party.accommodationCost}
                inviteCode={inviteCode}
              />
            </Elements>
          </>
        ) : clientSecret ? (
          <Section>
            <SectionHeading>Payment</SectionHeading>
            <Elements stripe={stripePromise} options={{clientSecret}}>
              <CheckoutForm
                partyId={party.id}
                clientSecret={clientSecret}
                amount={party.accommodationCost}
                inviteCode={inviteCode}
              />
            </Elements>
          </Section>
        ) : null}
      </Page>
    </Layout>
  );
}
