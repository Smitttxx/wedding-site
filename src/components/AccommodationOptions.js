import styled from 'styled-components';
import ToggleRadioGroup from "./ToggleRadioGroup";
import {Section, SectionHeading} from "./Section";

const Label = styled.p`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

export default function AccommodationOptions({
  guestType,
  accommodationOption,
  setAccommodationOption,
  fullWidth
}) {
  if (guestType === 'OnSite') {
    return (
      <Section>
            <SectionHeading>Accommodation</SectionHeading>
        <Label>You’ve got the VIP treatment — we’ve reserved a cozy on-site room just for you.</Label>
        <Label>Will you be staying with us at the venue?</Label>
<ToggleRadioGroup
  name="accommodation"
  value={accommodationOption}
          onChange={setAccommodationOption}
          fullWidth={fullWidth}
  options={[
    {
      value: 'onsite',
      label: "Yes please — show me my reserved room and details on the next page."
    },
    {
      value: 'other',
      label: "No thanks — we'll sort our own accommodation."
    }
  ]}
/>
      </Section>
    );
  }

  if (guestType === 'OtherAccommodation') {
    return (
      <Section>
        <SectionHeading>Accommodation</SectionHeading>
        <Label>
          The venue is currently fully booked, but we will let you know if any spaces become available.
        </Label>
      </Section>
    );
  }

  return null;
}
