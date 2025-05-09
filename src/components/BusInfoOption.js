import {DescriptionText} from "./DescriptionText";
import {Label} from "./Label";
import { Section, SectionHeading } from './Section';

export default function BusInfoOption() {
  return (
    <Section>
      <SectionHeading>Hold the bus</SectionHeading>

      <Label>Not happy with your onsite accommodation?</Label>
      <DescriptionText>
        We’ll have buses heading to <strong>Aberfeldy</strong> and <strong>Kenmore</strong> after the wedding at <strong>11:30pm</strong> so you can relax and enjoy the evening.
		  </DescriptionText>
		  <DescriptionText>
       Heads up, you can view your room on the next page and decide there or just head back to the previous section and change your selection.
      </DescriptionText>
    </Section>
  );
}
