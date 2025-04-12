import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import PartyHeader from '../../../components/PartyHeader';
import PaymentSection from '../../../components/PaymentSection';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Page = styled.div`
  padding: 2rem;
`;

const Message = styled.p`
  margin-top: 1rem;
  font-style: italic;
  color: #2f9e44;
`;

const Info = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: #333;
`;

const BackLink = styled.a`
  display: inline-block;
  margin-top: 2rem;
  text-decoration: underline;
  color: #5c7cfa;
  cursor: pointer;
`;

export default function PaymentPage() {
  const router = useRouter();
  const { partyName } = router.query;
  const [party, setParty] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const fetchParty = async () => {
      const res = await axios.get(`/api/guest/${partyName}`);
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
    };

    if (partyName) fetchParty();
  }, [partyName]);

  if (!party) return <Page>Loading...</Page>;
  if (party.paid)
    return (
      <Page>
        <PartyHeader party={party} />
        <Message>✅ You’ve already paid for your accommodation. Thank you!</Message>
        <Link href={`/guest/${partyName}`} passHref legacyBehavior>
          <BackLink>← Back to RSVP</BackLink>
        </Link>
      </Page>
    );

  return (
    <Page>
      <PartyHeader party={party} />
      <Info>
        💡 Please complete your accommodation payment below. If we don’t receive payment by [insert date], we may need to offer your room to another guest.
      </Info>

      <PaymentSection
        accommodationCost={party.accommodationCost}
        clientSecret={clientSecret}
        stripePromise={stripePromise}
        guestId={party.id}
      />

      <Link href={`/guest/${partyName}`} passHref legacyBehavior>
        <BackLink>← Back to RSVP</BackLink>
      </Link>
    </Page>
  );
}