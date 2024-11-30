// DOM Elements
const patternGrid = document.getElementById("pattern-grid");
const inputGrid = document.getElementById("input-grid");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const feedback = document.getElementById("feedback");

// Variables
let pattern = [];
let userPattern = [];

// Generate Random Pattern
function generatePattern(size) {
  const newPattern = [];
  const positions = Array.from({ length: size * size }, (_, i) => i); // Create an array with positions from 0 to size*size - 1
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * positions.length);
    const position = positions.splice(randomIndex, 1)[0];
    const color = getRandomColor();
    newPattern.push({ position, color });
  }
  return newPattern;
}

// Random Color Generator
function getRandomColor() {
  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Display Pattern on Grid
function displayPattern(grid, pattern, interactive = false) {
  grid.innerHTML = "";
  const size = 3; // 3x3 grid, 9 positions
  for (let i = 0; i < size * size; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    const matched = pattern.find((p) => p.position === i);
    if (matched) {
      circle.style.backgroundColor = matched.color;
    }
    if (interactive) {
      circle.addEventListener("click", () => toggleUserPattern(i, circle));
    }
    grid.appendChild(circle);
  }
}

// Handle User Clicks
function toggleUserPattern(position, circle) {
  const existing = userPattern.find((p) => p.position === position);

  if (existing) {
    // If the position is already selected, cycle to next color immediately
    const color = getRandomColor(); // Get the next color
    userPattern = userPattern.filter((p) => p.position !== position); // Remove previous color
    userPattern.push({ position, color }); // Add the new color
    circle.style.backgroundColor = color; // Apply the new color directly
  } else {
    const color = getRandomColor(); // Get the next color
    userPattern.push({ position, color }); // Add new color to the user pattern
    circle.style.backgroundColor = color; // Apply the new color
  }
}

// Validate User Pattern
function validatePattern(userPattern, originalPattern) {
  if (userPattern.length !== originalPattern.length) return false;
  return userPattern.every((up) =>
    originalPattern.some(
      (op) => op.position === up.position && op.color === up.color
    )
  );
}

// Game Initialization
function startGame() {
  pattern = generatePattern(3); // Now using 3 for the 3x3 grid
  userPattern = [];
  displayPattern(patternGrid, pattern);
  setTimeout(() => {
    displayPattern(patternGrid, [], false); // Hide the pattern
    displayPattern(inputGrid, [], true); // Enable user interaction
  }, 3000); // Show pattern for 3 seconds
}

// Event Listeners
submitBtn.addEventListener("click", () => {
  if (validatePattern(userPattern, pattern)) {
    feedback.textContent = "Correct! Well done!👏";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Incorrect! Try again.";
    feedback.style.color = "red";
  }
});

resetBtn.addEventListener("click", () => {
  startGame();
  feedback.textContent = "";
});

// Start the Game
startGame();
