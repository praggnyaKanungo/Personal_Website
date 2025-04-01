import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Terminal from './components/Terminal';
import BootSequence from './components/BootSequence';
import WelcomePage from './components/WelcomePage';

// Background animations
const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
`;

const float = keyframes`
  0% { transform: translate(0px, 0px); }
  25% { transform: translate(20px, -20px); }
  50% { transform: translate(0px, -30px); }
  75% { transform: translate(-20px, -10px); }
  100% { transform: translate(0px, 0px); }
`;

const floatFast = keyframes`
  0% { transform: translate(0px, 0px); }
  25% { transform: translate(30px, -15px); }
  50% { transform: translate(10px, -40px); }
  75% { transform: translate(-20px, -25px); }
  100% { transform: translate(0px, 0px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`;

const dash = keyframes`
  to {
    stroke-dashoffset: 1000;
  }
`;

const shootingStar = keyframes`
  0% { 
    transform: translateX(0) translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% { 
    transform: translateX(${props => props.direction === 'left' ? '-' : ''}100px) translateY(100px);
    opacity: 0;
  }
`;

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  background-color: #0a090f;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(255, 137, 6, 0.03) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(242, 95, 76, 0.03) 0%, transparent 20%);
  background-size: 200% 200%;
  animation: ${gradientMove} 30s ease infinite alternate;
`;

const StarField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.isBright ? 'rgba(255, 250, 240, 0.95)' : `rgba(255, 255, 255, ${props.opacity})`};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation: ${twinkle} ${props => props.duration}s ease-in-out infinite, 
             ${props => props.isBright ? floatFast : float} ${props => props.duration * 1.5}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s, ${props => props.delay + 0.5}s;
  z-index: 1;
  box-shadow: 0 0 ${props => props.size * (props.isBright ? 4 : 2)}px ${props => props.isBright ? 'rgba(255, 250, 210, 0.9)' : 'rgba(255, 255, 255, 0.7)'};
  
  // Add a subtle tail for bright stars
  ${props => props.isBright ? `
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${props.size * 3}px;
      height: ${props.size * 3}px;
      background: radial-gradient(circle, rgba(255, 255, 210, 0.6) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
  ` : ''}
`;

const ConstellationLine = styled.path`
  stroke: rgba(255, 255, 255, 0.15);
  stroke-width: 1;
  stroke-dasharray: 3, 6;
  stroke-linecap: round;
  fill: none;
  animation: ${dash} ${props => props.duration}s linear infinite;
  opacity: 0.4;
`;

const NetworkSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ConnectionLine = styled.path`
  stroke: rgba(255, 137, 6, 0.15);
  stroke-width: 1;
  stroke-dasharray: 5, 5;
  stroke-linecap: round;
  fill: none;
  animation: ${dash} ${props => props.duration}s linear infinite;
`;

const Node = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: rgba(255, 137, 6, ${props => props.opacity});
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation: ${pulse} ${props => props.duration}s ease-in-out infinite,
             ${float} ${props => props.duration * 3}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  z-index: 2;
  box-shadow: 0 0 ${props => props.size * 2}px rgba(255, 137, 6, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${props => props.size * 1.5}px;
    height: ${props => props.size * 1.5}px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid rgba(255, 137, 6, 0.1);
    transform: translate(-50%, -50%);
    animation: ${pulse} ${props => props.duration * 1.2}s ease-in-out infinite;
    animation-delay: ${props => props.delay + 0.2}s;
  }
`;

function App() {
  const [currentView, setCurrentView] = useState('welcome'); // welcome, booting, terminal
  const [bootComplete, setBootComplete] = useState(false);
  const [stars, setStars] = useState([]);
  const [brightStars, setBrightStars] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [constellations, setConstellations] = useState([]);

  useEffect(() => {
    // Generate stars
    const starCount = 100;
    const brightStarCount = 20;
    const newStars = [];
    const newBrightStars = [];
    
    // Generate normal stars
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: `star-${i}`,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 5
      });
    }
    
    // Generate bright stars (constellation anchors)
    for (let i = 0; i < brightStarCount; i++) {
      newBrightStars.push({
        id: `bright-star-${i}`,
        size: Math.random() * 3 + 2.5,
        opacity: 0.9,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 3
      });
    }
    
    setStars(newStars);
    setBrightStars(newBrightStars);
    
    // Generate constellations between bright stars
    const newConstellations = [];
    const constellationCount = 15; // Number of lines to form constellations
    
    for (let i = 0; i < constellationCount; i++) {
      const startStar = newBrightStars[Math.floor(Math.random() * brightStarCount)];
      const endStar = newBrightStars[Math.floor(Math.random() * brightStarCount)];
      
      // Avoid connecting a star to itself and only connect if they're not too far apart
      if (startStar.id !== endStar.id) {
        const distance = Math.sqrt(
          Math.pow(startStar.left - endStar.left, 2) + 
          Math.pow(startStar.top - endStar.top, 2)
        );
        
        // Only connect stars that are within a reasonable distance
        if (distance < 40) {
          newConstellations.push({
            id: `constellation-${i}`,
            startX: startStar.left,
            startY: startStar.top,
            endX: endStar.left,
            endY: endStar.top,
            duration: Math.random() * 60 + 30
          });
        }
      }
    }
    
    setConstellations(newConstellations);
    
    // Generate network nodes
    const nodeCount = 12;
    const newNodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      newNodes.push({
        id: `node-${i}`,
        size: Math.random() * 6 + 3,
        opacity: Math.random() * 0.3 + 0.2,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 5
      });
    }
    
    setNodes(newNodes);
    
    // Generate connections between nodes
    const newConnections = [];
    const connectionsCount = nodeCount * 1.5;
    
    for (let i = 0; i < connectionsCount; i++) {
      const startNode = newNodes[Math.floor(Math.random() * nodeCount)];
      const endNode = newNodes[Math.floor(Math.random() * nodeCount)];
      
      // Avoid connecting a node to itself
      if (startNode.id !== endNode.id) {
        newConnections.push({
          id: `connection-${i}`,
          startX: startNode.left,
          startY: startNode.top,
          endX: endNode.left,
          endY: endNode.top,
          duration: Math.random() * 40 + 40,
          opacity: Math.random() * 0.1 + 0.05
        });
      }
    }
    
    setConnections(newConnections);
  }, []);

  const startBootSequence = () => {
    setCurrentView('booting');
    
    // Boot sequence will automatically complete after its animation
    setTimeout(() => {
      setBootComplete(true);
      setCurrentView('terminal');
    }, 4000);
  };

  return (
    <AppContainer>
      <StarField>
        {/* Regular stars */}
        {stars.map(star => (
          <Star
            key={star.id}
            size={star.size}
            opacity={star.opacity}
            top={star.top}
            left={star.left}
            duration={star.duration}
            delay={star.delay}
            isBright={false}
          />
        ))}
        
        {/* Brighter stars for constellations */}
        {brightStars.map(star => (
          <Star
            key={star.id}
            size={star.size}
            opacity={star.opacity}
            top={star.top}
            left={star.left}
            duration={star.duration}
            delay={star.delay}
            isBright={true}
          />
        ))}
        
        <NetworkSVG>
          {/* Constellation lines between stars */}
          {constellations.map(constellation => (
            <ConstellationLine
              key={constellation.id}
              d={`M ${constellation.startX}% ${constellation.startY}% L ${constellation.endX}% ${constellation.endY}%`}
              duration={constellation.duration}
            />
          ))}
          
          {/* Network node connections */}
          {connections.map(connection => (
            <ConnectionLine
              key={connection.id}
              d={`M ${connection.startX}% ${connection.startY}% C ${connection.startX + 20}% ${connection.startY - 20}%, ${connection.endX - 20}% ${connection.endY + 20}%, ${connection.endX}% ${connection.endY}%`}
              duration={connection.duration}
              style={{ strokeOpacity: connection.opacity }}
            />
          ))}
        </NetworkSVG>
        
        {/* Network nodes */}
        {nodes.map(node => (
          <Node
            key={node.id}
            size={node.size}
            opacity={node.opacity}
            top={node.top}
            left={node.left}
            duration={node.duration}
            delay={node.delay}
          />
        ))}
      </StarField>
      
      {currentView === 'welcome' && (
        <WelcomePage onStartTerminal={startBootSequence} />
      )}
      
      {currentView === 'booting' && (
        <BootSequence onComplete={() => {
          setBootComplete(true);
          setCurrentView('terminal');
        }} />
      )}
      
      {currentView === 'terminal' && bootComplete && (
        <Terminal />
      )}
    </AppContainer>
  );
}

export default App;