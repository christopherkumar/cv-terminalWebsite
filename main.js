// main.js
// Entry point for the terminal application

import { initializeTerminal } from "./scripts/initialize.js";
import { executeCommandFromClick } from "./scripts/commandHandler.js";
import { toggleDetails } from "./scripts/utils.js";

initializeTerminal();
window.executeCommandFromClick = executeCommandFromClick;
window.toggleDetails = toggleDetails;