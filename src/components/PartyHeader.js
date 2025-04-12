import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export default function PartyHeader({ party }) {
  return (
    <>
      <h1>Welcome {party.partyName.replace(/-/g, ' ')}</h1>
      {party.roomInfo && (
        <Section>
          <Label>Room Info:</Label>
          <p>{party.roomInfo}</p>
        </Section>
      )}
    </>
  );
}
