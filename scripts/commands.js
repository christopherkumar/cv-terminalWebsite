// commands.js
// Defines the available commands and their corresponding content

// Generates HTML from a structured data object.
function generateContent(data) {
    return `
        <ul>
        ${Object.entries(data).map(([key, value]) => generateListItem(key, value)).join('')}
        </ul>
    `;
}

// Creates a list item with an expandable details section.
function generateListItem(key, value) {
    const id = key.replace(/[^a-zA-Z0-9]/g, '');
    
    return `
        <li>
            <span class="toggle" onclick="toggleDetails('${id}', event)">[+] </span>
            ${key} <!-- This keeps hyperlinks intact -->
            <div id="${id}" class="details" style="display: none;">
                <ul>
                    ${value.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </li>
    `;
}

// Returns formatted content for the "skills" command.
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

// Returns formatted content for the "experience" command.
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

// Returns formatted content for the "projects" command.
function getProjectsContent() {
    const projects = {
        "<a href='https://github.com/christopherkumar/prompt_engineering_test' class='project-link' target='_blank'>LLM Grading Study</a>": [
            "Evaluated OpenAI and Ollama models for grading assessments.",
            "Developed an automated scoring pipeline for evaluating Python scripts.",
            "Conducted performance benchmarking on different LLM frameworks."
        ],
        "<a href='https://github.com/christopherkumar/RAG-evaluation' class='project-link' target='_blank'>Retrieval-Augmented Generation (RAG)</a>": [
            "Implemented and tested RAG workflows to enhance AI-assisted retrieval.",
            "Optimized document embedding techniques to improve response accuracy."
        ],
        "<a href='https://github.com/christopherkumar/cv-terminalWebsite' class='project-link' target='_blank'>Interactive Terminal Resume</a>": [
            "A web-based interactive resume designed to mimic a command-line terminal.",
            "Features include a dark/light mode toggle, expandable sections, and smooth animations.",
            "Provides an engaging way to showcase skills, experience, projects, and contact info.",
            "Supports interactive commands such as 'skills', 'experience', 'projects', and more."
        ],
        "<a href='https://github.com/christopherkumar/simple-ollama-chatbot' class='project-link' target='_blank'>Chatbot with Contextual Memory and Vector Database</a>": [
            "AI-powered chatbot that uses a vector database (ChromaDB) for contextual memory.",
            "Implements conversation summarization after every 10 interactions for efficiency.",
            "Stores conversations as embeddings using the mxbai-embed-large model.",
            "Generates time-stamped log files for both full and summarized conversation history.",
            "Built with Python, Ollama, and LangChain."
        ]
    };
    return generateContent(projects);
}

// Returns formatted content for the "research" command.
function getResearchContent() {
    const research = {
        "<a href='https://drive.google.com/file/d/1EebltMSemESHyryEF65LBV-ht4Ff9U0w/view?usp=sharing' class='project-link' target='_blank'>Effect of Camera Model and Camera Settings in Image Classification</a>": [
            "Investigated how camera hardware and settings impact machine learning image classification accuracy.",
            "Developed a standardized image-capturing process to ensure consistent data collection.",
            "Analyzed the effects of noise, white balance, exposure, and lens selection on classification outcomes."
        ],
        "<a href='https://drive.google.com/file/d/1SM_kGf_Xn0rDWYnz6JT5i9v6w1HTkGaa/view?usp=sharing' class='project-link' target='_blank'>A Comparative Study of the Grading Capabilities of Large Language Models</a>": [
            "Compared OpenAI (GPT-4, GPT-4 Turbo) with open-source models (Llama, Mistral) for automated grading.",
            "Developed a framework using text-based and numeric rubrics to evaluate grading accuracy.",
            "Identified GPT-4 Turbo as the most accurate for structured assessments, with potential improvements in hybrid rubrics."
        ],
        "<a href='https://drive.google.com/file/d/1JAXUuQq4u81rpQDBn9JNBb98mEz8RrmO/view?usp=sharing' class='project-link' target='_blank'>Evaluation of Retrieval-Augmented Generation (RAG) Systems</a>": [
            "Tested five different RAG implementations for retrieving and generating accurate responses.",
            "Determined OpenAI's vector-based RAG as the most reliable, with 24/30 successful responses.",
            "Assessed the limitations of open-source RAG models, identifying potential for future refinements."
        ]
    };
    return generateContent(research);
}

// Returns formatted content for the "contact" command.
function getContactContent() {
    return `
        <ul class="contact-section">
        <li><a href="mailto:christopherkumar812@gmail.com" target='_blank'>Email</a></li>
        <li><a href="https://www.linkedin.com/in/christopher-kumar/" target='_blank'>LinkedIn</a></li>
        <li><a href="https://drive.google.com/file/d/1dS-SfApwipPBnU6ICy0jSEu1XnfnVF2f/view?usp=sharing" target='_blank'>Resume</a></li>
        <li><a href="https://github.com/christopherkumar" target='_blank'>GitHub</a></li>
        <li><a href="https://leetcode.com/u/cvkumar812" target='_blank'>LeetCode</a></li>
        
        </ul>
    `;
}

// Returns formatted content for the "clear" command.
function getClearMessage() {
    return `
        <p class="prompt">Terminal cleared.</p>
        <p>Enter another command.</p>
    `;
}

// Exposes the command outputs globally
window.commands = {
    "skills": getSkillsContent(),
    "experience": getExperienceContent(),
    "projects": getProjectsContent(),
    "research": getResearchContent(),
    "contact": getContactContent(),
    "clear": getClearMessage(),
};