const inputField = document.getElementById("terminal-input");
const inputText = document.getElementById("input-text");
const outputDiv = document.getElementById("terminal-output");

// Function to maintain focus on input field
function maintainFocus() {
    inputField.focus();
}

// Initialize focus
inputText.textContent = '';
maintainFocus();

// Update displayed text as user types
inputField.addEventListener("input", function () {
    inputText.textContent = inputField.value;
});

// Handle Enter key
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const command = inputField.value.trim();
        if (command) {
            outputDiv.innerHTML += `<p><span class='prompt'>➜ ~ </span>${command}</p>`;
            outputDiv.innerHTML += commands[command] || `<p>Command not found. Try: skills, experience, projects, contact.</p>`;
            inputField.value = "";
            inputText.textContent = "\u00A0";
            outputDiv.scrollTop = outputDiv.scrollHeight;
        }
    }
});

function toggleMode() {
    document.body.classList.toggle("light-mode");
    maintainFocus();
}

function resetTerminal() {
    outputDiv.innerHTML = "";
    maintainFocus();
}

function toggleDetails(id) {
    const details = document.getElementById(id);
    const toggle = details.previousElementSibling;
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
        toggle.innerHTML = "[-] ";
    } else {
        details.style.display = "none";
        toggle.innerHTML = "[+] ";
    }
    maintainFocus();
}const inputField = document.getElementById("terminal-input");
const inputText = document.getElementById("input-text");
const outputDiv = document.getElementById("terminal-output");

// Function to maintain focus on input field
function maintainFocus() {
    inputField.focus();
}

// Initialize focus
inputText.textContent = '';
maintainFocus();

// Update displayed text as user types
inputField.addEventListener("input", function () {
    inputText.textContent = inputField.value;
});

// Handle Enter key
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const command = inputField.value.trim();
        if (command) {
            outputDiv.innerHTML += `<p><span class='prompt'>➜ ~ </span>${command}</p>`;
            outputDiv.innerHTML += commands[command] || `<p>Command not found. Try: skills, experience, projects, contact.</p>`;
            inputField.value = "";
            inputText.textContent = "\u00A0";
            outputDiv.scrollTop = outputDiv.scrollHeight;
        }
    }
});

function toggleMode() {
    document.body.classList.toggle("light-mode");
    maintainFocus();
}

function resetTerminal() {
    outputDiv.innerHTML = "";
    maintainFocus();
}

function toggleDetails(id) {
    const details = document.getElementById(id);
    const toggle = details.previousElementSibling;
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
        toggle.innerHTML = "[-] ";
    } else {
        details.style.display = "none";
        toggle.innerHTML = "[+] ";
    }
    maintainFocus();
}