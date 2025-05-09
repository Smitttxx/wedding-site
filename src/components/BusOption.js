import ToggleRadioGroup from './ToggleRadioGroup';
import { Section, SectionHeading } from './Section';
import {DescriptionText} from "./DescriptionText";

export default function BusOption({ needsBus, setNeedsBus}) {
  return (
    <Section>
      <SectionHeading>Hold the bus</SectionHeading>

      <DescriptionText>Would you like a seat on the guest bus after the wedding?</DescriptionText>
      <DescriptionText>
        We’ll have buses heading to <strong>Aberfeldy</strong> and <strong>Kenmore</strong> at <strong>11:30pm</strong> so you can relax and enjoy the evening.
      </DescriptionText>

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
    </Section>
  );
}
