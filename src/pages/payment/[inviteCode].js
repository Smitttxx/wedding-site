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
import {faReceipt, faSterlingSign, faUsers, faBaby, faCircleExclamation, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {InfoBlock} from '@/components/InfoBlock';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useTheme } from 'styled-components';
import LoadingIndicator from '@/components/LoadingOverlay';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
  apiVersion: '2023-10-16',
  betas: ['elements_enable_deferred_intent_beta_1'],
});

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

const BookingRef = styled.strong`
  text-transform: uppercase;
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fonts.base};
`;

export default function PaymentPage() {
  const theme = useTheme();
  const router = useRouter();
  const {inviteCode} = router.query;
  const [party, setParty] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentError, setPaymentError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const error = router.query.error === 'true';
    setPaymentError(error);
  }, [router.query]);

  useEffect(() => {
    const fetchParty = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/invite/${inviteCode}`);
        const data = res.data;
        setParty(data);

        if (data.accommodationCost && !data.paid) {
          const intentRes = await axios.post('/api/create-payment-intent', {
            guestId: data.id,
            amount: data.accommodationCost,
          });
          setClientSecret(intentRes.data.clientSecret);
        }
      } catch (err) {
        console.error('Failed to fetch party:', err);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <Fragment>
        <NavBar />
        <Layout>
          <Page>
            <LoadingIndicator 
              title="💳 Processing..."
              subtitle="Setting up your payment details"
            />
          </Page>
        </Layout>
      </Fragment>
    );
  }

  if (!party) {
    return (
      <Fragment>
        <NavBar />
        <Layout>
          <Page>
            <Section>
              <SectionHeading>Error</SectionHeading>
              <GoldInfoBox icon={faTimesCircle}>
                We couldn&apos;t find your party details. Please try again or contact us for help.
              </GoldInfoBox>
              <Button onClick={() => router.push('/')}>
                Return to Home
              </Button>
            </Section>
          </Page>
        </Layout>
      </Fragment>
    );
  }

  const cost = (party.accommodationCost / 100).toFixed(2);
  const adultCount = party.guests.filter(g => !g.isChild && !g.isBaby).length;

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

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
                  <strong>You&apos;ve paid:</strong><span style={{color: theme.colors.accent, fontSize: "1.3em"}}> £</span>{cost} total for 2 nights
                </div>
                <div>
                  <FontAwesomeIcon icon={faUsers} />{' '}
                  <strong>Adults:</strong> {adultCount} {adultCount === 1 ? 'adult' : 'adults'}
                </div>

                {party.guests.some(g => g.isChild || g.isBaby) && (
                  <div>
                    <FontAwesomeIcon icon={faBaby} />{' '}
                    <em>Children and babies stay free</em>
                  </div>
                )}

              </InfoBlock>

              <TartanInfoBox>
                <p style={{marginBottom: '1rem'}}>
                  Your room is secured — thanks for paying!
                </p>
                <p style={{marginBottom: '1rem'}}>
                Your booking reference is <BookingRef>{party.bookingReference}</BookingRef>
                </p>
                <p>
                  We&apos;re so excited to have you staying on-site with us — it means the world.
                  Borelands is such a special place, and we&apos;re sure you&apos;re going to fall in love with the views, the vibe, and the weekend ahead.
                </p>
              </TartanInfoBox>
              <Button onClick={() => router.push(`/accommodationDetails/${inviteCode}`)} style={{marginTop: '1.5rem'}}>
                View Your Accommodation Details
              </Button>
            </Section>

          ) : paymentError ? (
            <Section>
              <SectionHeading>Payment Failed</SectionHeading>
              <Text>The total cost is 
              <span style={{color: theme.colors.accent, marginLeft: '0.25rem'}}>£</span><strong>{cost}</strong>
                  {" "}for 2 nights.</Text>
              {party.guests.some(g => g.isChild || g.isBaby) && (
                <Text><strong>Children and babies stay free</strong>.</Text>
                )}
                              <br/>
              <GoldInfoBox icon={faTimesCircle}>Oops, something went wrong. Would you like to try again?</GoldInfoBox>

              {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm
                    partyId={party.id}
                    clientSecret={clientSecret}
                    amount={party.accommodationCost}
                    inviteCode={inviteCode}
                  />
                </Elements>
              )}
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
              <Text>The total cost is <strong>                <span style={{color: theme.colors.accent, marginLeft: '0.25rem'}}>£</span>
              {cost}</strong> for 2 nights.</Text>
              {party.guests.some(g => g.isChild || g.isBaby) && (
                <Text><strong>Children and babies stay free</strong>.</Text>
              )}
              <br/>
              <GoldInfoBox icon={faCircleExclamation}>
                Your room is reserved from <strong>Friday to Sunday</strong> {"While you're welcome to arrive on Saturday if preferred, the rate covers the full weekend."} <br /><br />
                <span>Please make payment by <strong>July 2nd 2025</strong> to secure your room.</span>
                <span><strong>Please note all payments are non refundable.</strong></span>
              </GoldInfoBox>

              <Elements stripe={stripePromise} options={options}>
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
          ) : (
            <Section>
              <SectionHeading>Loading Payment Form...</SectionHeading>
            </Section>
          )}
        </Page>
      </Layout>
    </Fragment>
  );
}
