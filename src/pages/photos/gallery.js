import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import { Page } from '../../components/Page';
import { Section, SectionHeading } from '../../components/Section';
import { TartanInfoBox } from '../../components/TartanInfoBox';
import PhotoGallery from '../../components/PhotoGallery';

export default function PhotoGalleryPage() {
  return (
    <>
      <NavBar />
      <Layout>
        <Page>
            <SectionHeading>Our Wedding Photos</SectionHeading>
          <Section>
            
            <TartanInfoBox>
            Thank you for capturing Joe and Laura's special day from your unique perspective - 
            every photo tells a story they'll cherish for a lifetime!            </TartanInfoBox>

            <PhotoGallery isAdmin={false} />
          </Section>
        </Page>
      </Layout>
    </>
  );
} 