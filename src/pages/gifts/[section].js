// pages/gifts/[section].tsx

import { useEffect, useState } from 'react';
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
          section === 'general' ? 'GeneralGifts' :
          '';
    
        const filtered = res.data.filter(gift =>
          gift.section === enumSection
        );  
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

  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <SectionHeading>{readableTitle}</SectionHeading>
          {loading ? <p>Loading gifts...</p> : (
            <>
              <GiftSection 
                gifts={gifts} 
                section={section} 
                onGiftClick={setSelectedGift}
              />
              {selectedGift && (
                <Elements stripe={stripePromise}>
                  <GiftModal
                    isOpen={!!selectedGift}
                    onClose={() => setSelectedGift(null)}
                    gift={selectedGift}
                    amount={selectedGift.amount}
                  />
                </Elements>
              )}
            </>
          )}
        </Page>
      </Layout>
    </>
  );
}
