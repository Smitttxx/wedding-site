import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import { Section, SectionHeading } from '../components/Section';
import { Page } from '../components/Page';
import { TartanInfoBox } from '../components/TartanInfoBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faCamera, 
  faImages, 
  faUpload, 
  faDownload,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';

const HeroSection = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%);
  border-radius: 20px;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.primary};
  }

  @media (min-width: 768px) {
    padding: 3rem 2rem;
    margin: 3rem 0;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 2.5rem;
  }
`;

const ThanksMessage = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.primary};
  }

  @media (min-width: 768px) {
    padding: 3rem;
    margin: 3rem 0;
  }
`;

const ThanksTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }
`;

const ThanksText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const FeaturedPhotos = styled.div`
  margin: 3rem 0;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 2px solid ${props => props.theme.colors.primary};

  @media (min-width: 768px) {
    padding: 3rem;
    margin: 4rem 0;
  }
`;

const FeaturedTitle = styled.h2`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 2.5rem;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
`;

const FeaturedPhoto = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  @media (min-width: 768px) {
    height: 400px;
  }
`;

const PhotoCaption = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-style: italic;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-top: 1.5rem;
  }
`;


const PhotoLinksSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin: 2rem 0;
  padding: 0 0.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin: 3rem 0;
    padding: 0;
  }
`;

const PhotoLinkCard = styled(Link)`
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  padding: 1rem 0.75rem;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  @media (min-width: 768px) {
    padding: 1.5rem 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.primary};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: ${props => props.theme.colors.primaryDark};
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (min-width: 768px) {
    padding: 2.5rem;
  }
`;

const PhotoLinkContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  touch-action: manipulation;
`;

const PhotoLinkIcon = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
`;

const PhotoLinkTitle = styled.h3`
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
`;

const PhotoLinkDescription = styled.p`
  font-size: 0.75rem;
  line-height: 1.4;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
  display: none;

  @media (min-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    display: block;
  }
`;

const PhotoLinkButton = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  white-space: nowrap;
  width: 100%;
  margin-top: 1rem;
  touch-action: manipulation;

  ${PhotoLinkCard}:hover & {
    background: ${props => props.theme.colors.primaryDark};
  }

  @media (min-width: 768px) {
    font-size: 0.9rem;
    padding: 1rem 1.5rem;
  }
