import styled from 'styled-components';
import ToggleRadioGroup from './ToggleRadioGroup';
import { Section, SectionHeading } from './Section';
import Warning from './Warning'; // ✅ shared warning component

const Label = styled.h1`
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

export default function BusInfoOption() {
  return (
    <Section>
      <SectionHeading>Hold the bus</SectionHeading>

      <Label>Not happy with your onsite accommodation?</Label>
      <Note>
        We’ll have buses heading to <strong>Aberfeldy</strong> and <strong>Kenmore</strong> so you can relax and enjoy the evening.
		  </Note>
		  <Note>
       Just head back to the previous section and change your selection.
      </Note>
    </Section>
  );
}
