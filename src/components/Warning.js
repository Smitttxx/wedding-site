import styled from 'styled-components';

const Warning = styled.p`
  color: ${props => props.theme.colors.error};
  font-weight: 500;
  margin-top: 0.5rem;
  font-size: 0.95rem;
`;

export default Warning;
