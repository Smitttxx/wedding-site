import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChampagneGlasses, faUtensils, faMusic, faCamera, faCakeCandles, faGlassCheers, faBus, faUsers, faWhiskeyGlass, faIceCream, faHamburger } from '@fortawesome/free-solid-svg-icons';

const TimelineWrapper = styled.div`
  background: rgba(255, 255, 255, 0.85);
  padding: 1.25rem;
  border-left: 6px solid ${props => props.theme.colors.accent};
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  font-size: 1.05rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.base};
  margin: 1.5rem auto;
  text-align: left;
  max-width: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 43px;
    top: 25px;
    bottom: 25px;
    width: 2px;
    background: ${props => props.theme.colors.accent};
  }
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1rem;
  flex-direction: row;

  &::before {
    display: none;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.accent};
  width: 50px;
  flex-shrink: 0;
  z-index: 2;
  background: white;

  svg {
    font-size: 1.4rem;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Time = styled.span`
  font-weight: bold;
  font-size: 0.95rem;
`;

const Label = styled.span`
  font-size: 1rem;
`;

export default function WeddingTimeline() {
  return (
    <TimelineWrapper>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faChampagneGlasses} />
          <Time>11:15</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Welcome Drinks & Find Your Seat</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faHeart} />
          <Time>12:00</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Ceremony</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faCamera} />
          <Time>12:30</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Photos for Bride & Groom</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faChampagneGlasses} />
          <Time>12:45</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Canapés & Drinks</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faWhiskeyGlass} />
          <Time>15:00</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Pipers Toast</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faUtensils} />
          <Time>15:15</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Wedding Breakfast</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faGlassCheers} />
          <Time>16:15</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Speeches</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faIceCream} />
          <Time>16:45</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Dessert</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faCakeCandles} />
          <Time>17:30</Time>
        </IconWrapper>
        <TextBlock>
        <Label>Cake Cutting & First Dance</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faMusic} />
          <Time>18:00</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Band Starts</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faHamburger} />
          <Time>20:00</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Evening buffet</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faUsers} />
          <Time>22:00</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Cèilidh</Label>
        </TextBlock>
      </TimelineItem>
      <TimelineItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faBus} />
          <Time>00:00</Time>
        </IconWrapper>
        <TextBlock>
          <Label>Take the vibes with you — start your own after party!</Label>
        </TextBlock>
      </TimelineItem>
    </TimelineWrapper>
  );
}