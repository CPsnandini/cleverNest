let timerInterval;
let remainingTime;

// Toggles the visibility of the chatbox
function toggleChatbox() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = chatbox.style.display === 'none' || !chatbox.style.display ? 'block' : 'none';
    if (chatbox.style.display === 'none') clearInterval(timerInterval); // Stop timer if closed
}

// Starts the Breathing Exercise
function startBreathing() {
    showActivity(`<div id="b">
        <p>Take your time, focus on your breathing.</p>
        <button onclick="closePopup()">Close</button></div>
    `, 'breathing-bg.jpg'); // Replace with your image
    startTimer(30, "Breathing exercise completed!");
}

// Starts the Focusing Exercise
function startFocus() {
    showActivity(`
        <img src="dot.jpg" alt="Focus Dot" style="width:80px; height:80px;">
        <p>Keep staring at the dot to increase your concentration.</p>
        <button onclick="closePopup()">Close</button>
    `, ''); // Replace with your dot image
    startTimer(30, "Focusing exercise completed!");
}

// Helper function to show an activity
function showActivity(content, backgroundImage) {
    const activity = document.getElementById('activity');
    const timer = document.getElementById('timer');
    activity.innerHTML = content;
    activity.style.backgroundImage = backgroundImage ? `url('${backgroundImage}')` : 'none';
    activity.classList.remove('hidden');
    timer.classList.remove('hidden');
}

// Starts a countdown timer
function startTimer(duration, completionMessage) {
    clearInterval(timerInterval);
    remainingTime = duration;

    const timer = document.getElementById('timer');
    timer.textContent = `Time left: ${remainingTime} seconds`;

    timerInterval = setInterval(() => {
        remainingTime--;
        timer.textContent = `Time left: ${remainingTime} seconds`;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timer.textContent = completionMessage;
        }
    }, 1000);
}

// Closes the popup and resets the activity
function closePopup() {
    const activity = document.getElementById('activity');
    const timer = document.getElementById('timer');
    activity.classList.add('hidden');
    timer.classList.add('hidden');
    clearInterval(timerInterval);
}
