// commandHandler.js
// Processes and executes commands

import { outputDiv, commandKeys, introText } from "./constants.js";
import { toggleMode } from "./utils.js";
import "./commands.js";

// Handles command execution and output rendering.
export function handleCommand(command) {
    if (!command.trim()) return;
    command = command.toLowerCase();
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

// Allows commands to be executed when clicked.
export function executeCommandFromClick(command) {
    handleCommand(command);
    commandHistory.push(command);
    historyIndex = commandHistory.length;
}

// Executes a command and performs the appropriate action.
function executeCommand(command) {
    if (command === "light") return toggleMode("light-mode", "Already in Light Mode.", "Switched to Light Mode.");
    if (command === "dark") return toggleMode("light-mode", "Already in Dark Mode.", "Switched to Dark Mode.", true);
    
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
    outputDiv.innerHTML = introText;
}
