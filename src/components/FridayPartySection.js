import ToggleRadioGroup from "./ToggleRadioGroup";
import { Section, SectionHeading } from "./Section";
import Warning from "./Warning";
import {Note} from "./Note";
import {DescriptionText} from "./DescriptionText";


export default function FridayPartySection({fridayParty, setFridayParty, error}) {
  return (
    <Section>
      <SectionHeading>Welcome Party you say?</SectionHeading>
<DescriptionText>
  Join us for a relaxed evening of drinks and chats around the fire the night before the big day.  
  The father of the bride and father of the groom will be cooking over the open flame, so don’t worry about food!  
        If you fancy a tipple, bring a bottle — we’ll bring the glasses.
        <br />
        <br />
        Festivities kick off around <strong>6pm</strong> on Friday evening
        <br/>
        <br/>

      </DescriptionText>
      <ToggleRadioGroup
        name="fridayParty"
        value={fridayParty === true ? 'yes' : fridayParty === false ? 'no' : null}
        onChange={val => setFridayParty(val === 'yes')}
        options={[
          { value: 'yes', label: "Yes, we’ll be there!" },
          { value: 'no', label: "No, we’ll skip it." }
        ]}
      />
      {error && <Warning>{"Please let us know if you're attending the Friday welcome party."}</Warning>}
    </Section>
  );
}