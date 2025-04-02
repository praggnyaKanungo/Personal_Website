import { useCallback } from 'react';

// Define your portfolio content here
const PORTFOLIO_CONTENT = {
  about: `# About Me

I'm Praggnya Kanungo, a Computer Science and Data Science student at the University of Virginia (Class of 2027), with an intended early graduation. I'm passionate about technology, research, and creating educational resources.

My primary interests include:
- Autonomous Systems and Robotics
- Machine Learning and AI
- Computer Science Education
- Making technology accessible to underserved communities

Currently, I work as a Perception Engineer for Cavalier Autonomous Racing, where I help develop and integrate technologies for autonomous vehicles.`,

  skills: `# Skills

## Programming Languages
- Python (Certified Entry-Level Python Programmer)
- Java
- C/C++
- JavaScript/TypeScript
- SQL

## Web Development
- HTML/CSS (Certified by Girls Who Code)
- React.js
- Node.js

## Other Technical Skills
- ROS (Robot Operating System)
- Raspberry Pi
- Linux
- MATLAB
- Git/GitHub
- Data Structures & Algorithms`,

  projects: [
    {
      name: "PiCar to DeepPiCar",
      description: "Creating an autonomous driving vehicle using Raspberry Pi and deep learning techniques for obstacle detection and navigation.",
      technologies: ["Python", "Raspberry Pi", "Deep Learning", "Computer Vision"],
      link: "https://github.com/praggnyakanungo/deeppicar"
    },
    {
      name: "Stone Bridge CSHS Computer Resources",
      description: "Led a team of 50 high school CS students to create educational resources for AP Computer Science A, which were translated to Odia and Hindi for schools in India.",
      technologies: ["Educational Content", "Project Management", "Translation"],
      link: "https://github.com/praggnyakanungo/cs-resources"
    },
    {
      name: "Portfolio Website From Scratch",
      description: "Developed this interactive terminal-style portfolio website using React and styled-components to showcase my projects and skills.",
      technologies: ["React", "JavaScript", "Styled Components", "HTML/CSS"],
      link: "https://github.com/praggnyakanungo/Personal_Website"
    },
    {
      name: "C++ Mini Projects",
      description: "Developed various applications including a calculator and a to-do list application using C++.",
      technologies: ["C++", "Data Structures", "Algorithms"],
      link: "https://github.com/praggnyakanungo/cpp-projects"
    }
  ],

  education: `# Education

## Computer Science, B.S.
University of Virginia, School of Engineering and Applied Science, 2023-2026 (Expected)
- Intended Early Graduation
- Relevant Coursework: Data Structures and Algorithms, Discrete Mathematics and Theory, Computer Systems and Organization, Data Design II: Interactive App Design

## High School Diploma
Stone Bridge High School, 2019-2023
- Activities: Science National Honor Society, Mu Alpha Theta, National English Honor Society, National Honor Society
- AP Scholar Award with Distinction`,

  experience: `# Experience

## Perception Engineer
Cavalier Autonomous Racing, Spring 2024-Present
- Working on the team's code stack for autonomous vehicle perception
- Integrating Patchwork++ as a new ground filtering method to improve car performance
- Studying ground filtering methods efficiently using ROS Humble

## Founder & President
The Pendulum Future, Fall 2022-Present
- Leading a team to create computer science educational resources
- Translating resources to minority languages and distributing them for free to remote villages worldwide
- Organizing CS workshops for women in underdeveloped areas

## Community Project Manager
Computer Science Honor Society, Fall 2023-Spring 2022
- Led a team of 50 CSHS members to create CS-related community service resources
- Organized workshops and tutoring sessions for high school students`,

  publications: `# Publications

## The Girl and her Monsoons - Poems of the Pandemic
Self-published through Kindle Direct Publishing, June 2022
- A collection of poetry written during 2020-2022, reflecting on experiences during the pandemic era
- Available on Amazon Kindle`,

  contact: {
    email: "ufx9hn@virginia.edu",
    github: "github.com/praggnyakanungo",
    linkedin: "linkedin.com/in/praggnya-kanungo",
    phone: "646-221-7218"
  }
};

