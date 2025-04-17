import styled from 'styled-components';
import ToggleRadioGroup from "./ToggleRadioGroup";
import Warning from "./Warning";
import {TartanInfoBox} from "./TartanInfoBox";
import {Fragment} from "react";

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

// Ticket with notched edges
const Ticket = styled.div`
  width: fit-content;
  background-image: url('/black-watch-tartan.png');
  background-repeat: repeat;
  background-size: 290%;
  border-radius: 16px;
  padding: 1rem 0.5rem;
  clip-path: polygon(
    0% 0%, 
    calc(100% - 20px) 0%, 
    100% 20px, 
    100% 100%, 
    20px 100%, 
    0% calc(100% - 20px)
  );
  color: ${props => props.theme.colors.text};
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  z-index: 1;
  &::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(255, 255, 255, 0.08); /* Adjust opacity to control lightness */
  z-index: 1;
  pointer-events: none; /* Keeps it clickable */
}
`;

// Ribbon that floats above the ticket
const Ribbon = styled.div`
  position: absolute;
  top: -1rem;
  left: 1rem;
  z-index: 10;
  background-color: ${props => props.theme.colors.primary};
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 2.5rem 0.5rem 1.5rem;
  font-family: ${props => props.theme.fonts.ui};
  border-radius: 4px 0 0 4px;
  box-shadow:
  0 8px 20px rgba(0, 0, 0, 0.4),      /* strong outer shadow */
  0 4px 10px rgba(0, 0, 0, 0.3),      /* layered depth */
  inset 0 -3px 5px rgba(0, 0, 0, 0.2); /* deeper inner shadow */

  clip-path: polygon(
    0% 0%, 
    100% 0%, 
    90% 50%, 
    100% 100%, 
    0% 100%
  );

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -1rem;
    width: 1rem;
    height: 100%;
    background-color: ${props => props.theme.colors.accent};
    clip-path: polygon(0 0, 100% 50%, 0 100%);
    box-shadow: inset -2px 0 0 rgba(0, 0, 0, 0.1);
  }
`;

// Button wrapper
const RadioWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  & > label {
    flex: 1;
  }
`;

export default function RSVP({
  guest,
  index,
  handleChange,
  rsvpDisabled = false,
  error = false
}) {
  return (
    <Wrapper>
      {rsvpDisabled ? (
        <TartanInfoBox>
          Thanks {guest.firstName} {guest.lastName} for letting us know you cant come.
        </TartanInfoBox>
      ) : (
        <Fragment>
          <Ribbon>Invite for {guest.firstName} {guest.lastName}</Ribbon>
          <Ticket>

            <>
              <RadioWrapper>
                <ToggleRadioGroup
                  name={`rsvp-${guest.id}`}
                  value={guest.rsvp}
                  onChange={val => handleChange(index, 'rsvp', val)}
                  options={[
                    {value: 'Yes', label: 'Count me in!'},
                    {value: 'No', label: 'Sadly, I cant make it'}
                  ]}
                />
              </RadioWrapper>
              {error && <Warning>Please respond to this RSVP.</Warning>}
            </>
          </Ticket>
        </Fragment>
      )}
    </Wrapper>
  );
}
