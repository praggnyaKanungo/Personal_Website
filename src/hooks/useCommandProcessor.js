import { useCallback } from 'react';

// Define your portfolio content here
const PORTFOLIO_CONTENT = {
  about: `# About Me

I am a Computer Science major with a passion for teaching and research. My goal is to become a professor and contribute to the advancement of computer science through both education and research.

My research interests include:
- Artificial Intelligence
- Human-Computer Interaction
- Computer Science Education

I currently teach computer science for a non-profit organization, helping students from diverse backgrounds discover the joy of programming and problem-solving.`,

  skills: `# Skills

## Programming Languages
- Python
- JavaScript/TypeScript
- Java
- C/C++
- SQL

## Web Development
- React
- Node.js
- HTML/CSS
- Next.js
- RESTful APIs

## Other Technical Skills
- Machine Learning
- Data Analysis
- Git/GitHub
- Linux/Unix
- Algorithms & Data Structures`,

  projects: [
    {
      name: "AI Study Assistant",
      description: "An intelligent study tool that uses NLP to help students create and review flashcards more effectively.",
      technologies: ["Python", "TensorFlow", "React", "MongoDB"],
      link: "https://github.com/yourusername/ai-study-assistant"
    },
    {
      name: "Algorithmic Visualization Platform",
      description: "An interactive web platform that visualizes various algorithms to help CS students understand complex concepts.",
      technologies: ["JavaScript", "D3.js", "React", "Node.js"],
      link: "https://github.com/yourusername/algo-viz"
    },
    {
      name: "CS Education Research Tool",
      description: "A platform for collecting and analyzing data on how students learn programming concepts.",
      technologies: ["Python", "Django", "PostgreSQL", "Data Analysis"],
      link: "https://github.com/yourusername/cs-edu-research"
    }
  ],

  education: `# Education

## Computer Science, B.S.
University of Example, 2019-2023
- GPA: 3.95/4.0
- Honors: Dean's List (All Semesters), Outstanding CS Student Award
- Relevant Coursework: Algorithms, AI, Machine Learning, Database Systems, Software Engineering

## Computer Science, M.S. (In Progress)
Example State University, Expected 2025
- Focus on CS Education and Human-Computer Interaction
- Research Assistant in the Interactive Computing Lab`,

  teaching: `# Teaching Experience

## Computer Science Instructor
Tech For All Non-profit, 2021-Present
- Teach introductory and intermediate programming courses to high school students
- Developed custom curriculum focusing on project-based learning
- Mentored over 100 students, with 85% reporting increased interest in pursuing CS careers

## Teaching Assistant
University of Example, 2020-2023
- Assisted professors in Data Structures and Algorithms courses
- Held weekly office hours and review sessions
- Received Excellence in Teaching award (2022)`,

  research: `# Research Experience

## Human-Computer Interaction Lab
Example State University, 2023-Present
- Investigating novel interfaces for programming education
- Developed prototype systems for visualizing code execution
- Co-authored paper on "Improving Engagement in CS Education" (under review)

## Undergraduate Research Assistant
University of Example AI Lab, 2021-2023
- Contributed to project on automated assessment of student code
- Collected and analyzed data on common programming misconceptions
- Presented findings at University Research Symposium`,

  contact: {
    email: "your.email@example.com",
    github: "github.com/yourusername",
    linkedin: "linkedin.com/in/yourusername",
    twitter: "twitter.com/yourusername"
  }
};

const DIRECTORIES = {
  '~': ['about', 'skills', 'projects', 'education', 'teaching', 'research', 'contact'],
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
  teaching - View my teaching experience
  research - View my research experience
  contact - Display my contact information
  theme [name] - Change terminal theme (try: 'cyberpunk', 'matrix', 'retro')
  echo [text] - Display a line of text
  whoami - Display current user
  date - Display current date and time
  banner - Display terminal banner
  exit - Exit terminal (reload page)`;
      
      case 'ls':
        if (args[1] === '-l') {
          // Detailed listing
          const files = DIRECTORIES[currentDirectory] || [];
          if (files.length === 0) return 'No files in this directory.';
          
          return files.map(file => {
            const isDir = file.indexOf('.') === -1;
            return `${isDir ? 'd' : '-'}rwxr-xr-x  1 user  group  ${Math.floor(Math.random() * 10000)}  Mar 31 2025  ${file}${isDir ? '/' : ''}`;
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
        } else if (args[1] === 'teaching' || args[1] === 'teaching.md') {
          return PORTFOLIO_CONTENT.teaching;
        } else if (args[1] === 'research' || args[1] === 'research.md') {
          return PORTFOLIO_CONTENT.research;
        } else if (args[1] === 'contact' || args[1] === 'contact.md') {
          const contact = PORTFOLIO_CONTENT.contact;
          return `# Contact Information

- Email: ${contact.email}
- GitHub: [${contact.github}](https://${contact.github})
- LinkedIn: [${contact.linkedin}](https://${contact.linkedin})
- Twitter: [${contact.twitter}](https://${contact.twitter})

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
      
      case 'teaching':
        return PORTFOLIO_CONTENT.teaching;
      
      case 'research':
        return PORTFOLIO_CONTENT.research;
      
      case 'contact':
        const contact = PORTFOLIO_CONTENT.contact;
        return `# Contact Information

- Email: ${contact.email}
- GitHub: [${contact.github}](https://${contact.github})
- LinkedIn: [${contact.linkedin}](https://${contact.linkedin})
- Twitter: [${contact.twitter}](https://${contact.twitter})

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
        return 'visitor@portfolio';
      
      case 'date':
        return new Date().toString();
      
      case 'banner':
        return `
 _____           _            _  _       
|  _  |___ ___ _| |___ ___ _| |_|___ ___ 
|   __|  _| . | . | . | . | . | |   | . |
|__|  |_| |___|___|___|___|___|_|_|_|_  |
                                    |___|

Type 'help' to see available commands.
`;
      
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