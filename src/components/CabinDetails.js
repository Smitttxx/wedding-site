// components/CabinDetails.js
import styled from 'styled-components';
import {Section, SectionHeading} from './Section';
import Image from 'next/image';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHome, faBed, faUsers, faHotTubPerson
} from '@fortawesome/free-solid-svg-icons';

faHotTubPerson
import {InfoBlock} from "./InfoBlock";
const MediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  iframe {
    width: 100%;
    border-radius: 12px;
    max-height: 360px;
    object-fit: cover;
  }
`;

const Snapshot = styled(Image)`
  border-radius: 12px;
`;

const Details = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.85);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  font-family: ${props => props.theme.fonts.base};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};

  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      color: ${props => props.theme.colors.accent};
    }

    strong {
      font-weight: 600;
      color: ${props => props.theme.colors.primary};
    }
  }
`;


export default function CabinDetails({cabin}) {
  if (!cabin) return null;

  const imageSrc = cabin.imageFileName ? `/${cabin.imageFileName}` : null;

  return (
    <Section>
      <SectionHeading>Your Cabin</SectionHeading>
      <InfoBlock>
        <div>
          <FontAwesomeIcon icon={faHome} />
          <strong>Cabin:</strong> {cabin.name}
        </div>
        <div>
          <FontAwesomeIcon icon={faBed} />
          <strong>Bedrooms:</strong> {cabin.roomCount}
        </div>
        <div>
          <FontAwesomeIcon icon={faUsers} />
          <strong>Capacity:</strong> {cabin.capacity} guests
        </div>
        <div>
          <FontAwesomeIcon icon={faHotTubPerson} />
          <strong>Hot Tub:</strong> {cabin.hotTub}
        </div>
      </InfoBlock>

      <MediaWrapper>
        <Snapshot src={imageSrc} alt={`${cabin.name} photo`} width={700} height={400} layout="responsive" />
        {cabin.videoUrl && (
          <iframe
            src={cabin.videoUrl}
            title="Cabin video tour"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </MediaWrapper>
    </Section>
  );
}

