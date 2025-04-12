
// components/GuestFormItem.js
import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
  max-width: 400px;
`;

export default function GuestFormItem({ guest, index, handleChange }) {
  return (
    <Section>
      <Label>{guest.firstName} {guest.lastName}</Label>

      <div>
        <label>
          <input
            type="radio"
            name={`rsvp-${guest.id}`}
            value="Yes"
            checked={guest.rsvp === 'Yes'}
            onChange={() => handleChange(index, 'rsvp', 'Yes')}
          />{' '}Attending
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            name={`rsvp-${guest.id}`}
            value="No"
            checked={guest.rsvp === 'No'}
            onChange={() => handleChange(index, 'rsvp', 'No')}
          />{' '}Not Attending
        </label>
      </div>

      <Input
        type="text"
        value={guest.dietary}
        onChange={e => handleChange(index, 'dietary', e.target.value)}
        placeholder="e.g. Vegetarian, No dairy"
      />
    </Section>
  );
}