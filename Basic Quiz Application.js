// Quiz Questions Array
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink and Text Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which CSS property is used to change text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "font-style"
        ],
        correctAnswer: 2
    },
    {
        question: "What is the correct way to declare a JavaScript variable?",
        options: [
            "variable x = 5",
            "var x = 5",
            "x = 5",
            "let x = 5"
        ],
        correctAnswer: 1
    },
    {
        question: "Which of these is a JavaScript framework?",
        options: [
            "Photoshop",
            "WordPress",
            "React",
            "Apache"
        ],
        correctAnswer: 2
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: 2
    }
];

// DOM Element Selections
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const timerDisplay = document.getElementById('timer-display');
const currentScoreDisplay = document.getElementById('current-score');
const totalQuestionsDisplay = document.getElementById('total-questions');
const resultContainer = document.getElementById('result-container');
const finalScoreText = document.getElementById('final-score-text');
const feedbackText = document.getElementById('feedback-text');
const restartBtn = document.getElementById('restart-btn');

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

// Initialize Quiz
function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    totalQuestionsDisplay.textContent = quizQuestions.length;
    currentScoreDisplay.textContent = score;
    loadQuestion();
    resetTimer();
}

// Load Question
function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Create option buttons
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(optionElement, index));
        optionsContainer.appendChild(optionElement);
    });

    // Reset button states
    submitBtn.disabled = true;
    nextBtn.disabled = true;
    resetTimer();
}

// Option Selection
function selectOption(optionElement, index) {
    // Remove 'selected' class from all options
    document.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
    
    // Add 'selected' class to clicked option
    optionElement.classList.add('selected');
    submitBtn.disabled = false;
}

// Submit Answer
function submitAnswer() {
    const selectedOption = document.querySelector('.option.selected');
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Stop timer
    clearInterval(timerInterval);

    // Check answer
    if (selectedOption) {
        const selectedIndex = Array.from(optionsContainer.children).indexOf(selectedOption);
        
        if (selectedIndex === currentQuestion.correctAnswer) {
            selectedOption.classList.add('correct');
            score++;
            currentScoreDisplay.textContent = score;
        } else {
            selectedOption.classList.add('incorrect');
            const correctOption = optionsContainer.children[currentQuestion.correctAnswer];
            correctOption.classList.add('correct');
        }

        // Enable next button
        submitBtn.disabled = true;
        nextBtn.disabled = false;
    }
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// Timer
function startTimer() {
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitAnswer(); // Auto submit if time runs out
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
}

// End Quiz
function endQuiz() {
    // Hide quiz area
    document.getElementById('quiz-area').classList.add('hidden');
    
    // Show result container
    resultContainer.classList.remove('hidden');
    
    // Display final score and feedback
    const finalScore = document.getElementById('final-score');
    finalScore.textContent = `${score} / ${quizQuestions.length}`;

    // Provide feedback based on score
    if (score === quizQuestions.length) {
        feedbackText.textContent = "Perfect Score! 🏆 Excellent Job!";
    } else if (score >= quizQuestions.length * 0.7) {
        feedbackText.textContent = "Great Job! You're doing well. 👍";
    } else {
        feedbackText.textContent = "Keep practicing! You'll improve. 💪";
    }
}

// Restart Quiz
function restartQuiz() {
    // Hide result container
    resultContainer.classList.add('hidden');
    
    // Show quiz area
    document.getElementById('quiz-area').classList.remove('hidden');
    
    // Reset quiz
    initializeQuiz();
}

// Event Listeners
submitBtn.addEventListener('click', submitAnswer);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialize Quiz on Page Load
initializeQuiz();