// components/AccommodationOptions.js
import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Checkbox = styled.input`
  margin-left: 0.5rem;
`;

const Radio = styled.input`
  margin-right: 0.5rem;
`;

export default function AccommodationOptions({
  guestType,
  accommodationOption,
  setAccommodationOption,
  needsBus,
  setNeedsBus
}) {
  if (guestType === 'OnSite') {
    return (
      <Section>
        <Label>Please confirm your accommodation preference:</Label>
        <label>
          <Radio
            type="radio"
            name="accommodation"
            value="onsite"
            checked={accommodationOption === 'onsite'}
            onChange={() => setAccommodationOption('onsite')}
          />
          Yes, we will stay on-site and pay for accommodation
        </label>
        <br />
        <label>
          <Radio
            type="radio"
            name="accommodation"
            value="other"
            checked={accommodationOption === 'other'}
            onChange={() => setAccommodationOption('other')}
          />
          We will stay in Aberfeldy or Kenmore and arrange accommodation ourselves
        </label>
        {accommodationOption === 'other' && (
          <div style={{ marginTop: '0.5rem' }}>
            <label>
              <Checkbox
                type="checkbox"
                checked={needsBus}
                onChange={e => setNeedsBus(e.target.checked)}
              />{' '}
              We would like a bus to Aberfeldy or Kenmore after the wedding
            </label>
          </div>
        )}
        <br />
        <label>
          <Radio
            type="radio"
            name="accommodation"
            value="none"
            checked={accommodationOption === 'none'}
            onChange={() => setAccommodationOption('none')}
          />
          We do not require accommodation or a bus
        </label>
      </Section>
    );
  }

  if (guestType === 'OtherAccommodation') {
    return (
      <Section>
        <Label>
          The venue is currently fully booked, but we will let you know if any spaces become available.
        </Label>
        <label>
          <Checkbox
            type="checkbox"
            checked={needsBus}
            onChange={e => setNeedsBus(e.target.checked)}
          />{' '}
          Do you need a bus to Aberfeldy or Kenmore on the Saturday after the wedding?
        </label>
      </Section>
    );
  }

  return null;
}