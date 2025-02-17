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
        outputDiv.innerHTML += `<p class='prompt'>➜ ~ ${command}</p>`;
        outputDiv.innerHTML += window.commands[command] || `<p class="prompt">Command not found. Try: skills, experience, projects, contact, clear, light, dark.</p>`;
    }
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function typeText(element, text, speed = 50, callback = null) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function typeLineByLine(lines, index = 0, callback = null) {
    if (index >= lines.length) {
        if (callback) callback();
        return;
    }
    let line = lines[index];
    let element = document.createElement(line.tag);
    if (line.class) element.classList.add(line.class);
    document.getElementById("terminal-output").appendChild(element);
    typeText(element, line.text, 30, () => typeLineByLine(lines, index + 1, callback));
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
