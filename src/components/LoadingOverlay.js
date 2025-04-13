import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  0% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.3; transform: scale(0.95); }
`;

const LoadingWrapper = styled.div`
  text-align: center;
  margin: 2rem auto;
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
  font-size: 1.3rem;
`;

const Cheers = styled.div`
  display: inline-block;
  font-size: 2rem;
  animation: ${fade} 1.6s ease-in-out infinite;
`;

const SubText = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  margin-top: 0.5rem;
  font-style: italic;
`;

export default function LoadingIndicator({ title = "🥂 Slàinte mhath…", subtitle = "Just checking your invite — hang tight!" }) {
  return (
    <LoadingWrapper>
      <Cheers>{title}</Cheers>
      <SubText>{subtitle}</SubText>
    </LoadingWrapper>
  );
}
