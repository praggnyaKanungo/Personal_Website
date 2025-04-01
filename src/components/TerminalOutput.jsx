import React from 'react';
import styled, { keyframes } from 'styled-components';

const typeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const OutputContainer = styled.div`
  margin-bottom: 1rem;
`;

const OutputLine = styled.div`
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  animation: ${typeIn} 0.2s ease forwards;
  line-height: 1.4;
`;

const SystemOutput = styled(OutputLine)`
  color: var(--accent);
  text-shadow: 0 0 5px rgba(255, 137, 6, 0.5);
`;

const CommandOutput = styled(OutputLine)`
  color: var(--text-color);

  &::before {
    content: '$ ';
    color: var(--accent);
  }
`;

const ResponseOutput = styled(OutputLine)`
  color: var(--text-secondary);
`;

const ErrorOutput = styled(OutputLine)`
  color: var(--error);
`;

const LinkText = styled.a`
  color: var(--accent);
  text-decoration: underline;
  cursor: pointer;
  transition: text-shadow 0.3s ease;

  &:hover {
    text-shadow: 0 0 5px var(--accent);
  }
`;

// Helper to parse and render links in text
const parseLinks = (text) => {
  // Simple regex to find markdown-style links [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  if (!linkRegex.test(text)) {
    return text;
  }
  
  // Split by links and rebuild with proper components
  const parts = [];
  let lastIndex = 0;
  let match;
  
  // Reset regex index
  linkRegex.lastIndex = 0;
  
  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    // Add the link component
    parts.push(
      <LinkText key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer">
        {match[1]}
      </LinkText>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts;
};

function TerminalOutput({ history }) {
  return (
    <OutputContainer>
      {history.map((item, index) => {
        switch (item.type) {
          case 'system':
            return <SystemOutput key={index}>{parseLinks(item.content)}</SystemOutput>;
          case 'command':
            return <CommandOutput key={index}>{item.content}</CommandOutput>;
          case 'response':
            return <ResponseOutput key={index}>{parseLinks(item.content)}</ResponseOutput>;
          case 'error':
            return <ErrorOutput key={index}>{parseLinks(item.content)}</ErrorOutput>;
          default:
            return <OutputLine key={index}>{parseLinks(item.content)}</OutputLine>;
        }
      })}
    </OutputContainer>
  );
}

export default TerminalOutput;