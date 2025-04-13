// components/Layout.js
import styled from 'styled-components';

const OuterWrapper = styled.div`
  min-height: 100vh;
  background-image: url('/black-watch-tartan.png');
  background-repeat: repeat;
  background-size: auto;
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export default function Layout({ children }) {
  return <OuterWrapper>{children}</OuterWrapper>;
}
