
let exams = [];
let studentPerformance = [];

// Function to display the appropriate section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Function to add another question to the create exam form
function addQuestion() {
    const questionCount = document.querySelectorAll('#questions-container .question').length + 1;
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question');
    questionContainer.innerHTML = `
        <div class="input-box">
            <label>Question ${questionCount}:</label>
            <input type="text" class="question-text" required>
        </div>
        <div class="input-box">
            <label>Options (separated by commas):</label>
            <input type="text" class="question-options" required>
        </div>
        <div class="input-box">
            <label>Correct Option:</label>
            <input type="text" class="correct-option" required>
        </div>
    `;
    document.getElementById('questions-container').appendChild(questionContainer);
}

// Function to create an exam and show acknowledgment popup
function createExam() {
    const examTitle = document.getElementById('exam-title').value;
    const questions = document.querySelectorAll('#questions-container .question');

    if (examTitle.trim() === '') {
        alert('Please enter an exam title.');
        return;
    }

    if (questions.length === 0) {
        alert('Please add at least one question.');
        return;
    }

    const exam = {
        title: examTitle,
        questions: []
    };

    questions.forEach((questionElem, index) => {
        const questionText = questionElem.querySelector('.question-text').value;
        const questionOptions = questionElem.querySelector('.question-options').value.split(',');
        const correctOption = questionElem.querySelector('.correct-option').value;

        if (questionText.trim() === '' || questionOptions.length === 0 || correctOption.trim() === '') {
            alert(`Please fill out all fields for question ${index + 1}.`);
            return;
        }

        exam.questions.push({
            text: questionText,
            options: questionOptions,
            correctOption: correctOption
        });
    });

    exams.push(exam);
    updateExamSelectOptions();
    alert('Exam created successfully!');
    document.getElementById('exam-form').reset();
    document.getElementById('questions-container').innerHTML = `
        <div class="question">
            <div class="input-box">
                <label>Question 1:</label>
                <input type="text" class="question-text" required>
            </div>
            <div class="input-box">
                <label>Options (separated by commas):</label>
                <input type="text" class="question-options" required>
            </div>
            <div class="input-box">
                <label>Correct Option:</label>
                <input type="text" class="correct-option" required>
            </div>
        </div>
    `;
}

// Function to update exam select options in the analysis and give exam sections
function updateExamSelectOptions() {
    const examSelect = document.getElementById('exam-select');
    const examSelectGive = document.getElementById('exam-select-give');

    // Clear existing options
    examSelect.innerHTML = '';
    examSelectGive.innerHTML = '';

    exams.forEach((exam, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = exam.title;

        const optionGive = document.createElement('option');
        optionGive.value = index;
        optionGive.textContent = exam.title;

        examSelect.appendChild(option);
        examSelectGive.appendChild(optionGive);
    });
}

// Function to analyze paper and display questions with correct options
function analyzePaper() {
    const examIndex = document.getElementById('exam-select').value;
    const exam = exams[examIndex];

    if (!exam) {
        alert('Please select an exam.');
        return;
    }

    const analysisResults = document.getElementById('analysis-results');
    analysisResults.innerHTML = `
        <h3>Exam: ${exam.title}</h3>
        ${exam.questions.map((question, index) => `
            <div class="analysis-question">
                <p><strong>Question ${index + 1}:</strong> ${question.text}</p>
                <p><strong>Options:</strong> ${question.options.join(', ')}</p>
                <p><strong>Correct Option:</strong> ${question.correctOption}</p>
            </div>
        `).join('')}
    `;
}

// Function to load exam questions for giving exam
function loadExam() {
    const studentName = document.getElementById('student-name').value;
    const examIndex = document.getElementById('exam-select-give').value;
    const exam = exams[examIndex];

    if (!exam) {
        alert('Please select an exam.');
        return;
    }

    if (studentName.trim() === '') {
        alert('Please enter the student name.');
        return;
    }

    const examContainer = document.getElementById('exam-container');
    const examQuestions = document.getElementById('exam-questions');
    examQuestions.innerHTML = '';

    exam.questions.forEach((question, index) => {
        const questionElem = document.createElement('div');
        questionElem.classList.add('exam-question');
        questionElem.innerHTML = `
            <h3>Question ${index + 1}: ${question.text}</h3>
            ${question.options.map((option, i) => `
                <div>
                    <input type="radio" name="question-${index}" value="${option}" id="option-${index}-${i}" required>
                    <label for="option-${index}-${i}">${option}</label>
                </div>
            `).join('')}
        `;
        examQuestions.appendChild(questionElem);
    });

    examContainer.classList.remove('hidden');
}

// Function to submit exam (placeholder implementation)
function submitExam() {
    alert('Exam submitted successfully!');
    document.getElementById('give-exam-form').reset();
    document.getElementById('exam-container').classList.add('hidden');
    document.getElementById('exam-questions').innerHTML = '';
}

// Initialize the page with sample data (optional)
function init() {
    // Add any initialization code here
    // For example, populate exam select options with existing exams
    updateExamSelectOptions();
}

// Call init function on page load
window.onload = init;
