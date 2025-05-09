import styled from 'styled-components';

export const List = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;

  li {
    font-size: 1rem;
    color: ${props => props.theme.colors.text};
    border-bottom: 1px dashed ${props => props.theme.colors.primary};
    padding: 0.25rem 0;
    width: 100%;
    max-width: 300px;
    text-align: center;
  }

  span {
    color: ${props => props.theme.colors.accent};
    font-style: italic;
    font-size: 0.9rem;
    font-weight: bold;
  }
`;