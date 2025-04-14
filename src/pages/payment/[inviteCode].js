// pages/invite/payment.js

import {useRouter} from 'next/router';
import {useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import NavBar from '@/components/NavBar';
import CheckoutForm from '@/components/CheckoutForm';
import PartyHeader from '@/components/PartyHeader';
import {Page} from '@/components/Page';
import {Section, SectionHeading} from '@/components/Section';
import {TartanInfoBox} from '@/components/TartanInfoBox';
import {GoldInfoBox} from '@/components/GoldInfoBox';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {faReceipt, faSterlingSign, faUsers, faBaby} from '@fortawesome/free-solid-svg-icons';
import {InfoBlock} from '@/components/InfoBlock';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Text = styled.p`
  color: ${props => props.theme.colors.text};
  margin-top: 1rem;
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

export default function PaymentPage() {
  const router = useRouter();
  const {inviteCode} = router.query;
  console.log(inviteCode);
  const [party, setParty] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentError, setPaymentError] = useState(false);

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
          setClientSecret(intentRes.data.clientSecret);
        }
      } catch (err) {
        console.error('Failed to fetch party:', err);
      }
    };

    if (inviteCode) {
      fetchParty();

      // 👇 Watch for ?success=true to refetch and update payment state
      const shouldRefetch = router.query.success === 'true';
      if (shouldRefetch) {
        // Brief delay to ensure Stripe redirect finishes before refetch
        setTimeout(fetchParty, 500);
      }
    }
  }, [inviteCode, router.query.success]);


  if (!party) return null;

  const cost = (party.accommodationCost / 100).toFixed(2);
  const perNight = ((party.accommodationCost / 100) / 2).toFixed(2);
  const adultCount = party.guests.filter(g => !g.isChild && !g.isBaby).length;

  return (
    <Fragment>
      <NavBar />
      <Layout>
        <Page>
          <PartyHeader party={party} />

          {party.paid ? (
            <Section>
              <SectionHeading>Payment Successful</SectionHeading>

              <InfoBlock>
                <div>
                  <FontAwesomeIcon icon={faReceipt} />{' '}
                  <strong>You’ve paid:</strong> £{cost} total for 2 nights
                </div>
                <div>
                  <FontAwesomeIcon icon={faSterlingSign} />{' '}
                  <strong>Rate:</strong> £{perNight} per night
                </div>
                <div>
                  <FontAwesomeIcon icon={faUsers} />{' '}
                  <strong>Adults:</strong> {adultCount} {adultCount === 1 ? 'adult' : 'adults'}
                </div>
                <div>
                  <FontAwesomeIcon icon={faBaby} />{' '}
                  <em>Children and babies stay free</em>
                </div>
              </InfoBlock>

              <TartanInfoBox>
                <p style={{marginBottom: '1rem'}}>
                  Your room is secured — thanks for paying!
                </p>
                <p>
                  We’re so excited to have you staying on-site with us — it means the world.
                  Borelands is such a special place, and we’re sure you’re going to fall in love with the views, the vibe, and the weekend ahead.
                </p>
              </TartanInfoBox>
              <Button onClick={() => router.push(`/accommodationDetails/${inviteCode}`)} style={{marginTop: '1.5rem'}}>
                View Your Accommodation Details
              </Button>
            </Section>

          ) : paymentError ? (
            <Section>
              <SectionHeading>Payment Failed</SectionHeading>
              <Text>The total cost is <strong>£{cost}</strong> for 2 nights.</Text>
              <Text>That’s <strong>£{perNight}</strong> per night for <strong>{adultCount}</strong> adult{adultCount !== 1 ? 's' : ''}.</Text>
              <Text><strong>Children and babies stay free</strong>.</Text>
              <GoldInfoBox>Oops, something went wrong. Would you like to try again?</GoldInfoBox>

              <Elements stripe={stripePromise} options={{clientSecret}}>
                <CheckoutForm
                  partyId={party.id}
                  clientSecret={clientSecret}
                  amount={party.accommodationCost}
                  inviteCode={inviteCode}
                />
              </Elements>
              <Button
                style={{marginTop: '2rem'}}
                onClick={() => router.push(`/accommodationDetails/${inviteCode}`)}
              >
                ← Back to Accommodation Details
              </Button>
            </Section>
          ) : clientSecret ? (
            <Section>
              <SectionHeading>Payment</SectionHeading>
              <Text>The total cost is <strong>£{cost}</strong> for 2 nights.</Text>
              <Text>That’s <strong>£{perNight}</strong> per night for <strong>{adultCount}</strong> adult{adultCount !== 1 ? 's' : ''}.</Text>
              <Text><strong>Children and babies stay free</strong>.</Text>

              <GoldInfoBox icon={faCircleExclamation}>
                <span>Please make payment by <strong>June 1st 2025</strong> to secure your room.</span>
              </GoldInfoBox>

              <Elements stripe={stripePromise} options={{clientSecret}}>
                <CheckoutForm
                  partyId={party.id}
                  clientSecret={clientSecret}
                  amount={party.accommodationCost}
                  inviteCode={inviteCode}
                />
              </Elements>
              <Button
                style={{marginTop: '2rem'}}
                onClick={() => router.push(`/accommodationDetails/${inviteCode}`)}
              >
                ← Back to Accommodation Details
              </Button>
            </Section>
          ) : null}
        </Page>
      </Layout>
    </Fragment>
  );
}
