// Define the commands and their corresponding content
window.commands = {
    "skills": getSkillsContent(),
    "experience": getExperienceContent(),
    "projects": getProjectsContent(),
    "research": getResearchContent(),
    "contact": getContactContent()
};

// Function to get the content for the "skills" command
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

// Function to get the content for the "experience" command
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

// Function to get the content for the "projects" command
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

// Function to get the content for the "research" command
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

// Function to get the content for the "contact" command
function getContactContent() {
    const contact = {
        "Email": ["<a href='mailto:christopherkumar812@gmail.com'>christopherkumar812@gmail.com</a>"],
        "LinkedIn": ["<a href='https://www.linkedin.com/in/christopher-kumar/'>linkedin.com/in/christopher-kumar</a>"],
        "GitHub": ["<a href='https://github.com/Christopher-Kumar'>github.com/Christopher-Kumar</a>"]
    };
    return generateContent(contact);
}

// Function to generate HTML content from a structured object
function generateContent(data) {
    return `
        <ul>
            ${Object.entries(data).map(([key, value]) => generateListItem(key, value)).join('')}
        </ul>
    `;
}

// Function to generate a list item with toggle functionality
function generateListItem(key, value) {
    const id = key.replace(/\s+/g, '');
    return `
        <li>
            <span class="toggle" onclick="toggleDetails('${id}')">[+] </span>${key}
            <div id="${id}" class="details" style="display: none;">
                <ul>
                    ${value.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </li>
    `;
}