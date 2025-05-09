import styled from 'styled-components';
import Link from 'next/link';

export const ButtonLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  width: 100%;
  	transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  	&:hover:not(:disabled) {
	background: ${({ theme }) => theme.colors.primaryDark};
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(191, 161, 78, 0.2);
	}

	&:disabled {
	background: ${({ theme }) => theme.colors.lightError};
	color: ${({ theme }) => theme.colors.error};
	cursor: not-allowed;
	opacity: 0.7;
	}
`;