import styled from 'styled-components';

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-top: 0.5rem;
  width: 100%;
  font-size: 1rem;
  background: white;
  box-shadow: inset 0 1px 3px rgba(191, 161, 78, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 
      0 0 0 2px rgba(191, 161, 78, 0.1),
      inset 0 1px 3px rgba(191, 161, 78, 0.1);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background};
    cursor: not-allowed;
  }
`;