import { Section, SectionHeading } from "./Section";
import {Label} from "./Label";
import {Textarea} from "./TextArea";
import {DescriptionText} from "./DescriptionText";
import {Note} from "./Note";

export default function DietaryNotes({ dietary, setDietary }) {
  return (
    <Section>
		  <SectionHeading>{"What to expect at the wedding breakfast?"}</SectionHeading>
      <DescriptionText>
        {"A served wedding buffet bursting with choice, think proper flavour from the Texas smoker, think barbecued Scotch leg of lamb, Aberdeen Angus hanger steak, East Neuk salt cured smoked salmon... that kind of vibe. If you’ve got any dietary needs or allergies, just let us know below."}
      </DescriptionText>
      <Note>Dietary requirements or allergies:</Note>
      <Textarea
        placeholder="e.g. Vegetarian, gluten free, no nuts..."
        value={dietary}
        onChange={e => setDietary(e.target.value)}
      />
    </Section>
  );
}
