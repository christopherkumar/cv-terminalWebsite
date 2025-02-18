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
        inputField.value = "";
        inputText.textContent = " ";
    } else if (event.key === "Tab") {
        event.preventDefault();
        autocompleteCommand();
    }
}

// Function to handle commands entered by the user
function handleCommand(command) {
    if (!command) return;
    command = command.toLowerCase();
    switch (command) {
        case "clear":
            clearTerminal();
            break;
        case "light":
            toggleLightMode();
            break;
        case "dark":
            toggleDarkMode();
            break;
        default:
            displayCommandResponse(command);
            break;
    }
    scrollToBottom();
}

// Function to clear the terminal and display the intro text
function clearTerminal() {
    outputDiv.innerHTML = introText;
}

// Function to toggle light mode
function toggleLightMode() {
    if (document.body.classList.contains("light-mode")) {
        outputDiv.innerHTML = introText + `<p class="prompt">Already in Light Mode.</p>`;
    } else {
        document.body.classList.add("light-mode");
        outputDiv.innerHTML = introText + `<p class="prompt">Switched to Light Mode.</p>`;
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    if (!document.body.classList.contains("light-mode")) {
        outputDiv.innerHTML = introText + `<p class="prompt">Already in Dark Mode.</p>`;
    } else {
        document.body.classList.remove("light-mode");
        outputDiv.innerHTML = introText + `<p class="prompt">Switched to Dark Mode.</p>`;
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

// Function to toggle between light and dark modes
function toggleMode() {
    document.body.classList.toggle("light-mode");
    inputField.focus();
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

// Function to autocomplete the command based on the current input
function autocompleteCommand() {
    const currentInput = inputField.value.trim().toLowerCase();
    const matchingCommands = availableCommands.filter(cmd => cmd.startsWith(currentInput));
    if (matchingCommands.length === 1) {
        inputField.value = matchingCommands[0];
        inputText.textContent = matchingCommands[0];
    }
}