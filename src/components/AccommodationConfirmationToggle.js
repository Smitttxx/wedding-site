// components/AccommodationConfirmationToggle.js

import { Section, SectionHeading } from './Section';
import ToggleRadioGroup from './ToggleRadioGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faBus, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import {GoldInfoBox} from "./GoldInfoBox";
import {Fragment} from "react";
import {Note} from "./Note";

export default function AccommodationConfirmationToggle({ confirmed, setConfirmed }) {
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
        <Fragment>
          <br/>
 <GoldInfoBox icon={faCircleExclamation}>
          <span>
            Please continue to the next page to pay and confirm your room. If we don’t receive payment by <strong>July 2nd 2025</strong>, we may need to offer your room to another guest.
          </span>
        </GoldInfoBox>
        </Fragment>
      )}
    </Section>
  );
}
