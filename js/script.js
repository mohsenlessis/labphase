const questions = [
  {
    question: "what's the capital of tunisia?",
    answers: [
      {
        text: "Tunis",
        correct: true,
      },
      {
        text: "Kairouan",
        correct: false,
      },
      {
        text: "Gabes",
        correct: false,
      },
      {
        text: "Sousse",
        correct: false,
      },
    ],
  },
  {
    question: "which is the smallest continent in the world?",
    answers: [
      {
        text: "Australia",
        correct: true,
      },
      {
        text: "Europe",
        correct: false,
      },
      {
        text: "Asia",
        correct: false,
      },
      {
        text: "Africa",
        correct: false,
      },
    ],
  },
  {
    question: "who won the last euro?",
    answers: [
      {
        text: "Italy",
        correct: true,
      },
      {
        text: "Spain",
        correct: false,
      },
      {
        text: "Germany",
        correct: false,
      },
      {
        text: "England",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
var currentQuestionIndex = 0;
var score = 0;
function startQuizz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  var currentQuestion = questions[currentQuestionIndex];
  var questioNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questioNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    console.log(score);
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML =
    "you scoored " + score + " out of " + questions.length;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", function () {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuizz();
  }
});
startQuizz();
