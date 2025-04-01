import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  height: 40px;
  background: rgba(20, 19, 28, 0.9);
  border-bottom: 1px solid rgba(255, 137, 6, 0.2);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  user-select: none;
  position: relative;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ControlButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  transition: all 0.2s ease;
  
  &:hover {
    filter: brightness(1.2);
    transform: scale(1.1);
  }
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1rem;
  margin-left: auto;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--accent);
  }
`;

function TerminalHeader() {
  return (
    <Header>
      <ControlButtons>
        <ControlButton color="var(--error)" />
        <ControlButton color="var(--warning)" />
        <ControlButton color="var(--success)" />
      </ControlButtons>
      
      <Title>praggnyakanungo@portfolio ~ </Title>
      
      <ThemeToggle title="Change theme">
        🎨
      </ThemeToggle>
    </Header>
  );
}

export default TerminalHeader;