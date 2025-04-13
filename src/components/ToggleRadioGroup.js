import styled from 'styled-components';

const Group = styled.div`
  display: flex;
  flex-direction: ${props => (props.fullWidth ? 'column' : 'row')};
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  border-radius: ${props => props.theme.borderRadius};
  border: 2px solid
    ${props =>
      props.checked
        ? props.theme.colors.primary
        : props.theme.colors.primary};
  background-color: ${props =>
    props.checked
      ? props.theme.colors.primary
      : props.theme.colors.background};
  color: ${props =>
    props.checked
      ? props.theme.colors.textOnPrimary || '#ffffff'
      : props.theme.colors.primaryDark};
  font-family: ${props => props.theme.fonts.ui};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props =>
    props.checked
      ? `0 0 0 3px ${props.theme.colors.primaryShadow || 'rgba(11, 61, 46, 0.3)'}`
      : 'none'};
  width: 100%;

  input {
    display: none;
  }

  &:hover {
    background-color: ${props =>
      props.checked
        ? props.theme.colors.primaryDark
        : props.theme.colors.backgroundHover || props.theme.colors.background};
    border-color: ${props => props.theme.colors.primaryDark};
  }
`;

export default function ToggleRadioGroup({ name, value, options, onChange, fullWidth = false }) {
  return (
    <Group fullWidth={fullWidth}>
      {options.map(option => {
        const isChecked = value === option.value;

        return (
          <RadioLabel key={option.value} checked={isChecked} fullWidth={fullWidth}>
            <input
              type="radio"
              name={name}
              value={option.value}
              {...(value !== null ? { checked: isChecked } : {})}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </RadioLabel>
        );
      })}
    </Group>
  );
}
