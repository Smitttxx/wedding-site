// components/NavBar.js
import styled from 'styled-components';
import { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faHome,
  faGift,
  faEnvelopeOpenText,
} from '@fortawesome/free-solid-svg-icons';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 9999;
  padding: 1rem 2rem;
  background-color: #0b3d2e; /* deep blue */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
  color: white;
  font-family: ${props => props.theme.fonts.heading};
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  padding-left: 10px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${props => (props.open ? 'flex' : 'none')};
    margin-top: 1rem;
    background: ${props => props.theme.colors.primary};
    padding: 1rem 0;
    align-items: flex-end;
  }
`;

const HomeNavLink = styled.a`
  color: white;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.ui};
  transition: color 0.2s ease-in-out;
font-size: 1.2rem;
text-decoration: none;
&:hover,
&:focus {
  color: ${props => props.theme.colors.accent};
}
`

const NavLink = styled.a`
  color: white;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.ui};
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease-in-out;
font-size: 1.4rem;
display: flex;
gap: 10px; 
  &:hover,
  &:focus {
    color: ${props => props.theme.colors.accent};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 2px;
    width: 100%;
    background: ${props => props.theme.colors.accent};
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Nav>
      <HomeNavLink href="/">Our Forever Starts Here</HomeNavLink>
      <NavLinks open={menuOpen}>
        <NavLink href="/"><FontAwesomeIcon icon={faHome} />Home</NavLink>
        <NavLink href="/invite"><FontAwesomeIcon icon={faEnvelopeOpenText} />RSVP</NavLink>
        <NavLink href="/gifts"><FontAwesomeIcon icon={faGift} />Gifts</NavLink>
      </NavLinks>
      <MenuToggle onClick={() => setMenuOpen(!menuOpen)}>☰</MenuToggle>
    </Nav>
  );
}
