import {Fragment, useRef, useEffect} from "react";
import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  0% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.3; transform: scale(0.95); }
`;

const Title = styled.div`
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

export default function LoadingIndicator({ 
  title = "🥂 Slàinte mhath…", 
  subtitle = "Just checking your invite — hang tight!",
}) {
  const loadingRef = useRef(null);

  useEffect(() => {
    if (loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <Fragment>
      <div ref={loadingRef}>
        <Title>{title}</Title>
        <SubText>{subtitle}</SubText>
      </div>
    </Fragment>
  );
}
