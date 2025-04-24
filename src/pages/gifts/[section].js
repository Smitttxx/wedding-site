// pages/gifts/[section].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import NavBar from '@/components/NavBar';
import { Page } from '@/components/Page';
import { SectionHeading } from '@/components/Section';
import GiftSection from '@/components/GiftSection';
import axios from 'axios';

export default function DynamicGiftSectionPage() {
  const router = useRouter();
  const { section } = router.query;
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (section) {
      axios.get('/api/gifts').then(res => {
        // convert URL segment to matching enum value
        const enumSection =
          section === 'sullys-garden' ? 'SullysGarden' :
            section === 'cruise' ? 'TheCruise' :
            section === 'general-gifts' ? 'GeneralGifts' :
          '';
  
        const filtered = res.data.filter(gift =>
          gift.section === enumSection
        );  
        setGifts(filtered);
        setLoading(false);
      });
    }
  }, [section]);
  

  const readableTitle = section === 'sullys-garden'
    ? "Sully’s Garden"
    : section === 'cruise'
    ? 'Cruise Memories'
    : 'Gifts';

  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <SectionHeading>{readableTitle}</SectionHeading>
          <h1>
           🚧🚧🚧 PAGE UNDER CONSTRUCTION 🚧🚧🚧 
          </h1>
          {loading ? <p>Loading gifts...</p> : <GiftSection gifts={gifts} section={section} />}
        </Page>
      </Layout>
    </>
  );
}
