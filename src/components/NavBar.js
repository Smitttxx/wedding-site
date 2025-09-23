// components/NavBar.js
import styled from 'styled-components';
import { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  faHome,
  faGift,
  faCamera,
  faImages,
  faUpload,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 9999;
  padding: 0.6rem 1.5rem;
  background-color: #0b3d2e; /* deep blue */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
  }
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
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
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${props => (props.open ? 'flex' : 'none')};
    margin-top: 0.8rem;
    background: ${props => props.theme.colors.primary};
    padding: 0.8rem 0;
    align-items: flex-end;
  }
`;

const StyledLink = styled(Link)`
  color: ${props => props.$isActive ? props.theme.colors.accent : 'white'};
  font-weight: 600;
  font-family: ${props => props.theme.fonts.ui};
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease-in-out;
  font-size: 1.1rem;
  display: flex;
  gap: 8px; 
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
    transform: ${props => props.$isActive ? 'scaleX(1)' : 'scaleX(0)'};
    transition: transform 0.3s ease;
    transform-origin: left;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const HomeLink = styled(StyledLink)`
  font-size: 1rem;
  color: ${props => props.$isActive ? props.theme.colors.accent : 'white'};
`;

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const isActive = (path) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };

  return (
    <Nav>
      <HomeLink href="/" $isActive={isActive('/')}>Laura & Joe&apos;s Wedding Photos</HomeLink>
      <NavLinks open={menuOpen}>
        <StyledLink href="/photos/upload" $isActive={isActive('/photos/upload')}><FontAwesomeIcon icon={faUpload} style={{ fontSize: '0.8rem' }} />Upload</StyledLink>
        <StyledLink href="/friday-night" $isActive={isActive('/friday-night')}><FontAwesomeIcon icon={faUtensils} style={{ fontSize: '0.8rem' }} />Friday BBQ</StyledLink>
        <StyledLink href="/photos/gallery" $isActive={isActive('/photos/gallery')}><FontAwesomeIcon icon={faImages} style={{ fontSize: '0.8rem' }} />Guest Photos</StyledLink>
        <StyledLink href="https://fotoshare.co/e/vp7GNe0ASxlcB3ebVMGpX" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCamera} style={{ fontSize: '0.8rem' }} />Photobooth</StyledLink>
        <StyledLink href="/gifts" $isActive={isActive('/gifts')}><FontAwesomeIcon icon={faGift} style={{ fontSize: '0.8rem' }} />Gifts</StyledLink>
      </NavLinks>
      <MenuToggle onClick={() => setMenuOpen(!menuOpen)}>☰</MenuToggle>
    </Nav>
  );
}
