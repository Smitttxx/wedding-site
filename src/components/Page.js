import styled from 'styled-components';

export const Page = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.background};
  padding: 1.2rem;
  text-align: center;
`;