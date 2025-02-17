const inputField = document.getElementById("terminal-input");
const inputText = document.getElementById("input-text");
const outputDiv = document.getElementById("terminal-output");

document.addEventListener("click", () => inputField.focus());

document.addEventListener("DOMContentLoaded", () => {
    inputField.value = "";
    inputText.textContent = "";
    startTypingSequence();
});

inputField.addEventListener("input", () => {
    requestAnimationFrame(() => {
        inputText.textContent = inputField.value;
    });
});

inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleCommand(inputField.value.trim());
        inputField.value = "";
        inputText.textContent = " ";
    }
});

const introText = `
    <p class="prompt">➜ ~ whoami</p>
    <p class="prompt">Christopher Kumar</p>
    <ul>
        <li>Bachelor of Engineering (Honours) - Computer Systems</li>
        <li>Foundation Science</li>
    </ul>
    <p class="prompt">➜ ~ Available commands: skills, experience, projects, contact, clear, light, dark</p>`;

function handleCommand(command) {
    if (!command) return;
    if (command === "clear") {
        outputDiv.innerHTML = introText;
    } else if (command === "light") {
        document.body.classList.add("light-mode");
        outputDiv.innerHTML = introText + `<p class="prompt">Switched to Light Mode.</p>`;
    } else if (command === "dark") {
        document.body.classList.remove("light-mode");
        outputDiv.innerHTML = introText + `<p class="prompt">Switched to Dark Mode.</p>`;
    } else {
        outputDiv.innerHTML = introText;
        let commandElement = document.createElement("p");
        commandElement.classList.add("prompt");
        commandElement.innerHTML = `➜ ~ ${command}`;
        outputDiv.appendChild(commandElement);
        
        let responseElement = document.createElement("div");
        responseElement.innerHTML = window.commands[command] || `<p class="prompt">Command not found. Try: skills, experience, projects, contact, clear, light, dark.</p>`;
        outputDiv.appendChild(responseElement);
    }
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function startTypingSequence() {
    if (window.introLoaded) return;
    window.introLoaded = true;
    outputDiv.innerHTML = introText;
}

function toggleMode() {
    document.body.classList.toggle("light-mode");
    inputField.focus();
}

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
