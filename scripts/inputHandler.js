// inputHandler.js
// Handles user input and keyboard events

import { inputField, commandHistory, commandKeys } from "./constants.js";
import { handleCommand } from "./commandHandler.js";

let historyIndex = commandHistory.length;
let tabCycleIndex = 0;

// Handles keyboard interactions (Enter, Arrow keys, Tab).
export function handleKeydownEvent(event) {
    // Prevent input beyond 50 characters
    if (inputField.value.length >= 50 && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        event.preventDefault();
        return;
    }

    switch (event.key) {
        case "Enter":
            const command = inputField.value.trim();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
            }
            handleCommand(command);
            resetInputField();
            break;

        case "ArrowUp":
            if (commandHistory.length > 0 && historyIndex > 0) {
                historyIndex--;
                inputField.value = commandHistory[historyIndex];
            }
            event.preventDefault();
            break;

        case "ArrowDown":
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                historyIndex++;
                inputField.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                inputField.value = "";
            }
            event.preventDefault();
            break;

        case "Tab":
            event.preventDefault();
            autoCompleteCommand();
            break;

        default:
            tabCycleIndex = 0;
            break;
    }
}

// Clears the input field after executing a command.
function resetInputField() {
    inputField.value = "";
}

// Implements command auto-completion.
function autoCompleteCommand() {
    const currentInput = inputField.value.trim();
    const mainCommands = commandKeys.filter(cmd => !['light', 'dark'].includes(cmd)); // Use theme instead of light/dark for cycling
    
    if (!currentInput || mainCommands.includes(currentInput)) {
        inputField.value = mainCommands[tabCycleIndex];
        tabCycleIndex = (tabCycleIndex + 1) % mainCommands.length;
    } else {
        const match = commandKeys.find(cmd => cmd.startsWith(currentInput));
        if (match) {
            inputField.value = match;
        }
    }
}