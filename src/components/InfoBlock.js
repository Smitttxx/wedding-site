import styled from 'styled-components';

export const InfoBlock = styled.div`
  background: rgba(255, 255, 255, 0.85);
  padding: 1.25rem;
  border-left: 6px solid ${props => props.theme.colors.accent};
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  font-size: 1.05rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.7;
  font-family: ${props => props.theme.fonts.base};
  margin: 1.5rem 0;
  text-align: left;

  svg {
    margin-right: 0.4rem;
    color: ${props => props.theme.colors.accent};
  }

  strong {
    color: ${props => props.theme.colors.primary};
  }
`;
