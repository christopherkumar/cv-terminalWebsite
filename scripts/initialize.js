// initialize.js
// Handles initialization and event listeners

import { inputField, outputDiv, introText } from "./constants.js";
import { handleInputFocus } from "./utils.js";
import { handleKeydownEvent } from "./inputHandler.js";
import { resetTerminalOutput } from "./commandHandler.js";

// Sets up event listeners and initializes the terminal.
export function initializeTerminal() {
    document.addEventListener("DOMContentLoaded", () => {
        initializeInputField();
        startTypingSequence();
        handleInputFocus();

        // Show terminal once initialized
        const terminal = document.querySelector(".terminal");
        terminal.style.visibility = "visible";
        terminal.style.opacity = "1";
    });

    // Maintain focus on the input field
    window.maintainFocus = handleInputFocus;

    // Global keydown for shortcuts (e.g., Ctrl+L to clear terminal)
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key.toLowerCase() === "l") {
            event.preventDefault();
            resetTerminalOutput();
        }
    });

    // Listen for keydown events on the input field
    inputField.addEventListener("keydown", handleKeydownEvent);
}

// Clears the input field on startup.
function initializeInputField() {
    inputField.value = "";
}

// Loads the initial terminal content when the page loads.
function startTypingSequence() {
    if (window.introLoaded) return;
    window.introLoaded = true;
    outputDiv.innerHTML = introText;
}