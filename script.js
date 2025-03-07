/*
 * script.js
 * This script handles user input and manages the terminal interface for the interactive resume website.
 * It processes commands, maintains command history, and enables features like theme switching and auto-completion.
 */

(function() {
	// ======================================================
	// 1. Element References and Global Variables
	// ======================================================
	const inputField = document.getElementById("terminal-input");
	const inputText = document.getElementById("input-text");
	const outputDiv = document.getElementById("terminal-output");

	const availableCommands = {
		"skills": "Display skills.",
		"experience": "Display work experience.",
		"projects": "Display projects.",
		"research": "Display research.",
		"contact": "Display contact information.",
		"clear": "Clear the terminal.",
		"light": "Switch to light mode.",
		"dark": "Switch to dark mode.",
	};
	const commandKeys = Object.keys(availableCommands);
	let commandHistory = [];
	let historyIndex = -1;
	let tabCycleIndex = 0;

	const introText = `
		<p class="prompt">➜ ~ whoami</p>
		<p class="prompt">Christopher Kumar</p>
		<p>📍 Australia</p>
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

	// ======================================================
	// 2. Initialization and Global Event Listeners
	// ======================================================
	document.addEventListener("DOMContentLoaded", () => {
		initializeInputField();
		startTypingSequence();
		handleInputFocus();
	});

	// Reassign maintainFocus to the helper function
	window.maintainFocus = handleInputFocus;

	// Global keydown for shortcuts (e.g., Ctrl+L to clear terminal)
	document.addEventListener("keydown", (event) => {
		if (event.ctrlKey && event.key.toLowerCase() === "l") {
			event.preventDefault();
			resetTerminalOutput();
		}
	});

	// Attach click event to command buttons
	document.querySelectorAll(".command-btn").forEach((btn) => {
		btn.addEventListener("click", (event) => {
			event.preventDefault();
			event.stopPropagation();
			executeCommandFromClick(btn.textContent.trim());
		});
	});

	// Listen for keydown events on the input field
	inputField.addEventListener("keydown", handleKeydownEvent);

	// ======================================================
	// 3. Utility and Helper Functions
	// ======================================================
	function initializeInputField() {
		inputField.value = "";
		inputText.textContent = "";
	}

	function handleInputFocus(event) {
		if (!isMobileDevice()) {
			inputField.focus();
		}
		event.preventDefault();
	}

	function resetInputField() {
		inputField.value = "";
		inputText.textContent = "";
	}
  
	function resetTerminalOutput() {
		outputDiv.innerHTML = introText;
	}
	
	function isMobileDevice() {
		return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
	}

	// ======================================================
	// 4. Command Processing Functions
	// ======================================================
	function handleCommand(command) {
		if (!command.trim()) return;
		command = command.toLowerCase();
		resetTerminalOutput();

		let commandElement = document.createElement("p");
		commandElement.classList.add("prompt");
		commandElement.innerHTML = `➜ ~ ${command}`;
		outputDiv.appendChild(commandElement);

		if (commandKeys.includes(command)) {
			executeCommand(command);
		} else {
			displayUnknownCommand(command);
		}
	}

	function executeCommand(command) {
		if (command === "clear") return resetTerminalOutput();
		if (command === "light") return toggleMode("light-mode", "Already in Light Mode.", "Switched to Light Mode.");
		if (command === "dark") return toggleMode("light-mode", "Already in Dark Mode.", "Switched to Dark Mode.", true);

		displayCommandResponse(command);
	}

	// Replace the old displayCommandResponse function with:
	function displayCommandResponse(command) {
		let responseElement = document.createElement("div");
		responseElement.innerHTML = window.commands[command] || `<p class="prompt">No content available for ${command}.</p>`;
		responseElement.classList.add("command-output", "slide-down");
		responseElement.setAttribute("role", "status");
		outputDiv.appendChild(responseElement);
		// Trigger the slide-down effect
		setTimeout(() => responseElement.classList.add("show"), 10);
		outputDiv.scrollTo({ top: outputDiv.scrollHeight, behavior: "smooth" });
	}

	function processCommandResponse(command) {
		let responseElement = document.createElement("div");
		responseElement.innerHTML = window.commands[command] || `<p class="prompt">No content available for ${command}.</p>`;
		responseElement.classList.add("command-output");
		responseElement.setAttribute("role", "status");
		outputDiv.appendChild(responseElement);
	}

	function displayUnknownCommand(command) {
		let errorElement = document.createElement("div");
		errorElement.innerHTML = `<p class="prompt">Command "${command}" not found.</p>`;
		errorElement.classList.add("command-output", "slide-down");
		errorElement.setAttribute("role", "alert");
		outputDiv.appendChild(errorElement);
		setTimeout(() => errorElement.classList.add("show"), 10);
		outputDiv.scrollTo({ top: outputDiv.scrollHeight, behavior: "smooth" });
	}

	// ======================================================
	// 5. Theme and UI Toggling Functions
	// ======================================================
	function toggleMode(modeClass, alreadyMessage, switchedMessage, remove = false) {
		const shouldHaveClass = !remove;
		const isClassPresent = document.body.classList.contains(modeClass);

		if (isClassPresent === shouldHaveClass) {
			outputDiv.innerHTML = introText + `<p class="prompt">${alreadyMessage}</p>`;
		} else {
			if (shouldHaveClass) {
				document.body.classList.add(modeClass);
			} else {
				document.body.classList.remove(modeClass);
			}
			outputDiv.innerHTML = introText + `<p class="prompt">${switchedMessage}</p>`;
		}
	}

	// ======================================================
	// 6. Input Field Keydown Event Handler
	// ======================================================
	function handleKeydownEvent(event) {
		switch (event.key) {
			case "Enter":
				const command = inputField.value.trim();
				if (command) {
					commandHistory.push(command);
					historyIndex = commandHistory.length;
				}
				handleCommand(command);
				resetInputField();
				break;

			case "ArrowUp":
				if (commandHistory.length > 0 && historyIndex > 0) {
					historyIndex--;
					inputField.value = commandHistory[historyIndex];
				}
				event.preventDefault();
				break;

			case "ArrowDown":
				if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
					historyIndex++;
					inputField.value = commandHistory[historyIndex];
				} else {
					historyIndex = commandHistory.length;
					inputField.value = "";
				}
				event.preventDefault();
				break;

			case "Tab":
				const currentInput = inputField.value.trim();
				// If input is empty OR already matches a full command, cycle through commands
				if (currentInput === "" || commandKeys.includes(currentInput)) {
					if (commandKeys.includes(currentInput)) {
					const currentIndex = commandKeys.indexOf(currentInput);
					tabCycleIndex = (currentIndex + 1) % commandKeys.length;
					}
					inputField.value = commandKeys[tabCycleIndex];
					tabCycleIndex = (tabCycleIndex + 1) % commandKeys.length;
				} else {
					// Auto-complete based on the partial command
					const match = commandKeys.find(cmd => cmd.startsWith(currentInput));
					if (match) {
					inputField.value = match;
					}
					tabCycleIndex = 0;
				}
				event.preventDefault();
				break;

			default:
				tabCycleIndex = 0;
			break;
		}
	}

	// Expose command button click handler globally
	window.executeCommandFromClick = function(command) {
		handleCommand(command);
		commandHistory.push(command);
		historyIndex = commandHistory.length;
	};

	// ======================================================
	// 7. Typing Sequence and Additional UI Functions
	// ======================================================
	function startTypingSequence() {
		if (window.introLoaded) return;
		window.introLoaded = true;
		outputDiv.innerHTML = introText;
	}

	// Replace the old toggleDetails function with:
	window.toggleDetails = function (id, event) {
		event.stopPropagation();
		const details = document.getElementById(id);
		const toggle = event.target.closest(".toggle");
		if (!toggle || !details) return;
		if (details.classList.contains("expanded")) {
			// Collapse with smooth animation
			details.style.maxHeight = details.scrollHeight + "px";
			setTimeout(() => {
				details.style.maxHeight = "0px";
				details.style.opacity = "0";
			}, 10);
			toggle.textContent = "[+] ";
			details.classList.remove("expanded");
		} else {
			// Expand with smooth animation
			details.style.display = "block";
			details.style.opacity = "1";
			details.style.maxHeight = details.scrollHeight + "px";
			toggle.textContent = "[-] ";
			details.classList.add("expanded");
		}
		outputDiv.scrollTo({ top: outputDiv.scrollHeight, behavior: "smooth" });
		if (isMobileDevice()) {
			event.preventDefault();
			event.stopPropagation();
		}
	};
})();