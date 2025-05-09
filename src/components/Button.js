import styled from 'styled-components';

export const Button = styled.button`
	margin-top: 1.5rem;
	padding: 0.75rem 1.25rem;
	background: ${({ theme }) => theme.colors.primary};
	color: white;
	border: none;
	border-radius: ${({ theme }) => theme.borderRadius};
	font-weight: bold;
	cursor: pointer;
	width: 100%;
	font-size: 1.1rem;
	transition: all 0.3s ease;

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