// Define file systems structure with separate directories
const FILE_SYSTEM = {
  '~': {
    type: 'directory',
    contents: {
      'readme.md': { 
        type: 'file', 
        content: `# Welcome to Praggnya's Terminal Portfolio

This is an interactive terminal-style portfolio website. Use commands like 'help', 'ls', 'cd', and 'cat' to navigate and explore.

Type 'help' for a list of available commands.` 
      },
      'about': { 
        type: 'directory',
        contents: {
          'index.md': { type: 'file', content: PORTFOLIO_CONTENT.about }
        }
      },
      'skills': { 
        type: 'directory',
        contents: {
          'index.md': { type: 'file', content: PORTFOLIO_CONTENT.skills }
        }
      },
      'education': { 
        type: 'directory',
        contents: {
          'index.md': { type: 'file', content: PORTFOLIO_CONTENT.education }
        }
      },
      'experience': { 
        type: 'directory',
        contents: {
          'index.md': { type: 'file', content: PORTFOLIO_CONTENT.experience }
        }
      },
      'publications': { 
        type: 'directory',
        contents: {
          'index.md': { type: 'file', content: PORTFOLIO_CONTENT.publications }
        }
      },
      'contact': { 
        type: 'directory',
        contents: {
          'index.md': { 
            type: 'file', 
            content: `# Contact Information

- Email: ${PORTFOLIO_CONTENT.contact.email}
- GitHub: [${PORTFOLIO_CONTENT.contact.github}](https://${PORTFOLIO_CONTENT.contact.github})
- LinkedIn: [${PORTFOLIO_CONTENT.contact.linkedin}](https://${PORTFOLIO_CONTENT.contact.linkedin})
- Phone: ${PORTFOLIO_CONTENT.contact.phone}

Feel free to reach out to me through any of these channels!` 
          }
        }
      },
      'projects': { 
        type: 'directory',
        contents: PORTFOLIO_CONTENT.projects.reduce((acc, project) => {
          const filename = project.name.toLowerCase().replace(/\s+/g, '-') + '.md';
          acc[filename] = { 
            type: 'file', 
            content: `# ${project.name}

${project.description}

## Technologies
${project.technologies.map(tech => `- ${tech}`).join('\n')}

## Links
[GitHub Repository](${project.link})`
          };
          return acc;
        }, {})
      }
    }
  }
};

// Helper function to get a file system item from a path
const getItemAtPath = (path) => {
  if (path === '~') {
    return FILE_SYSTEM['~'];
  }
  
  // Strip leading ~ and /
  const cleanPath = path.replace(/^~\/?/, '');
  if (!cleanPath) {
    return FILE_SYSTEM['~'];
  }
  
  // Navigate through the path
  const parts = cleanPath.split('/');
  let current = FILE_SYSTEM['~'];
  
  for (const part of parts) {
    if (!current || current.type !== 'directory' || !current.contents[part]) {
      return null;
    }
    current = current.contents[part];
  }
  
  return current;
};

