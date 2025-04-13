import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Box = styled.div`
  display: flex;
  align-items: stretch;
  font-size: 1em;
  color: ${props => props.theme.colors.primaryDark};
  margin-top: ${props => props.theme.spacing.small};
  border: 3px solid ${props => props.theme.colors.accent};
  background-color: ${props => props.theme.colors.lightAccent};
  border-radius: 15px;
  padding: 10px;
  margin: 15px 0;
  box-shadow: 0 4px 10px rgba(191, 161, 78, 0.3);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  font-size: 2rem;
  color: ${props => props.theme.colors.accent};
  border-right: 2px solid ${props => props.theme.colors.accent};
`;

const Content = styled.div`
  flex: 1;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// ✅ Reusable GoldInfoBox component
export const GoldInfoBox = ({ icon, children }) => (
  <Box>
    <IconWrapper>
      <FontAwesomeIcon icon={icon} />
    </IconWrapper>
    <Content>{children}</Content>
  </Box>
);
