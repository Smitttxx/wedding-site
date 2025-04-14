// components/AccommodationConfirmationToggle.js

import { Section, SectionHeading } from './Section';
import ToggleRadioGroup from './ToggleRadioGroup';
import styled from 'styled-components';
import Warning from './Warning';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faBus, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import {GoldInfoBox} from "./GoldInfoBox";

const Note = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.25rem;
`;

export default function AccommodationConfirmationToggle({ confirmed, setConfirmed, error }) {
  return (
    <Section>
      <SectionHeading>Final Confirmation</SectionHeading>
      <Note>
        We’ve reserved your cabin and shared all the details above. Are you happy to continue and secure your booking?
      </Note>
      <ToggleRadioGroup
        name="accommodationConfirmation"
        value={confirmed === true ? 'yes' : confirmed === false ? 'no' : null}
        onChange={val => setConfirmed(val === 'yes')}
        options={[
          {
            value: 'yes',
            label: (
              <>
                <FontAwesomeIcon icon={faMoneyBillWave} style={{ marginRight: '0.5rem' }} />
                Yes, I’m happy — take me to payment
              </>
            )
          },
          {
            value: 'no',
            label: (
              <>
                <FontAwesomeIcon icon={faBus} style={{ marginRight: '0.5rem' }} />
                No, I’d rather stay offsite
              </>
            )
          }
        ]}
		  />
		       {/* Deadline reminder if confirmed === true */}
			   {confirmed === true && (
        <GoldInfoBox icon={faCircleExclamation}>
          <span>
            Please continue to the next page to pay and confirm your room. If we don’t receive payment by <strong>June 1st 2025</strong>, we may need to offer your room to another guest.
          </span>
        </GoldInfoBox>
      )}
      {error && <Warning>Please confirm your accommodation choice.</Warning>}
    </Section>
  );
}
