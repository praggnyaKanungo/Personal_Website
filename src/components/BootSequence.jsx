import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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

const glitch = keyframes`
  0% {
    clip: rect(31px, 9999px, 94px, 0);
    transform: skew(0.85deg);
  }
  5% {
    clip: rect(70px, 9999px, 75px, 0);
    transform: skew(0.13deg);
  }
  10% {
    clip: rect(13px, 9999px, 76px, 0);
    transform: skew(0.95deg);
  }
  15% {
    clip: rect(90px, 9999px, 80px, 0);
    transform: skew(0.09deg);
  }
  20% {
    clip: rect(66px, 9999px, 13px, 0);
    transform: skew(0.44deg);
  }
  25% {
    clip: rect(43px, 9999px, 70px, 0);
    transform: skew(0.56deg);
  }
  30% {
    clip: rect(89px, 9999px, 85px, 0);
    transform: skew(0.17deg);
  }
  35% {
    clip: rect(5px, 9999px, 60px, 0);
    transform: skew(0.56deg);
  }
  40% {
    clip: rect(70px, 9999px, 27px, 0);
    transform: skew(0.1deg);
  }
  45% {
    clip: rect(14px, 9999px, 100px, 0);
    transform: skew(0.94deg);
  }
  50% {
    clip: rect(45px, 9999px, 28px, 0);
    transform: skew(0.63deg);
  }
  55% {
    clip: rect(5px, 9999px, 64px, 0);
    transform: skew(0.07deg);
  }
  60% {
    clip: rect(23px, 9999px, 74px, 0);
    transform: skew(0.05deg);
  }
  65% {
    clip: rect(39px, 9999px, 30px, 0);
    transform: skew(0.06deg);
  }
  70% {
    clip: rect(50px, 9999px, 71px, 0);
    transform: skew(0.89deg);
  }
  75% {
    clip: rect(76px, 9999px, 94px, 0);
    transform: skew(0.25deg);
  }
  80% {
    clip: rect(17px, 9999px, 33px, 0);
    transform: skew(0.24deg);
  }
  85% {
    clip: rect(51px, 9999px, 19px, 0);
    transform: skew(0.66deg);
  }
  90% {
    clip: rect(59px, 9999px, 30px, 0);
    transform: skew(0.38deg);
  }
  95% {
    clip: rect(10px, 9999px, 83px, 0);
    transform: skew(0.9deg);
  }
  100% {
    clip: rect(8px, 9999px, 96px, 0);
    transform: skew(0.51deg);
  }
`;

const BootContainer = styled.div`
  width: 90%;
  max-width: 900px;
  height: 80vh;
  background-color: var(--bg-color);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  padding: 2rem;
  font-family: 'Fira Code', monospace;
  animation: ${fadeIn} 0.5s ease forwards;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      rgba(0, 0, 0, 0.05) 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 1;
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

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    left: 50%;
    top: 0;
    color: var(--accent);
    background: var(--bg-color);
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: ${glitch} 3s infinite linear alternate-reverse;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  &::after {
    left: 50.5%;
    color: var(--accent-secondary);
    animation-delay: 0.5s;
  }
`;

const Logo = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 30px var(--accent);
`;

const BootLog = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const LogLine = styled.div`
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: ${fadeIn} 0.3s forwards;
  animation-delay: ${props => props.delay}s;
`;

const StatusOK = styled.span`
  color: var(--success);
`;

const LoadingBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 2rem;
  overflow: hidden;
  position: relative;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.percent}%;
  background-color: var(--accent);
  border-radius: 2px;
  transition: width 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    animation: ${glitch} 2s infinite;
  }
`;

const bootMessages = [
  { text: 'Initializing system...', delay: 0.3 },
  { text: 'Loading kernel modules... [ OK ]', delay: 0.8 },
  { text: 'Checking filesystem integrity... [ OK ]', delay: 1.3 },
  { text: 'Mounting virtual filesystem... [ OK ]', delay: 1.8 },
  { text: 'Starting network services... [ OK ]', delay: 2.3 },
  { text: 'Loading personal data... [ OK ]', delay: 2.7 },
  { text: 'Initializing portfolio interface... [ OK ]', delay: 3.1 },
  { text: 'System ready. Welcome!', delay: 3.6 }
];

function BootSequence({ onComplete }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 70);
    
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 4000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);
  
  return (
    <BootContainer>
      <Scanline />
      <LogoContainer data-text="PORTFOLIO">
        <Logo>PORTFOLIO</Logo>
      </LogoContainer>
      
      <BootLog>
        {bootMessages.map((message, index) => (
          <LogLine key={index} delay={message.delay}>
            {message.text.includes('[ OK ]') ? (
              <>
                {message.text.split('[ OK ]')[0]}
                <StatusOK>[ OK ]</StatusOK>
              </>
            ) : (
              message.text
            )}
          </LogLine>
        ))}
      </BootLog>
      
      <LoadingBar>
        <Progress percent={progress} />
      </LoadingBar>
    </BootContainer>
  );
}

export default BootSequence;