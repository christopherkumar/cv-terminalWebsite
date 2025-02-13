const inputField = document.getElementById("terminal-input");
const inputText = document.getElementById("input-text");
const outputDiv = document.getElementById("terminal-output");

function maintainFocus() {
    inputField.focus();
}

inputText.textContent = '';
maintainFocus();

inputField.addEventListener("input", function () {
    // Directly mirror input value to the display element
    inputText.textContent = inputField.value || "\u00A0"; 

    // Keep cursor at the end of input
    setTimeout(() => {
        inputField.selectionStart = inputField.selectionEnd = inputField.value.length;
    }, 0);
});


// inputField.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//         const command = inputField.value.trim();
//         if (command) {
//             outputDiv.innerHTML = `<p><span class='prompt'>➜ ~ </span>${command}</p>`;

//             // Access commands via window.commands
//             outputDiv.innerHTML += window.commands[command] || `<p>Command not found. Try: skills, experience, projects, contact.</p>`;

//             inputField.value = "";
//             inputText.textContent = "\u00A0";
//             outputDiv.scrollTop = outputDiv.scrollHeight;
//         }
//     }
// });

let introLoaded = false; // Prevents multiple initializations

function typeText(element, text, speed = 50, callback = null) {
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else if (callback) {
            callback(); // Move to the next step
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

    typeText(element, line.text, 30, () => typeLineByLine(lines, index + 1, callback)); // Move to the next line
}

function typeListItems(ulElement, items, index = 0, callback = null) {
    if (index >= items.length) {
        if (callback) callback();
        return;
    }

    let li = document.createElement("li");
    ulElement.appendChild(li);

    typeText(li, items[index], 30, () => typeListItems(ulElement, items, index + 1, callback)); // Type next list item
}

function startTypingSequence() {
    if (introLoaded) return; // Prevents reloading on every command
    introLoaded = true;

    const terminalOutput = document.getElementById("terminal-output");

    const introLines = [
        { tag: "p", class: "prompt", text: "➜ ~ whoami" },
        { tag: "p", text: "Christopher Kumar" },
    ];

    typeLineByLine(introLines, 0, () => {
        // Create an empty <ul> first
        const ul = document.createElement("ul");
        terminalOutput.appendChild(ul);

        // Type the list items inside it
        typeListItems(ul, [
            "Bachelor of Engineering (Honours) - Computer Systems",
            "Foundation Science"
        ], 0, () => {
            // After list items are typed, type the available commands
            setTimeout(() => {
                typeLineByLine([
                    { tag: "p", class: "prompt", text: "➜ ~ Available commands: skills, experience, projects, contact, clear, light, dark" }
                ]);
            }, 500);
        });
    });
}

// Ensure the intro text is only loaded once
window.onload = () => {
    startTypingSequence();
};

// Handle user input without clearing the initial text
document.getElementById("terminal-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const command = this.value.trim().toLowerCase(); // Convert to lowercase
        const outputDiv = document.getElementById("terminal-output");

        // Preserve intro text
        const introText = '<p class="prompt">➜ ~ whoami</p>' +
                          '<p>Christopher Kumar</p>' +
                          '<ul><li>Bachelor of Engineering (Honours) - Computer Systems</li>' +
                          '<li>Foundation Science</li></ul>' +
                          '<p class="prompt">➜ ~ Available commands: skills, experience, projects, contact, clear, light, dark</p>';

        if (command === "clear") {
            // Reset output but keep the intro text
            outputDiv.innerHTML = introText;
        } else if (command === "light") {
            // Switch to light mode
            document.body.classList.add("light-mode");
            outputDiv.innerHTML = introText + `<p>Switched to Light Mode.</p>`;
        } else if (command === "dark") {
            // Switch to dark mode
            document.body.classList.remove("light-mode");
            outputDiv.innerHTML = introText + `<p>Switched to Dark Mode.</p>`;
        } else {
            // Clear previous command output while keeping the intro
            outputDiv.innerHTML = introText;

            // Append new command input
            const commandElement = document.createElement("p");
            commandElement.innerHTML = `<span class='prompt'>➜ ~ </span>${this.value.trim()}`; // Keep user input formatting
            outputDiv.appendChild(commandElement);

            // Append command output (case-insensitive matching)
            const outputElement = document.createElement("div");
            outputElement.innerHTML = window.commands[command] || `<p>Command not found. Try: skills, experience, projects, contact, clear, light, dark.</p>`;
            outputDiv.appendChild(outputElement);
        }

        // Reset input
        this.value = "";
        document.getElementById("input-text").textContent = "\u00A0";
        outputDiv.scrollTop = outputDiv.scrollHeight; // Auto-scroll to bottom
    }
});

function toggleMode() {
    document.body.classList.toggle("light-mode");
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
