import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Define all animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 30px var(--accent);
    box-shadow: 0 0 10px var(--accent);
  }
  50% {
    text-shadow: 0 0 15px var(--accent), 0 0 25px var(--accent), 0 0 35px var(--accent);
    box-shadow: 0 0 15px var(--accent);
  }
`;

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

// Removed unused animations as they're now in App.jsx

// Styled components
const Container = styled.div`
  width: 90%;
  max-width: 900px;
  height: 80vh;
  background-color: rgba(12, 11, 19, 0.9);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 137, 6, 0.1), 0 0 20px rgba(255, 137, 6, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease forwards;
  border: 1px solid rgba(255, 137, 6, 0.2);
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      transparent 0px,
      transparent 3px,
      rgba(255, 255, 255, 0.01) 3px,
      rgba(255, 255, 255, 0.01) 6px
    );
    pointer-events: none;
    z-index: -1;
  }
`;

const Scanline = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 45%,
    rgba(255, 255, 255, 0.1) 55%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 2;
  opacity: 0.7;
  pointer-events: none;
  animation: ${scanline} 8s linear infinite;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
  text-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent);
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: var(--text-secondary);
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: var(--text-color);
  max-width: 80%;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
`;

const Button = styled.button`
  background-color: transparent;
  color: var(--accent);
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  padding: 0.8rem 2rem;
  width: 300px;
  border: 2px solid var(--accent);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.8s;
  opacity: 0;
  
  &:hover {
    background-color: rgba(255, 137, 6, 0.1);
    transform: scale(1.05);
    box-shadow: 0 0 15px var(--accent);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &::before {
    content: '> ';
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover::after {
    left: 100%;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 1s;
  opacity: 0;
`;

const SocialLink = styled.a`
  color: var(--text-secondary);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--accent);
    transform: translateY(-3px);
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 1.2s;
  opacity: 0;
`;

// Removed Particle component as it's now in App.jsx

function WelcomePage({ onStartTerminal }) {
  const [typedText, setTypedText] = useState('');
  const welcomeText = "Hi, I'm Praggnya Kanungo";
  
  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      setTypedText(welcomeText.substring(0, index));
      index++;
      
      if (index > welcomeText.length) {
        clearInterval(typeInterval);
      }
    }, 100);
    
    return () => clearInterval(typeInterval);
  }, []);
  
  return (
    <Container>
      <Scanline />
      
      <Title>{typedText}</Title>
      <Subtitle>CS Major | Researcher | Teacher</Subtitle>
      
      <Description>
        Welcome to my interactive terminal portfolio! I'm passionate about computer science, 
        research, and education. This interactive terminal showcases my journey, projects, 
        and skills in a unique way that reflects my love for technology.
        <br /><br />
        Feel free to explore using terminal commands like <code>help</code>, <code>projects</code>, 
        <code>skills</code>, and more once you enter the terminal interface.
      </Description>
      
      <Button onClick={onStartTerminal}>Launch Terminal</Button>
      
      <SocialLinks>
        <SocialLink href="https://github.com/praggnyakanungo" target="_blank">GitHub</SocialLink>
        <SocialLink href="https://linkedin.com/in/praggnya-kanungo" target="_blank">LinkedIn</SocialLink>
        <SocialLink href="mailto:ufx9hn@virginia.edu">Email</SocialLink>
      </SocialLinks>
      
      <Footer>© {new Date().getFullYear()} Praggnya Kanungo. All rights reserved.</Footer>
    </Container>
  );
}

export default WelcomePage;