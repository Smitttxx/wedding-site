import styled from 'styled-components';

export const TartanInfoBox = styled.div`
  background-image: url('/black-watch-tartan.png');
  background-size: cover;
  background-repeat: repeat;
  background-blend-mode: lighten;
  background-color: rgba(255, 255, 255, 0.1);

  /* Change border color based on error prop */
  border-left: 10px solid ${props =>
    props.error ? props.theme.colors.error : props.theme.colors.accent};

  padding: 1rem 1rem;
  margin: 1rem auto;
  font-size: 1.6rem;
  text-align: center;
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.background};
  font-weight: bold;

  span {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.accent};
    font-weight: 600;
    margin: 0 0.4rem;
    display: inline-block;
    line-height: 1px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;

    span {
      font-size: 1.8rem;
    }
  }
`;
