import styled from 'styled-components';
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Section container with gradient borders
export const Section = styled.section`
  margin-top: 1.5rem;
  padding: 1rem 0;
  position: relative;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(
      to right,
      transparent,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.primaryDark},
      ${props => props.theme.colors.primary},
      transparent
    );
    border-radius: 2px;
    pointer-events: none;
  }
`;

export const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5 }}
    >
      <Section>{children}</Section>
    </motion.div>
  );
};

// Centered heading
const Heading = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.6em;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  text-align: center;
  white-space: normal;
  word-break: break-word;
`;

// Flex wrapper for heading + dots
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

// Decorative dots
const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  span {
    display: inline-block;
    background-color: ${props => props.theme.colors.accent};
    border-radius: 50%;
  }

  &.left span {
    &:nth-child(1) { width: 10px; height: 10px; }
    &:nth-child(2) { width: 8px; height: 8px; }
    &:nth-child(3) { width: 6px; height: 6px; }
  }

  &.right span {
    &:nth-child(1) { width: 6px; height: 6px; }
    &:nth-child(2) { width: 8px; height: 8px; }
    &:nth-child(3) { width: 10px; height: 10px; }
  }

  @media (max-width: 480px) {
    &.left span, &.right span {
      width: 6px !important;
      height: 6px !important;
    }
  }
`;

// Component
export const SectionHeading = ({ children }) => {
  return (
    <Wrapper>
      <Dots className="left">
        <span></span><span></span><span></span>
      </Dots>
      <Heading>{children}</Heading>
      <Dots className="right">
        <span></span><span></span><span></span>
      </Dots>
    </Wrapper>
  );
};
