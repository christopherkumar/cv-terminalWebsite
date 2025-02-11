const commands = {
    "skills": `
    <ul>
        <li>
            <span class="toggle" onclick="toggleDetails('skill1')">[+] </span>Programming Languages
            <div id="skill1" class="details" style="display: none;">
                <ul>
                    <li>Python, MATLAB, Simulink</li>
                    <li>C++/C, Arduino, Visual Basic</li>
                </ul>
            </div>
        </li>
        <li>
            <span class="toggle" onclick="toggleDetails('skill2')">[+] </span>Software & Tools
            <div id="skill2" class="details" style="display: none;">
                <ul>
                    <li>AutoCAD, MS Office Suite, SQLite</li>
                    <li>TensorFlow, PyTorch</li>
                </ul>
            </div>
        </li>
        <li>
            <span class="toggle" onclick="toggleDetails('skill3')">[+] </span>AI Technologies
            <div id="skill3" class="details" style="display: none;">
                <ul>
                    <li>Large Language Models</li>
                    <li>Retrieval-Augmented Generation</li>
                    <li>Embedding Models</li>
                </ul>
            </div>
        </li>
        <li>
            <span class="toggle" onclick="toggleDetails('skill4')">[+] </span>Networking & Electronics
            <div id="skill4" class="details" style="display: none;">
                <ul>
                    <li>Cisco device configuration and troubleshooting</li>
                    <li>Circuit design, PCB layout, and production</li>
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
                    <li>Investigated LLMs for grading Python scripts.</li>
                    <li>Optimized Retrieval-Augmented Generation workflows.</li>
                </ul>
            </div>
        </li>
        <li>
            <span class="toggle" onclick="toggleDetails('exp2')">[+] </span>Data Annotator (2021-2022)
            <div id="exp2" class="details" style="display: none;">
                <ul>
                    <li>Labeled field images for machine vision models.</li>
                    <li>Improved GUI functionality for annotation tools.</li>
                </ul>
            </div>
        </li>
        <li>
            <span class="toggle" onclick="toggleDetails('exp3')">[+] </span>Barista / Cafe Worker (2018-2022)
            <div id="exp3" class="details" style="display: none;">
                <ul>
                    <li>Managed customer service and food preparation.</li>
                    <li>Handled POS transactions and stock management.</li>
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
                    <li>Evaluated OpenAI and Ollama models for assessment grading.</li>
                    <li>Compared different LLM frameworks for performance.</li>
                </ul>
            </div>
        </li>
        <li>
            <span class="toggle" onclick="toggleDetails('proj2')">[+] </span>Retrieval-Augmented Generation
            <div id="proj2" class="details" style="display: none;">
                <ul>
                    <li>Implemented and optimized multiple RAG workflows.</li>
                    <li>Developed custom embedding techniques for document retrieval.</li>
                </ul>
            </div>
        </li>
        <li>
            <span class="toggle" onclick="toggleDetails('proj3')">[+] </span>Contextual AI Chatbot
            <div id="proj3" class="details" style="display: none;">
                <ul>
                    <li>Developed a chatbot using vector embeddings.</li>
                    <li>Implemented retrieval-augmented memory for contextual understanding.</li>
                </ul>
            </div>
        </li>
        <li>
            <span class="toggle" onclick="toggleDetails('proj4')">[+] </span>AUSLAN Letter Recognition
            <div id="proj4" class="details" style="display: none;">
                <ul>
                    <li>Built an image recognition model for sign language letters.</li>
                    <li>Used OpenCV and TensorFlow for real-time classification.</li>
                </ul>
            </div>
        </li>
    </ul>
    `,
    "contact": "Email: <a href='mailto:christopherkumar812@gmail.com'>christopherkumar812@gmail.com</a><br>LinkedIn: <a href='https://www.linkedin.com/in/christopher-kumar/'>linkedin.com/in/christopher-kumar</a><br>GitHub: <a href='https://github.com/christopherkumar'>github.com/christopherkumar</a>"
};