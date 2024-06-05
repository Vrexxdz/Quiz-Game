document.addEventListener('DOMContentLoaded', function() {
    var myDiv = document.getElementById('myDiv');
    myDiv.classList.remove('hidden');
    myDiv.classList.add('visible');
});

const questions = [
    {
        question: "Who is the richest Man?",
        answers: [
            { text: "Elon Musk", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Bernard Arnault", correct: false },
            { text: "Larry Ellison", correct: false },
        ]
    },
    {
        question: "What's the 3 Body problem?",
        answers: [
            { text: "A weight loss plan with 3 structures", correct: false },
            { text: "when 3 celestial bodies influence each other through their gravity", correct: true },
            { text: "A problem meeting 3 people", correct: false },
            { text: "When 2 planets attract each other", correct: false },
        ]
    },
    {
        question: "What is a Syntax?",
        answers: [
            { text: "Rules, structure, words and symbols in a programming language", correct: true },
            { text: "A hashcode in Python", correct: false },
            { text: "A list of Booleans in Swift", correct: false },
            { text: "An error in line 20, the code has 10 lines :(", correct: false },
        ]
    },
    {
        question: "How many continents do we have?",
        answers: [
            { text: "2", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "1", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();