window.commands = {
    "skills": `
        <ul>
            <li>
                <span class="toggle" onclick="toggleDetails('skill1')">[+] </span>Languages
                <div id="skill1" class="details" style="display: none;">
                    <ul>
                        <li>Python, C++/C, Arduino, Visual Basic</li>
                        <li>AutoCAD, MS Office Suite, SQLite</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('skill2')">[+] </span>Software & Tools
                <div id="skill2" class="details" style="display: none;">
                    <ul>
                        <li>TensorFlow, PyTorch</li>
                        <li>Microsoft Office Suite, AutoCAD</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('skill3')">[+] </span>AI & Networking
                <div id="skill3" class="details" style="display: none;">
                    <ul>
                        <li>Large Language Models, Retrieval-Augmented Generation</li>
                        <li>Cisco device configuration, Circuit design</li>
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
                        <li>Improved GUI functionality for annotation tools.</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('exp3')">[+] </span>Barista / Cafe Worker (2018-2022)
                <div id="exp3" class="details" style="display: none;">
                    <ul>
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
                        <li>Evaluating OpenAI and Ollama models for assessment grading.</li>
                        <li>Comparing different LLM frameworks for performance.</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('proj2')">[+] </span>Retrieval-Augmented Generation
                <div id="proj2" class="details" style="display: none;">
                    <ul>
                        <li>Developed custom embedding techniques for document retrieval.</li>
                    </ul>
                </div>
            </li>
            <li>
                <span class="toggle" onclick="toggleDetails('proj3')">[+] </span>AUSLAN Letter Recognition
                <div id="proj3" class="details" style="display: none;">
                    <ul>
                        <li>Using OpenCV and TensorFlow for real-time classification.</li>
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
