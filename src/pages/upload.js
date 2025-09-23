import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import { Page } from '../components/Page';
import { Section, SectionHeading } from '../components/Section';
import { TartanInfoBox } from '../components/TartanInfoBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCamera, 
  faUtensils, 
  faHeart, 
  faUpload,
  faImages,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const UploadContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
`;

const UploadOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 2rem 0;
  }
`;

const UploadOption = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.5rem;
  background: white;
  border: 3px solid ${props => props.theme.colors.accent};
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(11, 61, 46, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$isFriday ? 'linear-gradient(90deg, #d4af37, #b8941f)' : 'linear-gradient(90deg, #0b3d2e, #062d21)'};
  }
`;

const OptionIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.$isFriday ? '#d4af37' : props.theme.colors.primary};
  margin-bottom: 1rem;
  transition: transform 0.3s ease;

  @media (min-width: 768px) {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }

  ${UploadOption}:hover & {
    transform: scale(1.1);
  }
`;

const OptionTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const OptionSubtitle = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
  margin-bottom: 1rem;
  text-align: center;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

const OptionFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  text-align: center;

  @media (min-width: 768px) {
    margin: 0 0 2rem 0;
  }
`;

const FeatureItem = styled.li`
  color: ${props => props.theme.colors.text};
  font-size: 0.85rem;
  margin: 0.3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  @media (min-width: 768px) {
    font-size: 0.95rem;
    margin: 0.5rem 0;
    gap: 0.5rem;
  }
`;

const UploadButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.$isFriday ? '#d4af37' : props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;

  ${UploadOption}:hover & {
    background: ${props => props.$isFriday ? '#b8941f' : props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const InfoSection = styled.div`
  background: rgba(11, 61, 46, 0.05);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
`;

const InfoTitle = styled.h4`
  color: ${props => props.theme.colors.primary};
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0.5rem 0;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1rem;
  
  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

export default function Upload() {
  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <UploadContainer>
            <BackButton href="/">
              <FontAwesomeIcon icon={faChevronRight} style={{ transform: 'rotate(180deg)', fontSize: '0.9rem' }} />
              Back to Home
            </BackButton>

            <SectionHeading>Upload Photos</SectionHeading>
            
            <Section>
              <TartanInfoBox>
                <FontAwesomeIcon icon={faUpload} style={{ marginRight: '0.5rem', color: '#d4af37', fontSize: '1rem' }} />
                <strong>Share Your Wedding Memories!</strong>
                <br />
                Choose which type of photos you&apos;d like to upload. Photos will be added to the gallery immediately.
              </TartanInfoBox>

              <UploadOptions>
                <UploadOption href="/friday-night/upload" $isFriday={true}>
                  <OptionIcon $isFriday={true}>
                    <FontAwesomeIcon icon={faUtensils} />
                  </OptionIcon>
                  <OptionTitle>Friday Night BBQ</OptionTitle>
                  <UploadButton $isFriday={true}>
                    <FontAwesomeIcon icon={faUtensils} />
                    Upload Friday Photos
                    <FontAwesomeIcon icon={faChevronRight} />
                  </UploadButton>
                </UploadOption>

                <UploadOption href="/photos/upload" $isFriday={false}>
                  <OptionIcon $isFriday={false}>
                    <FontAwesomeIcon icon={faCamera} />
                  </OptionIcon>
                  <OptionTitle>Wedding Photos</OptionTitle>
                  <UploadButton $isFriday={false}>
                    <FontAwesomeIcon icon={faCamera} />
                    Upload Wedding Photos
                    <FontAwesomeIcon icon={faChevronRight} />
                  </UploadButton>
                </UploadOption>
              </UploadOptions>

              <InfoSection>
                <InfoTitle>
                  <FontAwesomeIcon icon={faUpload} style={{ marginRight: '0.5rem' }} />
                  Upload Information
                </InfoTitle>
                <InfoText>
                  <strong>Supported formats:</strong> JPG, PNG, HEIC, WebP, AVIF, GIF and more
                </InfoText>
                <InfoText>
                  <strong>File size:</strong> Large files are automatically compressed to ensure fast uploads
                </InfoText>
                <InfoText>
                  <strong>Privacy:</strong> Photos are added to the gallery immediately after upload
                </InfoText>
              </InfoSection>
            </Section>
          </UploadContainer>
        </Page>
      </Layout>
    </>
  );
}
