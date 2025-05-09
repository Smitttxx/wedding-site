import styled from 'styled-components';
import {Label} from "./Label";

const Container = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const WelcomeText = styled.h2`
  font-family: ${props => props.theme.fonts.base};
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.colors.primaryDark};
`;

const GuestNames = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.25rem;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  text-transform: capitalize;
`;

const RoomSection = styled.div`
  margin-top: 1rem;
`;

export default function PartyHeader({ party }) {
  const formattedName = party.partyName.replace(/-/g, ' ');

  return (
    <Container>
      <WelcomeText>Welcome</WelcomeText>
      <GuestNames>{formattedName}</GuestNames>

      {party.roomInfo && (
        <RoomSection>
          <Label>Room Info:</Label>
          <p>{party.roomInfo}</p>
        </RoomSection>
      )}
    </Container>
  );
}
