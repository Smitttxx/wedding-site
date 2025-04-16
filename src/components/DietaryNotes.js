import styled from 'styled-components';
import { Section, SectionHeading } from "./Section";

const Label = styled.label`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: bold;
  font-size: 1rem;
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primaryDark};
`;

const Description = styled.p`
  font-family: ${props => props.theme.fonts.base};
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
  color: ${props => props.theme.colors.primaryDark};
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.base};
  border: 1px solid #ccc;
  border-radius: ${props => props.theme.borderRadius};
  background: #fff;
  color: #000;
  resize: vertical;
`;

export default function DietaryNotes({ dietary, setDietary }) {
  return (
    <Section>
		  <SectionHeading>{"What's for tea on the big day?"}</SectionHeading>
      <Description>
        {"It'll be a laid-back, family-style spread — think proper flavour from the Texas smoker, maybe some lamb, aberdeen angus hanger steak, smoked salmon... that kind of vibe. If you’ve got any dietary needs or allergies, just let us know below."}
      </Description>
      <Label>Dietary requirements or allergies:</Label>
      <Textarea
        placeholder="e.g. Vegetarian, gluten free, no nuts..."
        value={dietary}
        onChange={e => setDietary(e.target.value)}
      />
    </Section>
  );
}
