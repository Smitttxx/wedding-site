import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import { Page } from '../../components/Page';
import { Section, SectionHeading } from '../../components/Section';
import { TartanInfoBox } from '../../components/TartanInfoBox';
import PhotoGallery from '../../components/PhotoGallery';

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