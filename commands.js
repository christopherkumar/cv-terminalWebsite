/*
 * commands.js
 * This script defines the available commands and their corresponding content for the interactive resume terminal.
 * It dynamically generates and returns formatted HTML content for sections such as skills, experience, projects, research, and links information.
 */

// ======================================================
// 1. Helper Functions for Generating HTML Content
// ======================================================
// Generates HTML from a structured data object
function generateContent(data) {
    return `
        <ul>
        ${Object.entries(data).map(([key, value]) => generateListItem(key, value)).join('')}
        </ul>
    `;
}

// Generates a list item with toggle functionality for details
function generateListItem(key, value) {
    const id = key.replace(/\s+/g, '');
    return `
        <li>
        <span class="toggle" onclick="toggleDetails('${id}')" title="Click to expand/collapse details">[+] </span>${key}
        <div id="${id}" class="details" style="display: none;">
            <ul>
            ${value.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        </li>
    `;
}

// ======================================================
// 2. Command-Specific Content Functions
// ======================================================
// Content for the "skills" command
function getSkillsContent() {
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
    return generateContent(skills);
}

// Content for the "experience" command
function getExperienceContent() {
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
    return generateContent(experience);
}

// Content for the "projects" command
function getProjectsContent() {
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
    return generateContent(projects);
}

// Content for the "research" command
function getResearchContent() {
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
    return generateContent(research);
}

// Content for the "links" command
function getLinksContent() {
    return `
        <ul class="links-section">
        <li><a href="mailto:christopherkumar812@gmail.com">Email</a></li>
        <li><a href="https://www.linkedin.com/in/christopher-kumar/">LinkedIn</a></li>
        <li><a href="https://github.com/christopherkumar">GitHub</a></li>
        <li><a href="https://leetcode.com/u/cvkumar812">LeetCode</a></li>
        </ul>
    `;
}

// ======================================================
// 3. Expose Commands to the Global Scope
// ======================================================
window.commands = {
    "skills": getSkillsContent(),
    "experience": getExperienceContent(),
    "projects": getProjectsContent(),
    "research": getResearchContent(),
    "links": getLinksContent(),
};
