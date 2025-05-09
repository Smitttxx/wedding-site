import styled from 'styled-components';
import { CardElement } from '@stripe/react-stripe-js';

export const StyledCardElement = styled(CardElement)`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: white;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(191, 161, 78, 0.1);

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 
      0 0 0 2px rgba(191, 161, 78, 0.1),
      inset 0 1px 3px rgba(191, 161, 78, 0.1);
  }
`;