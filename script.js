/*
 * script.js
 * This script handles user input and manages the terminal interface for the interactive resume website.
 * It processes commands, maintains command history, and enables features like theme switching and auto-completion.
 */

// Encapsulate all code within an IIFE
(function() {
	// Get references to the input field, input text display, and output div
	const inputField = document.getElementById("terminal-input");
	const inputText = document.getElementById("input-text");
	const outputDiv = document.getElementById("terminal-output");

	// List of available commands with descriptions
	const availableCommands = {
		"skills": "Display skills.",
		"experience": "Display work experience.",
		"projects": "Display projects.",
		"research": "Display research.",
		"links": "Display links information.",
		"clear": "Clear the terminal.",
		"light": "Switch to light mode.",
		"dark": "Switch to dark mode."
	};

	// Array of command keys for easy checking
	const commandKeys = Object.keys(availableCommands);

	// Command history array and index for navigation
	let commandHistory = [];
	let historyIndex = -1;

	// Introductory text displayed in the terminal (help removed)
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
		<p>
			${commandKeys.map(cmd => `<span class="command-btn" onclick="executeCommandFromClick('${cmd}')">${cmd}</span>`).join(" | ")}
		</p>
		`;

	// Initialize the input field and start the typing sequence when the DOM is fully loaded
	document.addEventListener("DOMContentLoaded", () => {
		initializeInputField();
		startTypingSequence();
	});

	// Only focus input when user clicks on it
	inputField.addEventListener("click", (event) => {
		event.stopPropagation(); // Prevent unwanted bubbling
		inputField.focus();
	});

	// Prevent keyboard opening when clicking a command
	document.querySelectorAll(".command-btn").forEach((btn) => {
		btn.addEventListener("click", (event) => {
			event.preventDefault();
			event.stopPropagation(); // Prevent focus shifting to input
			const command = btn.textContent.trim();
			executeCommandFromClick(command);
		});
	});

	// Global keydown for additional shortcuts (e.g., Ctrl+L to clear terminal)
	document.addEventListener("keydown", (event) => {
		// If Ctrl+L is pressed, clear the terminal
		if (event.ctrlKey && event.key.toLowerCase() === "l") {
			event.preventDefault();
			clearTerminal();
		}
	});

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
			const command = inputField.value.trim();
			if (command) {
				commandHistory.push(command);
				historyIndex = commandHistory.length; // Reset history index
			}
			handleCommand(command);
			resetInputField();
		} else if (event.key === "ArrowUp") {
			// Navigate command history backwards
			if (commandHistory.length > 0 && historyIndex > 0) {
				historyIndex--;
				inputField.value = commandHistory[historyIndex];
				event.preventDefault();
			}
		} else if (event.key === "ArrowDown") {
			// Navigate command history forwards
			if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
				historyIndex++;
				inputField.value = commandHistory[historyIndex];
				event.preventDefault();
			} else {
				historyIndex = commandHistory.length;
				inputField.value = "";
				event.preventDefault();
			}
		} else if (event.key === "Tab") {
			// Autocomplete command on Tab key
			event.preventDefault();
			const currentInput = inputField.value.trim();
			const match = commandKeys.find(cmd => cmd.startsWith(currentInput));
			if (match) {
				inputField.value = match;
			}
		}
	}

	// Function to reset the input field
	function resetInputField() {
		inputField.value = "";
		inputText.textContent = " ";
	}

	// Function to handle commands entered by the user
	function handleCommand(command) {
		if (!command.trim()) return;
		command = command.toLowerCase();
		outputDiv.innerHTML = introText;

		let commandElement = document.createElement("p");
		commandElement.classList.add("prompt");
		commandElement.innerHTML = `➜ ~ ${command}`;
		outputDiv.appendChild(commandElement);

		if (commandKeys.includes(command)) {
			executeCommand(command);
		} else {
			displayUnknownCommand(command);
		}
		scrollToBottom();
	}

	// Function to execute a command
	function executeCommand(command) {
		if (command === "clear") return clearTerminal();
		if (command === "light") return toggleMode("light-mode", "Already in Light Mode.", "Switched to Light Mode.");
		if (command === "dark") return toggleMode("light-mode", "Already in Dark Mode.", "Switched to Dark Mode.", true);
		
		displayCommandResponse(command);
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

	// Function to display the command and its response using lazy-loading for the commands module
	function displayCommandResponse(command) {
		if (!window.commands) {
			// Lazy-load the commands module if not already loaded
			import("./commands.js")
				.then(() => {
					processCommandResponse(command);
				})
				.catch(err => {
					console.error("Failed to load commands module:", err);
					let errorElement = document.createElement("div");
					errorElement.innerHTML = `<p class="prompt">Error loading command content.</p>`;
					errorElement.classList.add("command-output");
					errorElement.setAttribute("role", "alert");
					outputDiv.appendChild(errorElement);
				});
		} else {
			processCommandResponse(command);
		}
	}

	// Helper function to process and display command responses
	function processCommandResponse(command) {
		let responseElement = document.createElement("div");
		responseElement.innerHTML = window.commands[command] || `<p class="prompt">No content available for ${command}.</p>`;
		// Apply fade-in animation to command outputs and set ARIA role for status updates
		responseElement.classList.add("command-output");
		responseElement.setAttribute("role", "status");
		outputDiv.appendChild(responseElement);
	}

	// Function to display unknown command error
	function displayUnknownCommand(command) {
		let errorElement = document.createElement("div");
		errorElement.innerHTML = `<p class="prompt">Command "${command}" not found.</p>`;
		// Apply fade-in animation and mark error messages as alerts for assistive tech
		errorElement.classList.add("command-output");
		errorElement.setAttribute("role", "alert");
		outputDiv.appendChild(errorElement);
	}

	// Function to handle command button clicks
	window.executeCommandFromClick = function(command) {
		handleCommand(command);
	};

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

	// Function to toggle the display of details sections with ARIA support
	window.toggleDetails = function(id) {
		const details = document.getElementById(id);
		const toggle = details.previousElementSibling;
		if (details.style.display === "none" || details.style.display === "") {
			details.style.display = "block";
			toggle.textContent = "[-] ";
			toggle.setAttribute("aria-expanded", "true");
		} else {
			details.style.display = "none";
			toggle.textContent = "[+] ";
			toggle.setAttribute("aria-expanded", "false");
		}
		// Smooth transition effect
		details.style.transition = "all 0.3s ease";
		inputField.focus();
	};

	// Function to maintain focus on the input field
	window.maintainFocus = function(event) {
		if (event.target !== inputField) {
			event.preventDefault(); // Prevent default keyboard popup behavior
		}
	};	
})();
