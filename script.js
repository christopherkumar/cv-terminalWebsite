// Get references to the input field, input text display, and output div
const inputField = document.getElementById("terminal-input");
const inputText = document.getElementById("input-text");
const outputDiv = document.getElementById("terminal-output");

// Focus the input field when the document is clicked
document.addEventListener("click", () => inputField.focus());

// Initialize the input field and start the typing sequence when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    inputField.value = "";
    inputText.textContent = "";
    startTypingSequence();
});

// Handle keydown events for the input field
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        // Handle the command when Enter is pressed
        handleCommand(inputField.value.trim());
        inputField.value = "";
        inputText.textContent = " ";
    }
});

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

// Function to handle commands entered by the user
function handleCommand(command) {
    if (!command) return;
    if (command === "clear") {
        // Clear the terminal and display the intro text
        outputDiv.innerHTML = introText;
    } else if (command === "light") {
        if (document.body.classList.contains("light-mode")) {
            // If already in light mode, display a message
            outputDiv.innerHTML = introText + `<p class="prompt">Already in Light Mode.</p>`;
        } else {
            // Switch to light mode
            document.body.classList.add("light-mode");
            outputDiv.innerHTML = introText + `<p class="prompt">Switched to Light Mode.</p>`;
        }
    } else if (command === "dark") {
        if (!document.body.classList.contains("light-mode")) {
            // If already in dark mode, display a message
            outputDiv.innerHTML = introText + `<p class="prompt">Already in Dark Mode.</p>`;
        } else {
            // Switch to dark mode
            document.body.classList.remove("light-mode");
            outputDiv.innerHTML = introText + `<p class="prompt">Switched to Dark Mode.</p>`;
        }
    } else {
        // Display the command and its response
        outputDiv.innerHTML = introText;
        let commandElement = document.createElement("p");
        commandElement.classList.add("prompt");
        commandElement.innerHTML = `➜ ~ ${command}`;
        outputDiv.appendChild(commandElement);
        
        let responseElement = document.createElement("div");
        responseElement.innerHTML = window.commands[command] || `<p class="prompt">Command not found. Try: skills | experience | projects | contact | clear | light | dark</p>`;
        outputDiv.appendChild(responseElement);
    }
    // Scroll to the bottom of the output div
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
        // Show the details section and update the toggle text
        details.style.display = "block";
        toggle.textContent = "[-] ";
    } else {
        // Hide the details section and update the toggle text
        details.style.display = "none";
        toggle.textContent = "[+] ";
    }
    inputField.focus();
}

// Function to maintain focus on the input field
function maintainFocus() {
    inputField.focus();
}