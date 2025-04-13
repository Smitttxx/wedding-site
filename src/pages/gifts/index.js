import styled from 'styled-components';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import { Page } from '@/components/Page';
import { SectionHeading } from '@/components/Section';
import Image from 'next/image';

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin: 1.5rem 0;
  text-align: center;
`;

const GiftCardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
`;

const GiftCard = styled.div`
  background: white;
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  width: 250px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const GiftImage = styled(Image)`
  border-radius: 8px;
`;

const GiftTitle = styled.h4`
  margin: 0.75rem 0 0.5rem;
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
`;

const GiftDescription = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.text};
`;

export default function GiftsPage() {
  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <SectionHeading>Gifts</SectionHeading>
          <Paragraph>
            Your presence means the world to us — we’re truly grateful youre joining us for our big weekend.
          </Paragraph>
          <Paragraph>
            We’re lucky to already have a home (and our dream kitchen!), so instead of traditional gifts, we’d love for you to help us create memories. If you feel moved to gift something, we’ve created a few options below.
          </Paragraph>

          <GiftCardGrid>
            <GiftCard>
              <GiftImage src="/cruise.webp" width={220} height={150} alt="Cruise ship" />
              <GiftTitle>Cruise Memories</GiftTitle>
              <GiftDescription>
                Help us make waves on our honeymoon cruise — from cocktails at sunset to late-night dance floors.
              </GiftDescription>
            </GiftCard>

            <GiftCard>
              <GiftImage src="/garden.jpg" width={220} height={150} alt="Garden for Sully" />
              <GiftTitle>Sully’s Garden</GiftTitle>
              <GiftDescription>
                Our current garden needs a lot of work for it to be safe for Sully, so thats next on our list! If you would like to help us create a magical little garden for Sully — a space for running wild, growing veggies, and making mud pies.
              </GiftDescription>
            </GiftCard>
          </GiftCardGrid>
        </Page>
      </Layout>
    </>
  );
}
