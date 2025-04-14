import styled from 'styled-components';
import ToggleRadioGroup from './ToggleRadioGroup';
import { Section, SectionHeading } from './Section';
import Warning from './Warning'; // ✅ shared warning component

const Label = styled.p`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primaryDark};
`;

const Note = styled.p`
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primaryDark};
  font-family: ${props => props.theme.fonts.base};
`;

export default function BusOption({ needsBus, setNeedsBus, error = false }) {
  return (
    <Section>
      <SectionHeading>Hold the bus</SectionHeading>

      <Label>Would you like a seat on the guest bus after the wedding?</Label>
      <Note>
        We’ll have buses heading to <strong>Aberfeldy</strong> and <strong>Kenmore</strong> so you can relax and enjoy the evening.
      </Note>

      <ToggleRadioGroup
        name="needsBus"
        value={
          needsBus === true
            ? 'yes'
            : needsBus === false
              ? 'no'
              : null
        }
        onChange={val => setNeedsBus(val === 'yes')}
        options={[
          { value: 'yes', label: 'Yes, please save us a seat!' },
          { value: 'no', label: 'No thanks, we’ll arrange our own transport.' }
        ]}
      />

      {error && <Warning>Please let us know about your travel preference.</Warning>}
    </Section>
  );
}
