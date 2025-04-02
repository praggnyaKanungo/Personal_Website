import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 5px rgba(255, 137, 6, 0.5); }
  50% { text-shadow: 0 0 10px rgba(255, 137, 6, 0.8), 0 0 15px rgba(255, 137, 6, 0.3); }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Fira Code', monospace;
`;

const Prompt = styled.span`
  color: var(--accent);
  margin-right: 8px;
  white-space: nowrap;
  animation: ${glowPulse} 3s ease-in-out infinite;
`;

const InputField = styled.input`
  background: transparent;
  border: none;
  color: var(--text-color);
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  flex: 1;
  caret-color: transparent;
  
  &:focus {
    outline: none;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 1.2em;
  background-color: var(--accent);
  margin-left: 1px;
  animation: ${blink} 1s step-end infinite;
  position: absolute;
  left: ${props => props.position}px;
`;

function TerminalInput({ onSubmit, currentDirectory }) {
  const [input, setInput] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const promptWidth = useRef(0);

  // Format the prompt to show the current directory
  const formatPrompt = (dir) => {
    if (dir === '~') {
      return '~$';
    } else {
      // Extract the directory name from the path
      return dir + '$';
    }
  };

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current.focus();
    
    // Calculate the width of the prompt
    const promptElement = containerRef.current.querySelector('span');
    if (promptElement) {
      promptWidth.current = promptElement.getBoundingClientRect().width + 8; // 8px is the margin-right
    }
  }, []);

  useEffect(() => {
    // Update cursor position on input change or directory change
    const position = promptWidth.current + getCursorPosition();
    setCursorPosition(position);
  }, [input, currentDirectory]);

  const getCursorPosition = () => {
    if (!inputRef.current) return 0;
    
    const selectionStart = inputRef.current.selectionStart;
    const textBeforeCursor = input.substring(0, selectionStart);
    
    // Create a temporary span to measure text width
    const span = document.createElement('span');
    span.style.font = window.getComputedStyle(inputRef.current).font;
    span.style.position = 'absolute';
    span.style.visibility = 'hidden';
    span.textContent = textBeforeCursor;
    document.body.appendChild(span);
    
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    
    return width;
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    const cursorPos = promptWidth.current + getCursorPosition();
    setCursorPosition(cursorPos);
    
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        onSubmit(input);
        setInput('');
      }
    }
  };

  const handleClick = () => {
    inputRef.current.focus();
    const cursorPos = promptWidth.current + getCursorPosition();
    setCursorPosition(cursorPos);
  };

  return (
    <InputContainer ref={containerRef} onClick={handleClick}>
      <Prompt>{formatPrompt(currentDirectory)}</Prompt>
      <InputField
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
        onBlur={() => inputRef.current.focus()}
        spellCheck="false"
      />
      <Cursor position={cursorPosition} />
    </InputContainer>
  );
}

export default TerminalInput;