`;

const ExternalLinkIcon = styled(FontAwesomeIcon)`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const QuickStatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  border: 2px solid ${props => props.theme.colors.primary};

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    padding: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export default function HomePage() {
  const [photoStats, setPhotoStats] = useState({
    totalPhotos: 0,
    totalUploaders: 0,
    recentUploads: 0
  });

  // Fetch photo stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/photos?page=1&limit=1');
        if (response.ok) {
          const data = await response.json();
          setPhotoStats({
            totalPhotos: data.pagination?.totalPhotos || 0,
            totalUploaders: data.stats?.uniqueUploaders || 0,
            recentUploads: data.photos?.length || 0
          });
        }
      } catch (error) {
        console.log('Could not fetch photo stats:', error);
      }
    };

    fetchStats();
  }, []);


  return (
    <>
      <NavBar />
      <Layout>
        <Page>
        <TartanInfoBox>
            <div style={{ textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.6' }}>
              <FontAwesomeIcon icon={faHeart} style={{ marginRight: '0.5rem', color: '#d4af37', fontSize: '0.8em' }} />
              <strong>Thank you for being part of our story</strong>
              <br />
              Every photo, every memory, every moment shared makes our wedding day even more special.
              <br />
              <em>With all our love, Laura & Joe</em>
              <FontAwesomeIcon icon={faHeart} style={{ marginLeft: '0.5rem', color: '#d4af37', fontSize: '0.8em' }} />
            </div>
          </TartanInfoBox>

          <FeaturedPhotos>
            <FeaturedTitle>
              <FontAwesomeIcon icon={faCamera} style={{ marginRight: '0.5rem', fontSize: '0.8em' }} />
              Sneak Peek
            </FeaturedTitle>
            <PhotoGrid>
              <div>
                <FeaturedPhoto>
              <Image
                src="/WakwW9rQ.jpeg"
                alt="Laura & Joe"
                fill
                style={{ objectFit: 'cover' }}
              />
                </FeaturedPhoto>
                <PhotoCaption>
                  Laura & Joe - The Happy Couple
                </PhotoCaption>
              </div>
              <div>
                <FeaturedPhoto>
              <Image
                src="/27xdIpKg.jpeg"
                alt="Wedding party taking tequila"
                fill
                style={{ objectFit: 'contain' }}
              />
                </FeaturedPhoto>
                <PhotoCaption>
                  The Wedding Party - Tequila Time! 🥃
                </PhotoCaption>
              </div>
            </PhotoGrid>
          </FeaturedPhotos>


          <PhotoLinksSection>

            <PhotoLinkCard href="/friday-night">
              <PhotoLinkContent>
                <PhotoLinkIcon>
                  <FontAwesomeIcon icon={faCamera} style={{ fontSize: '1.2rem' }} />
                </PhotoLinkIcon>
                <PhotoLinkTitle>Friday Night BBQ</PhotoLinkTitle>
                <PhotoLinkDescription>
                  The pre-wedding celebrations and all the laughs we shared. 
                  Relive the fun moments from our Friday night party!
                </PhotoLinkDescription>
              </PhotoLinkContent>
              <PhotoLinkButton>
                View
              </PhotoLinkButton>
            </PhotoLinkCard>

            <PhotoLinkCard href="/photos/gallery">
              <PhotoLinkContent>
                <PhotoLinkIcon>
                  <FontAwesomeIcon icon={faImages} style={{ fontSize: '1.2rem' }} />
                </PhotoLinkIcon>
                <PhotoLinkTitle>Guest Photos</PhotoLinkTitle>
                <PhotoLinkDescription>
                  Browse through all the beautiful photos our amazing guests have shared. 
                  Download any photos you love!
                </PhotoLinkDescription>
              </PhotoLinkContent>
              <PhotoLinkButton>
                View
              </PhotoLinkButton>
            </PhotoLinkCard>

            <PhotoLinkCard href="/photos/upload">
              <PhotoLinkContent>
                <PhotoLinkIcon>
                  <FontAwesomeIcon icon={faUpload} style={{ fontSize: '1.2rem' }} />
                </PhotoLinkIcon>
                <PhotoLinkTitle>Upload Photos</PhotoLinkTitle>
                <PhotoLinkDescription>
                  Have photos from our wedding day? Share them with everyone! 
                  Upload your memories and help us build the complete story.
                </PhotoLinkDescription>
              </PhotoLinkContent>
              <PhotoLinkButton>
                Upload
              </PhotoLinkButton>
            </PhotoLinkCard>

            <PhotoLinkCard href="https://fotoshare.co/e/vp7GNe0ASxlcB3ebVMGpX" target="_blank" rel="noopener noreferrer">
              <PhotoLinkContent>
                <PhotoLinkIcon>
                  <FontAwesomeIcon icon={faCamera} style={{ fontSize: '1.2rem' }} />
                </PhotoLinkIcon>
                <PhotoLinkTitle>Photobooth Photos</PhotoLinkTitle>
                <PhotoLinkDescription>
                  Check out all the fun photobooth moments from our special day! 
                  Download your favorites and relive the laughter.
                </PhotoLinkDescription>
              </PhotoLinkContent>
              <PhotoLinkButton>
                View
              </PhotoLinkButton>
            </PhotoLinkCard>
          </PhotoLinksSection>

          <QuickStatsSection>
            <StatItem>
              <StatNumber>{photoStats.totalPhotos}</StatNumber>
              <StatLabel>Photos Shared</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{photoStats.totalUploaders}</StatNumber>
              <StatLabel>Guests Contributed</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>2</StatNumber>
              <StatLabel>Featured Photos</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>∞</StatNumber>
              <StatLabel>Memories Made</StatLabel>
            </StatItem>
          </QuickStatsSection>
        </Page>
      </Layout>
    </>
  );
}