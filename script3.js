// List of words with hints
const words = [
  { word: "apple", hint: "A fruit that's red or green" },
  { word: "grape", hint: "A small fruit used to make wine" },
  { word: "lemon", hint: "A yellow citrus fruit" },
  { word: "brick", hint: "Used to build houses" },
  { word: "chair", hint: "You sit on it" },
];

// Variables for game state
let currentWordIndex = 0; // Tracks which word in the queue is being guessed
let wordQueue = []; // Stores three random words for the session
let chosenWord = ""; // The current word being guessed
let displayWord = [];
let incorrectGuesses = [];
let attemptsLeft = 6;
let score = 0;
let timer; // To manage the timer interval
let timeLeft = 60; // Time in seconds for each word

// Select elements
const wordDisplay = document.getElementById("word-display");
const message = document.getElementById("message");
const letterInput = document.getElementById("letter-input");
const guessBtn = document.getElementById("guess-btn");
const incorrectGuessesDisplay = document.getElementById("incorrect-guesses");
const attemptsLeftDisplay = document.getElementById("attempts-left");
const hangmanDisplay = document.getElementById("hangman");
const restartBtn = document.getElementById("restart-btn");
const hintDisplay = document.getElementById("hint");
const timerDisplay = document.getElementById("timer");

// Initialize the game for a session with three words
function initializeGame() {
  // Select 3 random words for this session
  wordQueue = [];
  while (wordQueue.length < 3) {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    if (!wordQueue.includes(randomWord)) {
      wordQueue.push(randomWord);
    }
  }
  currentWordIndex = 0;
  score = 0;
  restartBtn.style.display = "none"; // Hide restart button initially
  initializeWord();
}

// Set up the current word
function initializeWord() {
  chosenWord = wordQueue[currentWordIndex].word;
  displayWord = "_".repeat(chosenWord.length).split("");
  incorrectGuesses = [];
  attemptsLeft = 6;
  timeLeft = 60; // Reset timer

  // Reset UI
  wordDisplay.textContent = displayWord.join(" ");
  incorrectGuessesDisplay.textContent = "";
  attemptsLeftDisplay.textContent = attemptsLeft;
  message.textContent = "";
  hangmanDisplay.textContent = "";
  letterInput.value = "";
  letterInput.disabled = false;
  guessBtn.disabled = false;

  // Display hint
  hintDisplay.textContent = wordQueue[currentWordIndex].hint;

  // Start the timer
  timerDisplay.textContent = timeLeft;
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      message.textContent = `Time's up! The word was "${chosenWord}".`;
      nextWord();
    }
  }, 1000);
}

// Check player's guess
function checkGuess() {
  const guessedLetter = letterInput.value.toLowerCase();
  letterInput.value = "";

  if (!guessedLetter.match(/[a-z]/i)) {
    message.textContent = "Please enter a valid letter!";
    return;
  }

  if (
    incorrectGuesses.includes(guessedLetter) ||
    displayWord.includes(guessedLetter)
  ) {
    message.textContent = "You already guessed that letter!";
    return;
  }

  if (chosenWord.includes(guessedLetter)) {
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === guessedLetter) {
        displayWord[i] = guessedLetter;
      }
    }
    wordDisplay.textContent = displayWord.join(" ");
    if (!displayWord.includes("_")) {
      message.textContent = "Well done! You guessed the word!";
      score++;
      nextWord();
    }
  } else {
    incorrectGuesses.push(guessedLetter);
    attemptsLeft--;
    hangmanDisplay.textContent += "X ";
    incorrectGuessesDisplay.textContent = incorrectGuesses.join(", ");
    attemptsLeftDisplay.textContent = attemptsLeft;
    if (attemptsLeft === 0) {
      message.textContent = `Out of attempts! The word was "${chosenWord}".`;
      nextWord();
    }
  }
}

// Move to the next word or end the session
function nextWord() {
  clearInterval(timer);
  letterInput.disabled = true;
  guessBtn.disabled = true;

  setTimeout(() => {
    currentWordIndex++;
    if (currentWordIndex < wordQueue.length) {
      initializeWord();
    } else {
      endSession();
    }
  }, 2000);
}

// Display results and end the session
function endSession() {
  message.textContent = `Session Over! You scored ${score} out of 3.`;
  restartBtn.style.display = "block"; // Show restart button
}

// Restart the game
function restartGame() {
  restartBtn.style.display = "none"; // Hide restart button
  initializeGame();
}

// Event listeners
guessBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", restartGame);

// Initialize the game on load
initializeGame();
