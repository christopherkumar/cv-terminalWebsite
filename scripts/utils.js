// utils.js
// Utility functions for general operations

import { outputDiv, getIntroText } from "./constants.js";

// Ensures the input field remains focused.
export function handleInputFocus(event) {
    setTimeout(() => {
        document.getElementById("terminal-input").focus();
    }, 0);
    if (event) event.preventDefault();
}

// Detects if the user is on a mobile device.
export function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
}

// Toggles between light and dark modes without clearing terminal content.
export function toggleModeWithoutClearing() {
    document.body.classList.toggle("light-mode");
}

// Toggles between light and dark modes (legacy function - clears terminal).
export function toggleMode(modeClass, alreadyMessage, switchedMessage, remove = false) {
    const shouldHaveClass = !remove;
    const isClassPresent = document.body.classList.contains(modeClass);

    if (isClassPresent === shouldHaveClass) {
        outputDiv.innerHTML = getIntroText() + `<p class="prompt">${alreadyMessage}</p>`;
    } else {
        if (shouldHaveClass) {
            document.body.classList.add(modeClass);
        } else {
            document.body.classList.remove(modeClass);
        }
        outputDiv.innerHTML = getIntroText() + `<p class="prompt">${switchedMessage}</p>`;
    }
}

// Expands and collapses sections in command outputs.
export function toggleDetails(id, event) {
    event.stopPropagation();
    const details = document.getElementById(id);
    const toggle = event.target.closest(".toggle");

    if (!toggle || !details) return;

    if (details.classList.contains("expanded")) {
        // Collapse
        details.style.maxHeight = details.scrollHeight + "px";
        setTimeout(() => {
            details.style.maxHeight = "0px";
            details.style.opacity = "0";
        }, 10);
        toggle.textContent = "[+] ";
        details.classList.remove("expanded");
    } else {
        // Expand
        details.style.display = "block";
        details.style.opacity = "1";
        details.style.maxHeight = details.scrollHeight + "px";
        toggle.textContent = "[-] ";
        details.classList.add("expanded");
    }

    document.getElementById("terminal-output").scrollTo({
        top: document.getElementById("terminal-output").scrollHeight,
        behavior: "smooth",
    });
}