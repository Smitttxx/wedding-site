import styled from 'styled-components';

export const Page = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.background};
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.7),
    0 0 0 4px ${props => props.theme.colors.accent},
    0 0 12px 4px ${props => props.theme.colors.accent},
    inset 0 0 6px rgba(0, 0, 0, 0.2);
  padding: 1.2rem;
  text-align: center;
`;