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
        displayUnknownCommand(command);
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
    
    displayCommandResponse(command);
}

// Displays the output of a valid command.
function displayCommandResponse(command) {
    const commandOutputs = outputDiv.querySelectorAll(".command-output");
    if (commandOutputs.length > 0) {
        const lastCommand = commandOutputs[commandOutputs.length - 1];

        lastCommand.style.transition = "max-height 0.6s ease-in, opacity 0.6s ease-in";
        lastCommand.style.maxHeight = "0px";
        lastCommand.style.opacity = "0";

        setTimeout(() => {
            lastCommand.remove();

            let responseElement = document.createElement("div");
            responseElement.innerHTML = window.commands[command] || `<p class="prompt">No content available for ${command}.</p>`;
            responseElement.classList.add("command-output");
            responseElement.setAttribute("role", "status");

            responseElement.style.maxHeight = "0px";
            responseElement.style.opacity = "0";

            outputDiv.appendChild(responseElement);

            setTimeout(() => {
                responseElement.style.transition = "max-height 0.8s ease-out, opacity 0.8s ease-out";
                responseElement.style.maxHeight = "500px";
                responseElement.style.opacity = "1";
            }, 200);
            outputDiv.scrollTo({ top: outputDiv.scrollHeight, behavior: "smooth" });
        }, 600);
    } else {
        let responseElement = document.createElement("div");
        responseElement.innerHTML = window.commands[command] || `<p class="prompt">No content available for ${command}.</p>`;
        responseElement.classList.add("command-output");
        responseElement.setAttribute("role", "status");

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
}

// Handles unknown commands by displaying an error message.
function displayUnknownCommand(command) {
    let errorElement = document.createElement("div");
    errorElement.innerHTML = `<p class="prompt">Command \"${command}\" not found.</p>`;
    errorElement.classList.add("command-output", "slide-down");
    errorElement.setAttribute("role", "alert");
    outputDiv.appendChild(errorElement);
    
    setTimeout(() => errorElement.classList.add("show"), 10);
    outputDiv.scrollTo({ top: outputDiv.scrollHeight, behavior: "smooth" });
}

// Clears the terminal and resets it to the intro text.
export function resetTerminalOutput() {
    outputDiv.innerHTML = introText;
}