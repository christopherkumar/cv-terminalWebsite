// constants.js
// Holds global constants for the terminal application

export const inputField = document.getElementById("terminal-input");
export const inputText = document.getElementById("input-text");
export const outputDiv = document.getElementById("terminal-output");

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

export const commandKeys = Object.keys(availableCommands);
export let commandHistory = [];
export let historyIndex = -1;
export let tabCycleIndex = 0;

export const introText = `
    <p class="prompt">➜ ~ whoami</p>
    <p class="prompt">Christopher Kumar</p>
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
