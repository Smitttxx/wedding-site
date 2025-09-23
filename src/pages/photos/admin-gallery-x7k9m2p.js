import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import { Page } from '../../components/Page';
import { Section, SectionHeading } from '../../components/Section';
import { TartanInfoBox } from '../../components/TartanInfoBox';
import dynamic from 'next/dynamic';

const PhotoGallery = dynamic(() => import('../../components/PhotoGallery'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '200px',
      fontSize: '1.2rem',
      color: '#666'
    }}>
      Loading photos...
    </div>
  )
});

export default function AdminPhotoGalleryPage() {
  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <Section>
            <SectionHeading>Admin Photo Gallery</SectionHeading>
            <PhotoGallery isAdmin={true} />
          </Section>
        </Page>
      </Layout>
    </>
  );
} 