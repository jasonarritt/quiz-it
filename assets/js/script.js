var beginButtonEl = document.getElementById('begin-button');
var nextButtonEl = document.getElementById('next-button');
var quizContainerEl = document.getElementById('quiz-container');
var questionEl = document.getElementById('question');
var optionButtonsEl = document.getElementById('option-buttons');
var timerSpanEl = document.getElementById('timer');
var timerPromptSpanEl = document.getElementById('timer-prompt');
var remainingTime = 10;
timerSpanEl.innerText = remainingTime;
var mixedQuestions;
var currentQuestionIndex;
var finalTime = 0;

var questionList = [
    {
        question: 'In Javascript, what is the character used to terminate a line of code?',
        answers: [
            {text: ';', correct: true},
            {text: ',', correct: false},
            {text: '/', correct: false},
            {text: '.', correct: false}
        ]
    },

    {
        question: 'Which of these HTML elements is self-closing?',
        answers: [
            {text: '<a>', correct: false},
            {text: '#href=', correct: false},
            {text: '<img>', correct: true},
            {text: '<title>', correct: false}
        ]
    },

    {
        question: 'What is the prefix used for the ID of an element in CSS and JavaScript?',
        answers: [
            {text: '.', correct: false},
            {text: '#', correct: true},
            {text: '/', correct: false},
            {text: '?', correct: false}
        ]
    },

    {
        question: 'In CSS, what is the selector used to manipulate the color of text elements?',
        answers: [
            {text: 'text-color', correct: false},
            {text: 'font-color', correct: false},
            {text: 'color-text', correct: false},
            {text: 'color', correct: true}
        ]
    },

    {
        question: 'Which HTML element is used to generate text in the browser tab of a web page?',
        answers: [
            {text: '<tab>', correct: false},
            {text: '<title>', correct: true},
            {text: '<browser>', correct: false},
            {text: '<header>', correct: false}
        ]
    }
];

beginButtonEl.addEventListener('click', startQuiz);


function updateTimer() {
    timerSpanEl.innerText = remainingTime;
}

function startTimer() {
    setInterval(function () {
        remainingTime --;
        updateTimer();
        if (remainingTime <= 0) {
            remainingTime = 0,
            endQuiz();
        }
    }, 1000)
}

function startQuiz() {
    remainingTime = 10;
    console.log('Started');
    beginButtonEl.classList.add('hidden');
    mixedQuestions = questionList.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    quizContainerEl.classList.remove('hidden');
    startTimer(remainingTime);
    setNextQuestion();
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', optionSelect);
        optionButtonsEl.appendChild(button);
    });
}

function questionReset() {
    clearStatusClass(document.body);
    nextButtonEl.classList.add('hidden');
    while (optionButtonsEl.firstChild) {
        optionButtonsEl.removeChild(optionButtonsEl.firstChild);
    };
}

function setNextQuestion() {
    questionReset();
    showQuestion(mixedQuestions[currentQuestionIndex]);

}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add('correct');
        remainingTime += 5;
        updateTimer();
    } else {
        element.classList.add('wrong');
        remainingTime -= 2;
        updateTimer();
    };
}

function optionSelect(event) {
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(optionButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (mixedQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endQuiz();
    }

}

function endQuiz() {
    if (remainingTime) {
        finalTime = remainingTime;    
    } else {
        finalTime = 0;
    }
    console.log(finalTime);
    timerPromptSpanEl.innerText = 'Final Time: ';
    timerSpanEl.innerText = finalTime;
    questionEl.classList.add('hidden');
    optionButtonsEl.classList.add('hidden');
    beginButtonEl.innerText = 'Go Again';
    beginButtonEl.classList.remove('hidden');

}