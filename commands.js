// commands.js: This file defines the terminal commands and generates HTML content for each.
// Each command returns HTML that will be injected into the terminal, allowing for dynamic content display.

// Global commands mapping
window.commands = {
	// Map command names to their corresponding generated content.
	skills: getSkillsContent(),
	experience: getExperienceContent(),
	projects: getProjectsContent(),
	research: getResearchContent(),
	contact: getContactContent()
};

// -----------------------------------------------------------------------------
// Function: getSkillsContent
// Description: Generates HTML content for the "skills" command by organizing skills
//              into various categories.
// Returns: A string of HTML markup for skills.
const getSkillsContent = () => {
	// Define skills grouped by category.
	const skills = {
		"Programming Languages": [
			"Python (Machine Learning, AI, Automation)",
			"C++ / C & Arduino (Embedded Systems, High-Performance Computing)",
			"MATLAB & Simulink (Engineering Applications)",
			"HTML, JS & CSS (Web Development, App Development)"
		],
		"Software & Tools": [
			"AI & ML: TensorFlow, PyTorch, scikit-learn",
			"Databases: SQLite, ChromaDB, FAISS, LanceDB",
			"Engineering & Design: AutoCAD, MATLAB",
			"General: Microsoft Office Suite, LibreOffice Suite, Git"
		],
		"AI, Networking & Systems": [
			"LLMs: OpenAI, Anthropic, Ollama, HuggingFace",
			"Networking: Cisco configuration",
			"Systems: Linux, Windows, WSL, Docker"
		],
		"Electronics & Hardware": [
			"Electronics: Circuit design, PCB layout, soldering",
			"Computer Hardware: Assembly, troubleshooting"
		]
	};
	// Generate and return HTML content from the skills object.
	return generateContent(skills);
};

// -----------------------------------------------------------------------------
// Function: getExperienceContent
// Description: Generates HTML content for the "experience" command by listing work
//              experience entries with their details.
// Returns: A string of HTML markup for work experience.
const getExperienceContent = () => {
	// Define work experience entries.
	const experience = {
		"AI/LLM Engineering Intern (2024)": [
			"Researched and optimized the use of LLMs for grading Python scripts.",
			"Improved Retrieval-Augmented Generation workflows for better AI-assisted learning.",
			"Developed and tested AI models to enhance automation in assessment evaluation."
		],
		"Data Annotator (2021-2022)": [
			"Enhanced the GUI and functionality of machine vision annotation tools.",
			"Collaborated in a research team to improve dataset quality for AI models."
		],
		"Barista / Cafe Worker (2018-2022)": [
			"Managed daily operations including POS transactions and stock management.",
			"Developed strong interpersonal skills and ability to perform under pressure."
		]
	};
	// Generate and return HTML content from the experience object.
	return generateContent(experience);
};

// -----------------------------------------------------------------------------
// Function: getProjectsContent
// Description: Generates HTML content for the "projects" command by listing projects
//              and their detailed descriptions.
// Returns: A string of HTML markup for projects.
const getProjectsContent = () => {
	// Define projects with details.
	const projects = {
		"LLM Grading Study": [
			"Evaluated OpenAI and Ollama models for grading assessments.",
			"Developed an automated scoring pipeline for evaluating Python scripts.",
			"Conducted performance benchmarking on different LLM frameworks."
		],
		"Retrieval-Augmented Generation (RAG)": [
			"Implemented and tested RAG workflows to enhance AI-assisted retrieval.",
			"Optimized document embedding techniques to improve response accuracy."
		],
		"AUSLAN Letter Recognition": [
			"Built a real-time hand-sign recognition system using OpenCV and TensorFlow.",
			"Integrated machine learning for improved accuracy in AUSLAN letter recognition."
		]
	};
	// Generate and return HTML content from the projects object.
	return generateContent(projects);
};

// -----------------------------------------------------------------------------
// Function: getResearchContent
// Description: Generates HTML content for the "research" command by listing research
//              projects and their details.
// Returns: A string of HTML markup for research.
const getResearchContent = () => {
	// Define research topics and their details.
	const research = {
		"Effect of Camera Model and Camera Settings in Image Classification": [
			"Investigated how camera hardware and settings impact machine learning image classification accuracy.",
			"Developed a standardized image-capturing process to ensure consistent data collection.",
			"Analyzed the effects of noise, white balance, exposure, and lens selection on classification outcomes."
		],
		"A Comparative Study of the Grading Capabilities of Large Language Models": [
			"Compared OpenAI (GPT-4, GPT-4 Turbo) with open-source models (Llama, Mistral) for automated grading.",
			"Developed a framework using text-based and numeric rubrics to evaluate grading accuracy.",
			"Identified GPT-4 Turbo as the most accurate for structured assessments, with potential improvements in hybrid rubrics."
		],
		"Evaluation of Retrieval-Augmented Generation (RAG) Systems": [
			"Tested five different RAG implementations for retrieving and generating accurate responses.",
			"Determined OpenAI's vector-based RAG as the most reliable, with 24/30 successful responses.",
			"Assessed the limitations of open-source RAG models, identifying potential for future refinements."
		]
	};
	// Generate and return HTML content from the research object.
	return generateContent(research);
};

// -----------------------------------------------------------------------------
// Function: getContactContent
// Description: Generates HTML content for the "contact" command including clickable links.
// Returns: A string of HTML markup for contact information.
const getContactContent = () => `
	<ul class="contact-section">
		<li><a href="mailto:christopherkumar812@gmail.com">Email</a></li>
		<li><a href="https://www.linkedin.com/in/christopher-kumar/">LinkedIn</a></li>
		<li><a href="https://github.com/Christopher-Kumar">GitHub</a></li>
		<li><a href="https://leetcode.com/u/cvkumar812">LeetCode</a></li>
	</ul>
`;

// -----------------------------------------------------------------------------
// Function: generateContent
// Description: Converts a data object into an HTML unordered list.
// Parameters:
//		data (Object): Keys are section titles; values are arrays of detail strings.
// Returns: A string of HTML markup representing the content.
const generateContent = data =>
	`<ul>
		${Object.entries(data)
			.map(([key, value]) => generateListItem(key, value))
			.join('')}
	</ul>`;

// -----------------------------------------------------------------------------
// Function: generateListItem
// Description: Generates a single list item with a toggle button to expand/collapse details.
// Parameters:
//		key (String): The section title.
//		value (Array): An array of strings for the details.
// Returns: A string of HTML markup for the list item, including ARIA attributes.
const generateListItem = (key, value) => {
	const id = key.replace(/\s+/g, '');
	return `
		<li>
			<span class="toggle" 
				onclick="toggleDetails('${id}')" 
				title="Click to expand/collapse details" 
				aria-expanded="false" 
				aria-controls="${id}" 
				aria-label="Toggle details for ${key}">[+] </span>${key}
			<div id="${id}" class="details">
				<ul>
					${value.map(item => `<li>${item}</li>`).join('')}
				</ul>
			</div>
		</li>
	`;
};
