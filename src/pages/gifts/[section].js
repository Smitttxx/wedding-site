// pages/gifts/[section].tsx

import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import NavBar from '@/components/NavBar';
import { Page } from '@/components/Page';
import { SectionHeading } from '@/components/Section';
import GiftSection from '@/components/GiftSection';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import GiftModal from '@/components/GiftModal';
import LoadingIndicator from "@/components/LoadingOverlay";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function DynamicGiftSectionPage() {
  const router = useRouter();
  const { section } = router.query;
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState(null);

  useEffect(() => {
    if (section) {
      axios.get('/api/gifts').then(res => {
        // convert URL segment to matching enum value
        const enumSection =
          section === 'garden' ? 'SullysGarden' :
          section === 'cruise' ? 'TheCruise' :
          null;
    
        const filtered = enumSection
          ? res.data.filter(gift => gift.section === enumSection)
          : [];
        setGifts(filtered);
        setLoading(false);
      });
    }
  }, [section]);
  

  const readableTitle = section === 'garden'
    ? "Sully's Garden"
    : section === 'cruise'
    ? 'Cruise Memories'
    : 'Gifts';

  const isSupportedSection = section === 'garden' || section === 'cruise';


  if (loading) {
    return (
      <Fragment>
        <NavBar />
        <Layout>
          <Page>
            <LoadingIndicator
              subtitle="Fetching our gift ideas"
            />
          </Page>
        </Layout>
      </Fragment>
    );
  }

  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <SectionHeading>{readableTitle}</SectionHeading>
          {isSupportedSection ? (
              <>
                <GiftSection 
                  gifts={gifts} 
                  section={section} 
                  onGiftClick={setSelectedGift}
                />
                {selectedGift && (
                  <Elements 
                    stripe={stripePromise}
                    options={{
                      appearance: {
                        theme: 'stripe',
                      },
                    }}
                  >
                    <GiftModal
                      isOpen={!!selectedGift}
                      onClose={() => setSelectedGift(null)}
                      gift={selectedGift}
                      amount={selectedGift.amount}
                    />
                  </Elements>
                )}
              </>
            ) : (
              <p style={{textAlign: 'center', marginTop: '2rem'}}>This gift section is not available.</p>
            )
          }
        </Page>
      </Layout>
    </>
  );
}
