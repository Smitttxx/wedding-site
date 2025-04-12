// components/FridayPartySection.js
import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Checkbox = styled.input`
  margin-left: 0.5rem;
`;

export default function FridayPartySection({ fridayParty, setFridayParty }) {
  return (
    <Section>
      <Label>
        Will you attend the Friday welcome party (BYOC)?
        <Checkbox
          type="checkbox"
          checked={fridayParty}
          onChange={e => setFridayParty(e.target.checked)}
        />
      </Label>
    </Section>
  );
}