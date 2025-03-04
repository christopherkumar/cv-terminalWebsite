/*
 * script.js - Interactive resume terminal interface
 */

(function() {
	// DOM elements
	const inputField = document.getElementById("terminal-input");
	const inputText = document.getElementById("input-text");
	const outputDiv = document.getElementById("terminal-output");
	
	// Command configuration
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
	const commandKeys = Object.keys(availableCommands);
	let commandHistory = [];
	let historyIndex = -1;
	
	// Initialize on load
	document.addEventListener("DOMContentLoaded", () => {
	  initializeTerminal();
	  if (!isMobileDevice()) inputField.focus();
	});
	
	// Global keyboard shortcuts
	document.addEventListener("keydown", (event) => {
	  if (event.ctrlKey && event.key.toLowerCase() === "l") {
		event.preventDefault();
		clearTerminal();
	  }
	});
	
	// Input handling
	inputField.addEventListener("keydown", (event) => {
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
		  const match = commandKeys.find(cmd => cmd.startsWith(currentInput));
		  if (match) inputField.value = match;
		  event.preventDefault();
		  break;
	  }
	});
	
	// Core functions
	function initializeTerminal() {
	  inputField.value = "";
	  inputText.textContent = "";
	  displayIntroText();
	  setupCommandButtons();
	}
	
	function displayIntroText() {
	  if (window.introLoaded) return;
	  window.introLoaded = true;
	  
	  const commandButtons = commandKeys
		.map(cmd => `<span class="command-btn" onclick="executeCommandFromClick('${cmd}')">${cmd}</span>`)
		.join(" | ");
		
	  outputDiv.innerHTML = `
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
		<p>${commandButtons}</p>
	  `;
	}
	
	function setupCommandButtons() {
	  document.querySelectorAll(".command-btn").forEach((btn) => {
		btn.addEventListener("click", (event) => {
		  event.preventDefault();
		  event.stopPropagation();
		  executeCommandFromClick(btn.textContent.trim());
		});
	  });
	}
	
	function handleCommand(command) {
	  if (!command.trim()) return;
	  
	  command = command.toLowerCase();
	  appendToOutput(`<p class="prompt">➜ ~ ${command}</p>`);
	  
	  if (commandKeys.includes(command)) {
		executeCommand(command);
	  } else {
		displayUnknownCommand(command);
	  }
	  
	  scrollToBottom();
	}
	
	function executeCommand(command) {
	  switch(command) {
		case "clear": 
		  return clearTerminal();
		case "light": 
		  return toggleMode("light-mode", "Already in Light Mode.", "Switched to Light Mode.");
		case "dark": 
		  return toggleMode("light-mode", "Already in Dark Mode.", "Switched to Dark Mode.", true);
		default:
		  loadAndDisplayCommand(command);
	  }
	}
	
	function loadAndDisplayCommand(command) {
	  if (!window.commands) {
		import("./commands.js")
		  .then(() => displayCommandOutput(command))
		  .catch(err => {
			console.error("Failed to load commands module:", err);
			appendToOutput(`<div class="command-output" role="alert"><p class="prompt">Error loading command content.</p></div>`);
		  });
	  } else {
		displayCommandOutput(command);
	  }
	}
	
	// UI manipulation functions
	function clearTerminal() {
	  displayIntroText();
	}
	
	function toggleMode(modeClass, alreadyMessage, switchedMessage, remove = false) {
	  let message;
	  
	  if (remove) {
		if (!document.body.classList.contains(modeClass)) {
		  message = alreadyMessage;
		} else {
		  document.body.classList.remove(modeClass);
		  message = switchedMessage;
		}
	  } else {
		if (document.body.classList.contains(modeClass)) {
		  message = alreadyMessage;
		} else {
		  document.body.classList.add(modeClass);
		  message = switchedMessage;
		}
	  }
	  
	  displayIntroText();
	  appendToOutput(`<p class="prompt">${message}</p>`);
	}
	
	function displayCommandOutput(command) {
	  const content = window.commands[command] || `<p class="prompt">No content available for ${command}.</p>`;
	  appendToOutput(`<div class="command-output" role="status">${content}</div>`);
	}
	
	function displayUnknownCommand(command) {
	  appendToOutput(`<div class="command-output" role="alert"><p class="prompt">Command "${command}" not found.</p></div>`);
	}
	
	// Helper functions
	function appendToOutput(content) {
	  // Append content without replacing the intro text
	  outputDiv.insertAdjacentHTML('beforeend', content);
	}
	
	function resetInputField() {
	  inputField.value = "";
	  inputText.textContent = " ";
	}
	
	function scrollToBottom() {
	  outputDiv.scrollTop = outputDiv.scrollHeight;
	}
	
	function isMobileDevice() {
	  return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
	}
	
	// Public functions exposed to window
	window.executeCommandFromClick = function(command) {
	  handleCommand(command);
	};
	
	window.toggleDetails = function(id, event) {
	  const details = document.getElementById(id);
	  const toggle = details.previousElementSibling;
	  
	  const isExpanded = details.style.display === "block";
	  details.style.display = isExpanded ? "none" : "block";
	  toggle.textContent = isExpanded ? "[+] " : "[-] ";
	  toggle.setAttribute("aria-expanded", !isExpanded);
	  
	  // Prevent mobile keyboard when clicking collapsible items
	  if (isMobileDevice()) {
		event.preventDefault();
		event.stopPropagation();
	  }
	};
	
	window.maintainFocus = function(event) {
	  if (!isMobileDevice()) {
		inputField.focus();
	  } else if (event.target !== inputField) {
		event.preventDefault();
	  }
	};
  })();