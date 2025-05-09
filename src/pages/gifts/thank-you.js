import styled from 'styled-components';
import Layout from '@/components/Layout';
import NavBar from '@/components/NavBar';
import { Page } from '@/components/Page';
import { SectionHeading } from '@/components/Section';
import {ButtonLink} from "@/components/ButtonLink";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin: 1.5rem 0;
  text-align: center;
`;

export default function ThankYouPage() {
  const router = useRouter();
  const { purchaseId } = router.query;
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (purchaseId) {
      axios.get(`/api/gift-purchase/${purchaseId}`)
        .then(res => setPurchase(res.data))
        .catch(() => setPurchase(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [purchaseId]);

  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <SectionHeading>Thank You!</SectionHeading>
          {loading ? (
            <Paragraph>Loading your gift details...</Paragraph>
          ) : purchase ? (
            <Paragraph>
              Thank you so much, <strong>{purchase.name}</strong>, for your generous gift: <strong>{
                purchase.gift.name === 'Custom Gift'
                  ? `£${(purchase.gift.amount / 100).toFixed(2)}`
                  : purchase.gift.name
              }</strong>!<br />
              {purchase.message && <span>Your message: "{purchase.message}"<br /></span>}
              We&apos;re truly touched by your thoughtfulness and can&apos;t wait to create these special memories together.
            </Paragraph>
          ) : (
            <Paragraph>
              Thank you so much for your generous gift! We&apos;re truly touched by your thoughtfulness and can&apos;t wait to create these special memories together.
            </Paragraph>
          )}
          <ButtonLink href={'/gifts'}>
            Return to Gifts
          </ButtonLink>
        </Page>
      </Layout>
    </>
  );
} 