
import styled from 'styled-components';

export const Divider = styled.hr`
  border: none;
  border-top: 2px solid ${props => props.theme.colors.accent};
  margin: 2rem auto;
  width: 80%;
`;