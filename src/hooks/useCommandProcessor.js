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

const DIRECTORIES = {
  '~': ['about', 'skills', 'projects', 'education', 'experience', 'publications', 'contact'],
  '~/projects': PORTFOLIO_CONTENT.projects.map(project => project.name.toLowerCase().replace(/\s+/g, '-'))
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
  ls - List directory contents
  cd [directory] - Change directory
  cat [file] - Display file contents
  clear - Clear the terminal
  about - Display information about me
  skills - List my technical skills
  projects - View my projects
  education - View my educational background
  experience - View my work and leadership experience
  publications - View my publications
  contact - Display my contact information
  theme [name] - Change terminal theme (try: 'cyberpunk', 'matrix', 'retro')
  echo [text] - Display a line of text
  whoami - Display current user
  date - Display current date and time
  banner - Display terminal banner
  resume - Display my resume information
  exit - Exit terminal (reload page)`;
      
      case 'ls':
        if (args[1] === '-l') {
          // Detailed listing
          const files = DIRECTORIES[currentDirectory] || [];
          if (files.length === 0) return 'No files in this directory.';
          
          return files.map(file => {
            const isDir = file.indexOf('.') === -1;
            return `${isDir ? 'd' : '-'}rwxr-xr-x  1 praggnya  users  ${Math.floor(Math.random() * 10000)}  Apr 1 2025  ${file}${isDir ? '/' : ''}`;
          }).join('\n');
        } else {
          // Simple listing
          const files = DIRECTORIES[currentDirectory] || [];
          if (files.length === 0) return 'No files in this directory.';
          
          return files.map(file => {
            const isDir = file.indexOf('.') === -1;
            return `${file}${isDir ? '/' : ''}`;
          }).join('  ');
        }
      
      case 'cd':
        if (!args[1] || args[1] === '~') {
          setCurrentDirectory('~');
          return '';
        }
        
        if (args[1] === '..') {
          if (currentDirectory === '~') {
            return 'Already at home directory.';
          }
          setCurrentDirectory('~');
          return '';
        }
        
        const targetDir = `${currentDirectory}/${args[1]}`;
        if (DIRECTORIES[targetDir]) {
          setCurrentDirectory(targetDir);
          return '';
        } else if (DIRECTORIES[currentDirectory]?.includes(args[1]) && !args[1].includes('.')) {
          setCurrentDirectory(`${currentDirectory}/${args[1]}`);
          return '';
        } else {
          return `cd: ${args[1]}: No such directory`;
        }
      
      case 'cat':
        if (!args[1]) {
          return 'Usage: cat [file]';
        }
        
        // Check if file exists in portfolio content
        if (args[1] === 'about' || args[1] === 'about.md') {
          return PORTFOLIO_CONTENT.about;
        } else if (args[1] === 'skills' || args[1] === 'skills.md') {
          return PORTFOLIO_CONTENT.skills;
        } else if (args[1] === 'education' || args[1] === 'education.md') {
          return PORTFOLIO_CONTENT.education;
        } else if (args[1] === 'experience' || args[1] === 'experience.md') {
          return PORTFOLIO_CONTENT.experience;
        } else if (args[1] === 'publications' || args[1] === 'publications.md') {
          return PORTFOLIO_CONTENT.publications;
        } else if (args[1] === 'contact' || args[1] === 'contact.md') {
          const contact = PORTFOLIO_CONTENT.contact;
          return `# Contact Information

- Email: ${contact.email}
- GitHub: [${contact.github}](https://${contact.github})
- LinkedIn: [${contact.linkedin}](https://${contact.linkedin})
- Phone: ${contact.phone}

Feel free to reach out to me through any of these channels!`;
        } else if (args[1] === 'projects' || args[1] === 'projects.md') {
          const projects = PORTFOLIO_CONTENT.projects;
          return `# Projects\n\n${projects.map(project => (
            `## ${project.name}\n${project.description}\n\nTechnologies: ${project.technologies.join(', ')}\n\nLink: [GitHub Repository](${project.link})`
          )).join('\n\n')}`;
        } else {
          // Check for specific project files
          const projectName = args[1].replace('.md', '');
          const project = PORTFOLIO_CONTENT.projects.find(p => 
            p.name.toLowerCase().replace(/\s+/g, '-') === projectName
          );
          
          if (project) {
            return `# ${project.name}

${project.description}

## Technologies
${project.technologies.map(tech => `- ${tech}`).join('\n')}

## Links
[GitHub Repository](${project.link})`;
          }
          
          return `cat: ${args[1]}: No such file`;
        }
      
      case 'clear':
        setHistory([]);
        return '';
      
      case 'about':
        return PORTFOLIO_CONTENT.about;
      
      case 'skills':
        return PORTFOLIO_CONTENT.skills;
      
      case 'projects':
        const projects = PORTFOLIO_CONTENT.projects;
        return `# Projects\n\n${projects.map(project => (
          `## ${project.name}\n${project.description}\n\nTechnologies: ${project.technologies.join(', ')}\n\nLink: [GitHub Repository](${project.link})`
        )).join('\n\n')}`;
      
      case 'education':
        return PORTFOLIO_CONTENT.education;
      
      case 'experience':
        return PORTFOLIO_CONTENT.experience;
      
      case 'publications':
        return PORTFOLIO_CONTENT.publications;
      
      case 'contact':
        const contact = PORTFOLIO_CONTENT.contact;
        return `# Contact Information

- Email: ${contact.email}
- GitHub: [${contact.github}](https://${contact.github})
- LinkedIn: [${contact.linkedin}](https://${contact.linkedin})
- Phone: ${contact.phone}

Feel free to reach out to me through any of these channels!`;
      
      case 'theme':
        if (!args[1]) {
          return 'Usage: theme [name] - Available themes: cyberpunk, matrix, retro, default';
        }
        
        // This will be handled by the parent component through a callback
        return `Theme changed to ${args[1]}. Type 'theme default' to reset.`;
      
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

For more details, type 'education', 'experience', or 'skills'.`;
      
      case 'exit':
        window.location.reload();
        return 'Exiting...';
      
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