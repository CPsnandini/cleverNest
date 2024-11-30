const shapes = ["triangle", "square", "circle"];
let level = 1;
let score = 0;
let time = 30;
let questionsAnswered = 0;

const patternCard = document.getElementById("pattern-card");
const optionCards = document.getElementById("option-cards");
const levelDisplay = document.getElementById("level");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const resetButton = document.getElementById("reset-button");
const resultMessage = document.getElementById("result-message");

let correctIndex;

function generatePattern() {
  const pattern = [];
  for (let i = 0; i < 6; i++) {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    pattern.push(randomShape);
  }
  return pattern;
}

function renderCard(cardElement, pattern) {
  cardElement.innerHTML = "";
  pattern.forEach((shape) => {
    const shapeDiv = document.createElement("div");
    shapeDiv.classList.add("shape", shape);
    cardElement.appendChild(shapeDiv);
  });
}

function startRound() {
  if (questionsAnswered === 5) {
    displayResultMessage();
    return;
  }

  const correctPattern = generatePattern();
  correctIndex = Math.floor(Math.random() * 8);

  renderCard(patternCard, correctPattern);

  optionCards.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const optionPattern =
      i === correctIndex ? correctPattern : generatePattern();

    const card = document.createElement("div");
    card.classList.add("card");
    renderCard(card, optionPattern);

    card.onclick = () => {
      if (i === correctIndex) {
        score += 10;
        level++;
      } else {
        score -= 5;
      }
      questionsAnswered++;
      updateScoreAndLevel();
      startRound();
    };

    optionCards.appendChild(card);
  }
}

function displayResultMessage() {
  let message;
  if (score === 50) {
    message = "Congratulations! You scored 50!🎉🥳";
  } else {
    message = `You scored ${score}. Let's try again🌟✨`;
  }
  resultMessage.textContent = message;
}

function resetGame() {
  score = 0;
  level = 1;
  time = 30;
  questionsAnswered = 0;
  resultMessage.textContent = "";
  updateScoreAndLevel();
  startRound();
}

function updateScoreAndLevel() {
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
}

function startTimer() {
  const interval = setInterval(() => {
    time--;
    timeDisplay.textContent = time;

    if (time <= 0) {
      clearInterval(interval);
      displayResultMessage();
    }
  }, 1000);
}

resetButton.addEventListener("click", resetGame);

function initGame() {
  startRound();
  startTimer();
}

initGame();
