// components/CabinDetails.js
import styled from 'styled-components';
import { Section, SectionHeading } from './Section';

const MediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  iframe, img {
    width: 100%;
    border-radius: 12px;
    max-height: 360px;
    object-fit: cover;
  }
`;

const Details = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.6;

  strong {
    display: inline-block;
    width: 130px;
  }
`;

export default function CabinDetails({ cabin }) {
	if (!cabin) return null;
  
	const imageSrc = cabin.imageFileName ? `/images/${cabin.imageFileName}` : null;
  
	// ✅ Calculate total bedrooms and capacity
	const totalBedrooms = cabin.rooms?.length || 0;
	const totalCapacity = cabin.rooms?.reduce((sum, room) => sum + room.capacity, 0) || 0;
  
	return (
	  <Section>
		<SectionHeading>Your Cabin</SectionHeading>
		<h3 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{cabin.name}</h3>
  
		<MediaWrapper>
		  {imageSrc && <img src={imageSrc} alt={`${cabin.name} photo`} />}
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
  
		<Details>
		  <div><strong>Bedrooms:</strong> {totalBedrooms}</div>
		  <div><strong>Full Capacity:</strong> {totalCapacity} guests</div>
		</Details>
	  </Section>
	);
  }
  
