import styled from 'styled-components';

export const DescriptionText = styled.p`
  font-family: ${props => props.theme.fonts.base};
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
  color: ${props => props.theme.colors.primaryDark};
`;