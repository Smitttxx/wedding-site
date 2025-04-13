import styled from 'styled-components';
import ToggleRadioGroup from "./ToggleRadioGroup";
import { Section, SectionHeading } from "./Section";
import Warning from "./Warning";

const Label = styled.p`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Note = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export default function FridayPartySection({ fridayParty, setFridayParty, error }) {
  return (
    <Section>
      <SectionHeading>Welcome Party you say?</SectionHeading>
<Note>
  Join us for a relaxed evening of drinks and chats around the fire the night before the big day.  
  The father of the bride and father of the groom will be cooking over the open flame, so don’t worry about food!  
  If you fancy a tipple, bring a bottle — we’ll bring the glasses.
</Note>
      <ToggleRadioGroup
        name="fridayParty"
        value={fridayParty === true ? 'yes' : fridayParty === false ? 'no' : null}
        onChange={val => setFridayParty(val === 'yes')}
        options={[
          { value: 'yes', label: "Yes, we’ll be there!" },
          { value: 'no', label: "No, we’ll skip it." }
        ]}
      />
      {error && <Warning>Please let us know if youre attending the Friday welcome party.</Warning>}
    </Section>
  );
}