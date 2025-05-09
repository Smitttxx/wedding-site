import styled from 'styled-components';

export const Form = styled.form`
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 
    0 4px 12px rgba(191, 161, 78, 0.15),
    0 0 0 1px ${({ theme }) => theme.colors.accent},
    0 0 0 4px ${({ theme }) => theme.colors.lightAccent};
  max-width: 450px;
  margin: 2rem auto;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.base};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.lightAccent});
    border-radius: ${({ theme }) => theme.borderRadius};
    z-index: -1;
    opacity: 0.5;
  }
`;