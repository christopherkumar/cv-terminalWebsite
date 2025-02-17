window.commands = {
    "skills": `
        <ul>
            <li>
                <span class="toggle" onclick="toggleDetails('skill1')">[+] </span>Programming Languages
                <div id="skill1" class="details" style="display: none;">
                    <ul>
                        <li>Python (Machine Learning, AI, Automation)</li>
                        <li>C++ / C & Arduino (Embedded Systems, High-Performance Computing)</li>
                        <li>MATLAB & Simulink (Engineering Applications)</li>
                        <li>HTML, JS & CSS(Web Development, App Development)</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('skill2')">[+] </span>Software & Tools
                <div id="skill2" class="details" style="display: none;">
                    <ul>
                        <li>AI & ML: TensorFlow, PyTorch, scikit-learn</li>
                        <li>Databases: SQLite, ChromaDB, FAISS, LanceDB</li>
                        <li>Engineering & Design: AutoCAD, MATLAB</li>
                        <li>General: Microsoft Office Suite, LibreOffice Suite ,Git</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('skill3')">[+] </span>AI, Networking & Systems
                <div id="skill3" class="details" style="display: none;">
                    <ul>
                        <li>LLMs: OpenAI, Anthropic, Ollama, HuggingFace</li>
                        <li>Networking: Cisco configuration</li>
                        <li>Systems: Linux, Windows, WSL, Docker</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('skill4')">[+] </span>Electronics & Hardware
                <div id="skill4" class="details" style="display: none;">
                    <ul>
                        <li>Electronics: Circuit design, PCB layout, soldering</li>
                        <li>Computer Hardware: Assembly, troubleshooting</li>
                    </ul>
                </div>
            </li>
        </ul>
    `,
    "experience": `
        <ul>
            <li>
                <span class="toggle" onclick="toggleDetails('exp1')">[+] </span>AI/LLM Engineering Intern (2024)
                <div id="exp1" class="details" style="display: none;">
                    <ul>
                        <li>Researched and optimized the use of LLMs for grading Python scripts.</li>
                        <li>Improved Retrieval-Augmented Generation workflows for better AI-assisted learning.</li>
                        <li>Developed and tested AI models to enhance automation in assessment evaluation.</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('exp2')">[+] </span>Data Annotator (2021-2022)
                <div id="exp2" class="details" style="display: none;">
                    <ul>
                        <li>Enhanced the GUI and functionality of machine vision annotation tools.</li>
                        <li>Collaborated in a research team to improve dataset quality for AI models.</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('exp3')">[+] </span>Barista / Cafe Worker (2018-2022)
                <div id="exp3" class="details" style="display: none;">
                    <ul>
                        <li>Managed daily operations including POS transactions and stock management.</li>
                        <li>Developed strong interpersonal skills and ability to perform under pressure.</li>
                    </ul>
                </div>
            </li>
        </ul>
    `,
    "projects": `
       <ul>
            <li>
                <span class="toggle" onclick="toggleDetails('proj1')">[+] </span>LLM Grading Study
                <div id="proj1" class="details" style="display: none;">
                    <ul>
                        <li>Evaluated OpenAI and Ollama models for grading assessments.</li>
                        <li>Developed an automated scoring pipeline for evaluating Python scripts.</li>
                        <li>Conducted performance benchmarking on different LLM frameworks.</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('proj2')">[+] </span>Retrieval-Augmented Generation (RAG)
                <div id="proj2" class="details" style="display: none;">
                    <ul>
                        <li>Implemented and tested RAG workflows to enhance AI-assisted retrieval.</li>
                        <li>Optimized document embedding techniques to improve response accuracy.</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('proj3')">[+] </span>AUSLAN Letter Recognition
                <div id="proj3" class="details" style="display: none;">
                    <ul>
                        <li>Built a real-time hand-sign recognition system using OpenCV and TensorFlow.</li>
                        <li>Integrated machine learning for improved accuracy in AUSLAN letter recognition.</li>
                    </ul>
                </div>
            </li>
        </ul>
    `,
    "research": `
        <ul>
            <li>
                <span class="toggle" onclick="toggleDetails('research1')">[+] </span>Effect of Camera Model and Camera Settings in Image Classification
                <div id="research1" class="details" style="display: none;">
                    <ul>
                        <li>Investigated how camera hardware and settings impact machine learning image classification accuracy.</li>
                        <li>Developed a standardized image-capturing process to ensure consistent data collection.</li>
                        <li>Analyzed the effects of noise, white balance, exposure, and lens selection on classification outcomes.</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('research2')">[+] </span>A Comparative Study of the Grading Capabilities of Large Language Models
                <div id="research2" class="details" style="display: none;">
                    <ul>
                        <li>Compared OpenAI (GPT-4, GPT-4 Turbo) with open-source models (Llama, Mistral) for automated grading.</li>
                        <li>Developed a framework using text-based and numeric rubrics to evaluate grading accuracy.</li>
                        <li>Identified GPT-4 Turbo as the most accurate for structured assessments, with potential improvements in hybrid rubrics.</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('research3')">[+] </span>Evaluation of Retrieval-Augmented Generation (RAG) Systems
                <div id="research3" class="details" style="display: none;">
                    <ul>
                        <li>Tested five different RAG implementations for retrieving and generating accurate responses.</li>
                        <li>Determined OpenAI's vector-based RAG as the most reliable, with 24/30 successful responses.</li>
                        <li>Assessed the limitations of open-source RAG models, identifying potential for future refinements.</li>
                    </ul>
                </div>
            </li>
        </ul>
    `,
    "contact": `
        <ul>
            <li>Email: <a href='mailto:christopherkumar812@gmail.com'>christopherkumar812@gmail.com</a></li>
            <li>LinkedIn: <a href='https://www.linkedin.com/in/christopher-kumar/'>linkedin.com/in/christopher-kumar</a></li>
            <li>GitHub: <a href='https://github.com/Christopher-Kumar'>github.com/Christopher-Kumar</a></li>
        </ul>
    `
};
