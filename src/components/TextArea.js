import styled from 'styled-components';

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.base};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: #fff;
  color: #000;
  resize: vertical;
`;