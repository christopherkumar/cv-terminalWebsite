// constants.js
// Holds global constants for the terminal application

// References to key DOM elements.
export const inputField = document.getElementById("terminal-input");
export const inputText = document.getElementById("input-text");
export const outputDiv = document.getElementById("terminal-output");

// 	Stores all available commands and descriptions.
export const availableCommands = {
    "skills": "Display skills.",
    "experience": "Display work experience.",
    "projects": "Display projects.",
    "research": "Display research.",
    "contact": "Display contact information.",
    "clear": "Clear the terminal.",
    "light": "Switch to light mode.",
    "dark": "Switch to dark mode."
};

// Extracts command names from availableCommands.
export const commandKeys = Object.keys(availableCommands);

//Manages command history and navigation.
export let commandHistory = [];
export let historyIndex = -1;
export let tabCycleIndex = 0;

// Defines the intro text displayed in the terminal.
export const introText = `
    <p class="intro-command">➜ ~ whoami</p>
    <p class="intro-response">Christopher Kumar</p>
    <p>📍 Australia</p>
    <p>Engineer. Developer. Problem Solver.</p>
    <p>With a foundation in Computer Systems Engineering and a drive for innovation, I thrive in the intersection of AI, software development, and real-world solutions.</p>
    <ul>
        <li>Bachelor of Engineering (Honours) - Computer Systems</li>
        <li>Experienced in AI, LLMs, and software engineering</li>
        <li>Always learning, always building.</li>
    </ul>
    <p class="prompt">➜ ~ Type a command to explore:</p>
    <p>
    ${commandKeys.map(cmd => `<span class="command-btn" onclick="executeCommandFromClick('${cmd}')">${cmd}</span>`).join(" | ")}
    </p>
`;