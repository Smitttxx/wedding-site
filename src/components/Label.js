import styled from 'styled-components';

export const Label = styled.p`
	font-family: ${props => props.theme.fonts.heading};
	font-weight: bold;
	font-size: 1.1rem;
	margin-bottom: 1rem;
	color: ${props => props.theme.colors.primaryDark};
`;