// Command processor hook
const useCommandProcessor = ({ currentDirectory, setCurrentDirectory, setHistory }) => {
  const processCommand = useCallback((input) => {
    const args = input.trim().split(/\s+/);
    const command = args[0].toLowerCase();
    
    // Process different commands
    switch (command) {
      case 'help':
        return `Available commands:
  help - Display this help message
  ls [directory] - List directory contents
  cd [directory] - Change directory
  cat [file] - Display file contents
  pwd - Print working directory
  clear - Clear the terminal
  echo [text] - Display a line of text
  whoami - Display current user
  date - Display current date and time
  banner - Display terminal banner
  exit - Exit terminal (reload page)

Shortcuts for content (only work in home directory):
  about - Navigate to about directory
  skills - Navigate to skills directory
  projects - Navigate to projects directory
  education - Navigate to education directory
  experience - Navigate to experience directory
  publications - Navigate to publications directory
  contact - Navigate to contact directory
  resume - Display my resume information`;
      
      case 'ls':
        let targetPath = currentDirectory;
        
        // If a path is provided, adjust it relative to current directory
        if (args[1]) {
          if (args[1].startsWith('~')) {
            targetPath = args[1];
          } else if (args[1] === '..') {
            // Go up one level
            const parts = currentDirectory.split('/');
            if (parts.length > 1) {
              parts.pop();
              targetPath = parts.join('/');
            } else {
              targetPath = '~';
            }
          } else {
            // Append to current path
            targetPath = currentDirectory === '~' 
              ? `~/${args[1]}` 
              : `${currentDirectory}/${args[1]}`;
          }
        }
        
        const dirItem = getItemAtPath(targetPath);
        
        if (!dirItem || dirItem.type !== 'directory') {
          return `ls: ${args[1] || ''}: No such directory`;
        }
        
        const files = Object.keys(dirItem.contents);
        
        if (files.length === 0) {
          return 'No files in this directory.';
        }
        
        if (args.includes('-l')) {
          // Detailed listing
          return files.map(file => {
            const isDir = dirItem.contents[file].type === 'directory';
            return `${isDir ? 'd' : '-'}rwxr-xr-x  1 praggnya  users  ${Math.floor(Math.random() * 10000)}  Apr 1 2025  ${file}${isDir ? '/' : ''}`;
          }).join('\n');
        } else {
          // Simple listing
          return files.map(file => {
            const isDir = dirItem.contents[file].type === 'directory';
            return `${file}${isDir ? '/' : ''}`;
          }).join('  ');
        }
      
      case 'cd':
        if (!args[1] || args[1] === '~') {
          setCurrentDirectory('~');
          return '';
        }
        
        let newPath;
        if (args[1].startsWith('~')) {
          newPath = args[1];
        } else if (args[1] === '..') {
          // Go up one level
          const parts = currentDirectory.split('/');
          if (parts.length > 1) {
            parts.pop();
            newPath = parts.join('/');
          } else {
            newPath = '~';
          }
        } else {
          // Append to current path
          newPath = currentDirectory === '~' 
            ? `~/${args[1]}` 
            : `${currentDirectory}/${args[1]}`;
        }
        
        const targetDir = getItemAtPath(newPath);
        
        if (!targetDir) {
          return `cd: ${args[1]}: No such directory`;
        }
        
        if (targetDir.type !== 'directory') {
          return `cd: ${args[1]}: Not a directory`;
        }
        
        setCurrentDirectory(newPath);
        return '';
      
      case 'cat':
        if (!args[1]) {
          return 'Usage: cat [file]';
        }
        
        let filePath;
        if (args[1].startsWith('~')) {
          filePath = args[1];
        } else {
          // Relative to current directory
          filePath = currentDirectory === '~' 
            ? `~/${args[1]}` 
            : `${currentDirectory}/${args[1]}`;
        }
        
        const fileItem = getItemAtPath(filePath);
        
        if (!fileItem) {
          return `cat: ${args[1]}: No such file or directory`;
        }
        
        if (fileItem.type !== 'file') {
          return `cat: ${args[1]}: Is a directory`;
        }
        
        return fileItem.content;
      
      case 'pwd':
        return currentDirectory;
      
      case 'clear':
        setHistory([]);
        return '';
      
      case 'echo':
        return args.slice(1).join(' ');
      
      case 'whoami':
        return 'praggnya@portfolio';
      
      case 'date':
        return new Date().toString();
      
      case 'banner':
        return `
 _____                                         _  __                             
|  __ \\                                       | |/ /                             
| |__) | __ __ _  __ _  __ _ _ __  _   _  __ _| ' / __ _ _ __  _   _ _ __   __ _ ___ 
|  ___/ '__/ _\` |/ _\` |/ _\` | '_ \\| | | |/ _\` |  < / _\` | '_ \\| | | | '_ \\ / _\` / _ \\
| |   | | | (_| | (_| | (_| | | | | |_| | (_| | . \\ (_| | | | | |_| | | | | (_| | (_) |
|_|   |_|  \\__,_|\\__, |\\__, |_| |_|\\__, |\\__,_|_|\\_\\__,_|_| |_|\\__,_|_| |_|\\__, |\\___/
                  __/ | __/ |       __/ |                                   __/ |     
                 |___/ |___/       |___/                                   |___/      

Type 'help' to see available commands.
`;
      
      case 'exit':
        window.location.reload();
        return 'Exiting...';
      
      // Content shortcuts - only work in home directory
      case 'about':
      case 'skills':
      case 'education':
      case 'experience':
      case 'publications':
      case 'contact':
      case 'projects':
        // Only allow these shortcuts from the home directory
        if (currentDirectory !== '~') {
          return `Command '${command}' is only available in the home directory (~).
Use 'cd ~' to return home first.`;
        }
        
        // Change to the directory
        const targetDirectory = `~/${command}`;
        const dirExists = getItemAtPath(targetDirectory);
        
        if (!dirExists) {
          return `${command}: Directory not found`;
        }
        
        setCurrentDirectory(targetDirectory);
        
        // For content directories, show the content automatically
        if (command !== 'projects') {
          // Show the content of index.md
          const indexFile = getItemAtPath(`${targetDirectory}/index.md`);
          if (indexFile && indexFile.type === 'file') {
            return `Changed to ${command} directory.\n\n${indexFile.content}`;
          }
        } else {
          // For projects, just list available projects
          const projectFiles = Object.keys(FILE_SYSTEM['~'].contents.projects.contents);
          const projectNames = projectFiles.map(file => file.replace('.md', '')).join(', ');
          
          return `Changed to projects directory.\n\nAvailable projects: ${projectNames}\n\nUse 'cat [project-name].md' to view details of a specific project.`;
        }
        
        return `Changed to ${command} directory.`;
      
      case 'resume':
        return `# Praggnya Kanungo - Resume

## Education
University of Virginia, School of Engineering and Applied Science
B.S. Computer Science, Expected May 2026 (Intended Early Graduation)

## Experience
- Perception Engineer, Cavalier Autonomous Racing (Spring 2024-Present)
- Founder & President, The Pendulum Future (Fall 2022-Present)
- Community Project Manager, Computer Science Honor Society (Fall 2023-Spring 2022)

## Skills
Python, Java, C, C++, JavaScript, ReactJS, Swift, Linux, Raspberry Pi, MATLAB, ROS, Graphic Design

## Certifications
- Beginner HTML & CSS Programmer, Girls Who Code
- Certified Entry-Level Python Programmer, Python Institute

Navigate to specific sections using 'cd education', 'cd experience', etc.`;
      
      default:
        if (command.startsWith('./')) {
          return `bash: ${command}: Permission denied`;
        }
        return `Command not found: ${command}. Type 'help' to see available commands.`;
    }
  }, [currentDirectory, setCurrentDirectory, setHistory]);
  
  return { processCommand };
};

export default useCommandProcessor;