var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var quizBody = document.getElementById("quiz");
var questionsEl = document.getElementById("questions");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var quizTimer = document.getElementById("timer");
var endGameBtns = document.getElementById("endGameBtns");
var timeLeft = 76;
var currentQuestionIndex = 0;
var score = 0;
var correct;
var timerInterval;
var quizQuestions = [
  {
    question: "What can store multiple values in a single variable?",
    choiceA: "Loop",
    choiceB: "Array",
    choiceC: "String",
    choiceD: "All the above",
    correctAnswer: "b",
  },
  {
    question: "What section in an html can javascript not be placed?",
    choiceA: "Body",
    choiceB: "Html",
    choiceC: "Var",
    choiceD: "None of the above",
    correctAnswer: "c",
  },
  {
    question: "How many scripts can you place in an html",
    choiceA: "Infinite",
    choiceB: "1",
    choiceC: "2",
    choiceD: "5",
    correctAnswer: "a",
  },
  {
    question: "Which statement is false when writing javascript?",
    choiceA: "You can only use double quotes",
    choiceB: "Double slashes are treated as a comment",
    choiceC: "Equal signs assign values to variables",
    choiceD: "All of the above",
    correctAnswer: "a",
  },
  {
    question: "A block of code designed to perform a particular task is called",
    choiceA: "Console",
    choiceB: "Array",
    choiceC: "Function",
    choiceD: "Variable",
    correctAnswer: "c",
  },
  {
    question: "What can execute a block of code multiple times?",
    choiceA: "Function",
    choiceB: "Array",
    choiceC: "String",
    choiceD: "Loop",
    correctAnswer: "d",
  },
  {
    question: "What is the proper html tag for javascript?",
    choiceA: "Script",
    choiceB: "Java",
    choiceC: "Js",
    choiceD: "None of the above",
    correctAnswer: "a",
  },
];
var finalQuestionIndex = quizQuestions.length;
function generateQuizQuestion() {
  gameoverDiv.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
}
function startQuiz() {
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "none";
  generateQuizQuestion();
  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time: " + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}
function showScore() {
  quizBody.style.display = "none";
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML =
    "You got " + score + " out of " + quizQuestions.length + " right!";
}
submitScoreBtn.addEventListener("click", function highscore() {
  if (highscoreInputName.value === "") {
    alert("Your initials are needed!");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score,
    };
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
});
function generateHighscores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}
function showHighscore() {
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";
  generateHighscores();
}
function clearScore() {
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
}
function replayQuiz() {
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 76;
  score = 0;
  currentQuestionIndex = 0;
}
function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;
  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    alert("+ 0 seconds");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    alert("- 3 seconds");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else {
    showScore();
  }
}
startQuizButton.addEventListener("click", startQuiz);
