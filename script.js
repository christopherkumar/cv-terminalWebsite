// script.js: Handles terminal interactions, command processing, and UI updates.
// This file manages user input, command history, theme toggling, and displays
// content provided by commands.js (which is loaded via a script tag in index.html).

(function() {
	// -------------------------------
	// DOM Element References
	// -------------------------------
	const inputField = document.getElementById("terminal-input");
	const inputText = document.getElementById("input-text");
	const outputDiv = document.getElementById("terminal-output");

	// -------------------------------
	// Terminal Command Definitions
	// -------------------------------
	const availableCommands = {
		skills: "Display skills.",
		experience: "Display work experience.",
		projects: "Display projects.",
		research: "Display research.",
		contact: "Display contact information.",
		clear: "Clear the terminal.",
		light: "Switch to light mode.",
		dark: "Switch to dark mode."
	};
	const commandKeys = Object.keys(availableCommands);

	// -------------------------------
	// Command History Management
	// -------------------------------
	let commandHistory = [];
	let historyIndex = -1;

	// -------------------------------
	// Introductory Text
	// -------------------------------
	const introText = `
		<p class="prompt">➜ ~ whoami</p>
		<p class="prompt">Christopher Kumar</p>
		<p>Engineer. Developer. Problem Solver.</p>
		<p>With a foundation in Computer Systems Engineering and a drive for innovation, I thrive at the intersection of AI, software development, and real-world solutions.</p>
		<ul>
			<li>Bachelor of Engineering (Honours) - Computer Systems</li>
			<li>Experienced in AI, LLMs, and software engineering</li>
			<li>Always learning, always building.</li>
		</ul>
		<p class="prompt">➜ ~ Type a command to explore:</p>
		<p>${commandKeys.join(" | ")}</p>`;

	// -------------------------------
	// Command Handlers Mapping
	// -------------------------------
	// These handlers are for commands that are managed entirely within this file.
	const commandHandlers = {
		clear: clearTerminal,
		light: () => toggleMode("light-mode", "Already in Light Mode.", "Switched to Light Mode."),
		dark: () => toggleMode("light-mode", "Already in Dark Mode.", "Switched to Dark Mode.", true)
	};

	// -------------------------------
	// Initialization
	// -------------------------------
	// When the DOM is ready, initialize the input field and display the intro text.
	document.addEventListener("DOMContentLoaded", () => {
		initializeInputField();
		startTypingSequence();
	});
	// Maintain input focus on any click.
	document.addEventListener("click", () => inputField.focus());
	// Global keydown: Ctrl+L clears the terminal.
	document.addEventListener("keydown", event => {
		if (event.ctrlKey && event.key.toLowerCase() === "l") {
			event.preventDefault();
			clearTerminal();
		}
	});
	// Listen for key events in the input field.
	inputField.addEventListener("keydown", handleKeydownEvent);

	// -------------------------------
	// Input Field Helpers
	// -------------------------------
	// Clears the input field and resets any temporary display text.
	function initializeInputField() {
		inputField.value = "";
		inputText.textContent = "";
	}
	// Resets the input field after a command is submitted.
	function resetInputField() {
		inputField.value = "";
		inputText.textContent = " ";
	}

	// -------------------------------
	// Event Handlers
	// -------------------------------
	// Handles key events (Enter, ArrowUp, ArrowDown, Tab) using guard clauses.
	function handleKeydownEvent(event) {
		if (event.key === "Enter") {
			const command = inputField.value.trim();
			if (!command) return;
			commandHistory.push(command);
			historyIndex = commandHistory.length;
			processCommand(command.toLowerCase());
			resetInputField();
			return;
		}
		if (event.key === "ArrowUp") {
			if (commandHistory.length && historyIndex > 0) {
				inputField.value = commandHistory[--historyIndex];
			}
			event.preventDefault();
			return;
		}
		if (event.key === "ArrowDown") {
			if (commandHistory.length && historyIndex < commandHistory.length - 1) {
				inputField.value = commandHistory[++historyIndex];
			} else {
				historyIndex = commandHistory.length;
				inputField.value = "";
			}
			event.preventDefault();
			return;
		}
		if (event.key === "Tab") {
			event.preventDefault();
			const currentInput = inputField.value.trim();
			const match = commandKeys.find(cmd => cmd.startsWith(currentInput));
			if (match) inputField.value = match;
		}
	}

	// -------------------------------
	// Command Processing Functions
	// -------------------------------
	// Processes the given command, updates the terminal output, and calls the appropriate handler.
	function processCommand(command) {
		outputDiv.innerHTML = introText;
		appendPrompt(`➜ ~ ${command}`);
		// Use a handler if one exists, otherwise display the command's content.
		if (commandHandlers[command]) {
			commandHandlers[command]();
		} else {
			displayCommandResponse(command);
		}
		scrollToBottom();
	}

	// Appends a prompt line to the terminal output.
	function appendPrompt(text) {
		const p = document.createElement("p");
		p.className = "prompt";
		p.textContent = text;
		outputDiv.appendChild(p);
	}

	// Loads and displays command content.
	// Since commands.js is already included via a script tag in index.html,
	// we can directly process the command response.
	function displayCommandResponse(command) {
		processCommandResponse(command);
	}

	// Appends an error message with an ARIA alert role.
	function appendError(message) {
		const errorElement = document.createElement("div");
		errorElement.className = "command-output";
		errorElement.setAttribute("role", "alert");
		errorElement.innerHTML = `<p class="prompt">${message}</p>`;
		outputDiv.appendChild(errorElement);
	}

	// Processes and displays the command response from the commands module.
	function processCommandResponse(command) {
		const responseHTML =
			window.commands[command] ||
			`<p class="prompt">No content available for ${command}.</p>`;
		const responseElement = document.createElement("div");
		responseElement.className = "command-output";
		responseElement.setAttribute("role", "status");
		responseElement.innerHTML = responseHTML;
		outputDiv.appendChild(responseElement);
	}

	// -------------------------------
	// Terminal Utility Functions
	// -------------------------------
	// Clears the terminal output and resets it to the introductory text.
	function clearTerminal() {
		outputDiv.innerHTML = introText;
	}

	// Toggles the light/dark mode by adding or removing a CSS class.
	// Parameters:
	//		modeClass - The CSS class representing the mode.
	//		alreadyMessage - Message if the mode is already active/inactive.
	//		switchedMessage - Message to display upon a successful toggle.
	//		remove (optional) - If true, indicates removal of the mode.
	function toggleMode(modeClass, alreadyMessage, switchedMessage, remove = false) {
		const isModeActive = document.body.classList.contains(modeClass);
		if (remove ? !isModeActive : isModeActive) {
			outputDiv.innerHTML = introText + `<p class="prompt">${alreadyMessage}</p>`;
		} else {
			document.body.classList.toggle(modeClass, !remove);
			outputDiv.innerHTML = introText + `<p class="prompt">${switchedMessage}</p>`;
		}
	}

	// Scrolls the terminal output to the bottom.
	function scrollToBottom() {
		outputDiv.scrollTop = outputDiv.scrollHeight;
	}

	// Displays the introductory text when the terminal first loads.
	function startTypingSequence() {
		if (window.introLoaded) return;
		window.introLoaded = true;
		outputDiv.innerHTML = introText;
	}

	// -------------------------------
	// Global Functions for Interactivity
	// -------------------------------
	// Toggle function for expanding/collapsing details with ARIA updates.
	// This is used in commands.js via the onclick attribute.
	window.toggleDetails = function(id) {
		const details = document.getElementById(id);
		const toggle = details.previousElementSibling;
		const expanded = details.classList.toggle("expanded");
		toggle.textContent = expanded ? "[-] " : "[+] ";
		toggle.setAttribute("aria-expanded", String(expanded));
		inputField.focus();
	};

	// Keeps the input field focused.
	window.maintainFocus = function() {
		inputField.focus();
	};
})();
