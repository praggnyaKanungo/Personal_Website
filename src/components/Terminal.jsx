import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import useCommandProcessor from '../hooks/useCommandProcessor';
import TerminalHeader from './TerminalHeader';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';

const slideIn = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const TerminalWindow = styled.div`
  width: 90%;
  max-width: 900px;
  height: 80vh;
  background-color: rgba(15, 14, 23, 0.85);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 137, 6, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideIn} 0.5s ease forwards;
  border: 1px solid rgba(255, 137, 6, 0.2);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: linear-gradient(to bottom, 
      rgba(255, 137, 6, 0.05) 0%, 
      transparent 2%, 
      transparent 98%, 
      rgba(255, 137, 6, 0.05) 100%);
    border-radius: 7px;
    z-index: 10;
  }
`;

const TerminalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  position: relative;
  
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

function Terminal() {
  const [history, setHistory] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const terminalBodyRef = useRef(null);
  
  const { processCommand } = useCommandProcessor({
    currentDirectory,
    setCurrentDirectory,
    setHistory
  });

  useEffect(() => {
    // Initial greeting
    setHistory([
      {
        type: 'system',
        content: `Welcome to Praggnya's Terminal Portfolio!
Type 'help' to see available commands.`
      }
    ]);
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (command) => {
    // Add the command to history with current directory
    setHistory(prev => [...prev, { type: 'command', content: command, directory: currentDirectory }]);
    
    // Process the command and get response
    const response = processCommand(command);
    
    // Add response to history after a small delay to simulate processing
    setTimeout(() => {
      setHistory(prev => [...prev, { type: 'response', content: response }]);
    }, 100);
  };

  return (
    <TerminalWindow>
      <TerminalHeader currentDirectory={currentDirectory} />
      <TerminalBody ref={terminalBodyRef}>
        <TerminalOutput history={history} />
        <TerminalInput 
          onSubmit={handleCommand} 
          currentDirectory={currentDirectory} 
        />
      </TerminalBody>
    </TerminalWindow>
  );
}

export default Terminal;