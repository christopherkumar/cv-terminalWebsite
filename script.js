// Get references to the input field, input text display, and output div
const inputField = document.getElementById("terminal-input");
const inputText = document.getElementById("input-text");
const outputDiv = document.getElementById("terminal-output");

// List of available commands
const availableCommands = ["skills", "experience", "projects", "research", "contact", "clear", "light", "dark"];

// Introductory text displayed in the terminal
const introText = `
    <p class="prompt">➜ ~ whoami</p>
    <p class="prompt">Christopher Kumar</p>
    <p>Engineer. Developer. Problem Solver.</p>
    <p>With a foundation in Computer Systems Engineering and a drive for innovation, I thrive in the intersection of AI, software development, and real-world solutions.</p>
    <ul>
        <li>Bachelor of Engineering (Honours) - Computer Systems</li>
        <li>Experienced in AI, LLMs, and software engineering</li>
        <li>Always learning, always building.</li>
    </ul>
    <p class="prompt">➜ ~ Type a command to explore:</p>
    <p>skills | experience | projects | research | contact | clear | light | dark</p>`;

// Initialize the input field and start the typing sequence when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeInputField();
    startTypingSequence();
});

// Focus the input field when the document is clicked
document.addEventListener("click", () => inputField.focus());

// Handle keydown events for the input field
inputField.addEventListener("keydown", handleKeydownEvent);

// Function to initialize the input field
function initializeInputField() {
    inputField.value = "";
    inputText.textContent = "";
}

// Function to handle keydown events
function handleKeydownEvent(event) {
    if (event.key === "Enter") {
        handleCommand(inputField.value.trim());
        resetInputField();
    }
}

// Function to reset the input field
function resetInputField() {
    inputField.value = "";
    inputText.textContent = " ";
}

// Function to handle commands entered by the user
function handleCommand(command) {
    if (!command) return;
    command = command.toLowerCase();
    if (availableCommands.includes(command)) {
        executeCommand(command);
    } else {
        displayCommandResponse(command);
    }
    scrollToBottom();
}

// Function to execute a command
function executeCommand(command) {
    switch (command) {
        case "clear":
            clearTerminal();
            break;
        case "light":
            toggleMode("light-mode", "Already in Light Mode.", "Switched to Light Mode.");
            break;
        case "dark":
            toggleMode("light-mode", "Already in Dark Mode.", "Switched to Dark Mode.", true);
            break;
        default:
            displayCommandResponse(command);
            break;
    }
}

// Function to clear the terminal and display the intro text
function clearTerminal() {
    outputDiv.innerHTML = introText;
}

// Function to toggle light or dark mode
function toggleMode(modeClass, alreadyMessage, switchedMessage, remove = false) {
    if (remove) {
        if (!document.body.classList.contains(modeClass)) {
            outputDiv.innerHTML = introText + `<p class="prompt">${alreadyMessage}</p>`;
        } else {
            document.body.classList.remove(modeClass);
            outputDiv.innerHTML = introText + `<p class="prompt">${switchedMessage}</p>`;
        }
    } else {
        if (document.body.classList.contains(modeClass)) {
            outputDiv.innerHTML = introText + `<p class="prompt">${alreadyMessage}</p>`;
        } else {
            document.body.classList.add(modeClass);
            outputDiv.innerHTML = introText + `<p class="prompt">${switchedMessage}</p>`;
        }
    }
}

// Function to display the command and its response
function displayCommandResponse(command) {
    outputDiv.innerHTML = introText;
    let commandElement = document.createElement("p");
    commandElement.classList.add("prompt");
    commandElement.innerHTML = `➜ ~ ${command}`;
    outputDiv.appendChild(commandElement);
    
    let responseElement = document.createElement("div");
    responseElement.innerHTML = window.commands[command] || `<p class="prompt">Command not found. Try: skills | experience | projects | research | contact | clear | light | dark</p>`;
    outputDiv.appendChild(responseElement);
}

// Function to scroll to the bottom of the output div
function scrollToBottom() {
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Function to start the typing sequence and display the intro text
function startTypingSequence() {
    if (window.introLoaded) return;
    window.introLoaded = true;
    outputDiv.innerHTML = introText;
}

// Function to toggle the display of details sections
function toggleDetails(id) {
    const details = document.getElementById(id);
    const toggle = details.previousElementSibling;
    
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
        toggle.textContent = "[-] ";
    } else {
        details.style.display = "none";
        toggle.textContent = "[+] ";
    }
    inputField.focus();
}

// Function to maintain focus on the input field
function maintainFocus() {
    inputField.focus();
}