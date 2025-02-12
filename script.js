const inputField = document.getElementById("terminal-input");
const inputText = document.getElementById("input-text");
const outputDiv = document.getElementById("terminal-output");

function maintainFocus() {
    inputField.focus();
}

inputText.textContent = '';
maintainFocus();

inputField.addEventListener("input", function () {
    inputText.textContent = inputField.value;
});

inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const command = inputField.value.trim();
        if (command) {
            outputDiv.innerHTML = `<p><span class='prompt'>➜ ~ </span>${command}</p>`;

            // Access commands via window.commands
            outputDiv.innerHTML += window.commands[command] || `<p>Command not found. Try: skills, experience, projects, contact.</p>`;

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
        toggle.textContent = "[-] ";
    } else {
        details.style.display = "none";
        toggle.textContent = "[+] ";
    }
    maintainFocus();
}
