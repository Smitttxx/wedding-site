import ToggleRadioGroup from "./ToggleRadioGroup";
import {Section, SectionHeading} from "./Section";
import {Label} from "./Label";
import {List} from "./List";
import {DescriptionText} from "./DescriptionText";

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
        <DescriptionText>Will you be staying with us at the venue?</DescriptionText>
        <ToggleRadioGroup
          name="accommodation"
          value={accommodationOption}
          onChange={setAccommodationOption}
          fullWidth={fullWidth}
          options={[
            {
              value: 'onsite',
              label: "Yes please — I'll look on the next page at reserved room details."
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

  if (guestType === 'AccommodationNotOffered') {
    return (
      <Section>
        <SectionHeading>Accommodation</SectionHeading>
        <Label>
          The venue is currently fully booked, but we will let you know if any spaces become available.
        </Label>
        <DescriptionText>
        There are many lovely places to stay in the nearby towns just a short drive from the venue:
                  <List>
                    <li>
                      <strong>Kenmore:</strong> approximately <strong>5</strong> minutes by car
                    </li>
                    <li>
                      <strong>Aberfeldy:</strong> approximately <strong>15</strong> minutes by car
                    </li>
          </List>
          </DescriptionText>
      </Section>
    );
  }

  return null;
}
