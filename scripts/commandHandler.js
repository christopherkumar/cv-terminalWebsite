// commandHandler.js
// Processes and executes commands

import { outputDiv, commandKeys, getIntroText, updateCommandButtons, commandHistory } from "./constants.js";
import { toggleModeWithoutClearing } from "./utils.js";
import "./commands.js";

let historyIndex = commandHistory.length;

// Handles command execution and output rendering.
export function handleCommand(command) {
    if (!command.trim()) return;
    command = command.toLowerCase();
    
    // Handle theme command specially
    if (command === "theme" || command === "light" || command === "dark") {
        handleThemeCommand(command);
        return;
    }
    
    resetTerminalOutput();

    let commandElement = document.createElement("p");
    commandElement.classList.add("prompt");
    commandElement.innerHTML = `➜ ~ ${command}`;
    outputDiv.appendChild(commandElement);

    if (commandKeys.includes(command)) {
        executeCommand(command);
    } else {
        displayOutput(`<p class="error">Command \"${command}\" not found.</p>`, true);
    }
}

// Handles theme switching and clears terminal
function handleThemeCommand(command) {
    // Clear terminal first
    resetTerminalOutput();
    
    // Determine what mode we're switching TO (before the toggle)
    const targetMode = document.body.classList.contains("light-mode") ? "dark" : "light";
    
    // Add the command prompt to show the target mode
    let commandElement = document.createElement("p");
    commandElement.classList.add("prompt");
    commandElement.innerHTML = `➜ ~ ${targetMode}`;
    outputDiv.appendChild(commandElement);
    
    // Toggle the theme
    toggleModeWithoutClearing();
    
    // Show a brief message about the change
    const newMode = document.body.classList.contains("light-mode") ? "Light" : "Dark";
    let responseElement = document.createElement("div");
    responseElement.innerHTML = `<p class="prompt">Switched to ${newMode} Mode.</p>`;
    responseElement.classList.add("command-output");
    responseElement.style.maxHeight = "0px";
    responseElement.style.opacity = "0";
    
    outputDiv.appendChild(responseElement);
    
    setTimeout(() => {
        responseElement.style.transition = "max-height 0.8s ease-out, opacity 0.8s ease-out";
        responseElement.style.maxHeight = "500px";
        responseElement.style.opacity = "1";
    }, 200);
    
    // Update the theme button immediately
    updateCommandButtons();
    
    outputDiv.scrollTo({ top: outputDiv.scrollHeight, behavior: "smooth" });
}

// Allows commands to be executed when clicked.
export function executeCommandFromClick(command) {
    handleCommand(command);
    commandHistory.push(command);
    historyIndex = commandHistory.length;
}

// Executes a command and performs the appropriate action.
function executeCommand(command) {
    displayOutput(window.commands[command] || `<p class="prompt">No content available for ${command}.</p>`);
}

// Handles output display with roll-up and roll-down effects.
function displayOutput(content, isError = false) {
    const commandOutputs = outputDiv.querySelectorAll(".command-output");
    if (commandOutputs.length > 0) {
        const lastCommand = commandOutputs[commandOutputs.length - 1];
        lastCommand.style.transition = "max-height 0.6s ease-in, opacity 0.6s ease-in";
        lastCommand.style.maxHeight = "0px";
        lastCommand.style.opacity = "0";

        setTimeout(() => {
            lastCommand.remove();
            appendOutput(content, isError);
        }, 600);
    } else {
        appendOutput(content, isError);
    }
}

// Appends the output content to the terminal
function appendOutput(content, isError) {
    let responseElement = document.createElement("div");
    responseElement.innerHTML = content;
    responseElement.classList.add("command-output");
    responseElement.setAttribute("role", isError ? "alert" : "status");
    responseElement.style.maxHeight = "0px";
    responseElement.style.opacity = "0";
    
    outputDiv.appendChild(responseElement);
    
    setTimeout(() => {
        responseElement.style.transition = "max-height 0.8s ease-out, opacity 0.8s ease-out";
        responseElement.style.maxHeight = "500px";
        responseElement.style.opacity = "1";
    }, 200);
    
    outputDiv.scrollTo({ top: outputDiv.scrollHeight, behavior: "smooth" });
}

// Clears the terminal and resets it to the intro text.
export function resetTerminalOutput() {
    outputDiv.innerHTML = getIntroText();
}