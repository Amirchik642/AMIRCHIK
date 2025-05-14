// Game states
let gameState = {
    skillChallenge: {
        currentLevel: 1,
        score: 0,
        challenges: [
            {
                question: "How would you handle a team member who's not contributing?",
                options: [
                    "Confront them publicly",
                    "Have a private discussion",
                    "Ignore the issue"
                ],
                correct: 1,
                explanation: "Private discussions help maintain team harmony while addressing issues."
            },
            {
                question: "What's the best way to start a new project?",
                options: [
                    "Jump straight into coding",
                    "Plan and discuss requirements first",
                    "Wait for others to start"
                ],
                correct: 1,
                explanation: "Proper planning ensures everyone understands the goals and requirements."
            },
            {
                question: "How do you handle tight deadlines?",
                options: [
                    "Work overtime alone",
                    "Communicate with the team and prioritize",
                    "Panic and rush through tasks"
                ],
                correct: 1,
                explanation: "Team communication and prioritization are key to meeting deadlines effectively."
            }
        ]
    },
    beatDeadline: {
        score: 0,
        timeLeft: 30,
        tasks: ['Design Review', 'Code Review', 'Testing', 'Documentation', 'Deployment'],
        isPlaying: false,
        level: 1,
        taskInterval: 2000
    },
    conflictManager: {
        currentScenario: 0,
        score: 0,
        scenarios: [
            {
                situation: "Team member is consistently missing deadlines",
                options: [
                    "Publicly criticize them in the next meeting",
                    "Have a private conversation to understand the issue",
                    "Report them to management immediately"
                ],
                correct: 1
            },
            {
                situation: "Two team members disagree on the project approach",
                options: [
                    "Let them figure it out themselves",
                    "Facilitate a discussion to find common ground",
                    "Choose the approach you prefer"
                ],
                correct: 1
            },
            {
                situation: "Team is behind schedule on a critical project",
                options: [
                    "Work overtime without discussing with the team",
                    "Have an emergency meeting to reassess priorities",
                    "Blame the team for poor performance"
                ],
                correct: 1
            }
        ]
    }
};

// Skill Challenge Game
function initSkillChallenge() {
    const gameContainer = document.getElementById('skill-challenge');
    gameContainer.innerHTML = `
        <h3>Skill Challenge</h3>
        <div class="game-area">
            <div class="challenge-container">
                <div class="challenge-header">
                    <div>Level: <span id="skill-level">1</span></div>
                    <div>Score: <span id="skill-score">0</span></div>
                </div>
                <div id="challenge-question"></div>
                <div id="challenge-options"></div>
                <div id="challenge-feedback" class="challenge-feedback"></div>
            </div>
        </div>
        <div class="game-controls">
            <button onclick="startSkillChallenge()" class="game-button">Start Challenge</button>
            <button onclick="showSkillInstructions()" class="game-button">How to Play</button>
        </div>
    `;
}

function showSkillInstructions() {
    alert(`How to Play Skill Challenge:
1. Click Start Challenge to begin
2. Read each scenario carefully
3. Choose the best response
4. Get points for correct answers
5. Learn from feedback
6. Complete all challenges to win!`);
}

function startSkillChallenge() {
    gameState.skillChallenge.currentLevel = 1;
    gameState.skillChallenge.score = 0;
    showNextChallenge();
    updateSkillDisplay();
}

function showNextChallenge() {
    const challenge = gameState.skillChallenge.challenges[gameState.skillChallenge.currentLevel - 1];
    document.getElementById('challenge-question').textContent = challenge.question;
    
    const optionsContainer = document.getElementById('challenge-options');
    optionsContainer.innerHTML = challenge.options.map((option, index) => `
        <button onclick="selectSkillOption(${index})" class="option-button">${option}</button>
    `).join('');
    
    document.getElementById('challenge-feedback').textContent = '';
}

function selectSkillOption(optionIndex) {
    const challenge = gameState.skillChallenge.challenges[gameState.skillChallenge.currentLevel - 1];
    const feedbackElement = document.getElementById('challenge-feedback');
    
    if (optionIndex === challenge.correct) {
        gameState.skillChallenge.score += 10;
        feedbackElement.textContent = `Correct! ${challenge.explanation}`;
        feedbackElement.style.color = '#33ff99';
    } else {
        feedbackElement.textContent = `Not quite right. ${challenge.explanation}`;
        feedbackElement.style.color = '#ff3366';
    }
    
    updateSkillDisplay();
    
    setTimeout(() => {
        gameState.skillChallenge.currentLevel++;
        if (gameState.skillChallenge.currentLevel <= gameState.skillChallenge.challenges.length) {
            showNextChallenge();
        } else {
            endSkillChallenge();
        }
    }, 2000);
}

function updateSkillDisplay() {
    document.getElementById('skill-level').textContent = gameState.skillChallenge.currentLevel;
    document.getElementById('skill-score').textContent = gameState.skillChallenge.score;
}

function endSkillChallenge() {
    const finalScore = gameState.skillChallenge.score;
    let message = `Challenge Complete!\n\nFinal Score: ${finalScore}\n\n`;
    
    if (finalScore >= 30) {
        message += "Excellent! You're a master of soft skills! 🌟";
    } else if (finalScore >= 20) {
        message += "Great job! You have strong interpersonal skills! 💪";
    } else if (finalScore >= 10) {
        message += "Good effort! Keep practicing! 👍";
    } else {
        message += "Keep learning! You'll improve! 💪";
    }
    
    alert(message);
}

// Beat the Deadline Game
function initBeatDeadline() {
    const gameContainer = document.getElementById('beat-deadline');
    gameContainer.innerHTML = `
        <h3>Beat the Deadline</h3>
        <div class="game-area">
            <div class="game-stats">
                <div>Score: <span id="deadline-score">0</span></div>
                <div>Time: <span id="deadline-time">30</span>s</div>
                <div>Level: <span id="deadline-level">1</span></div>
            </div>
            <div class="tasks-container"></div>
            <div class="game-message"></div>
        </div>
        <div class="game-controls">
            <button onclick="startBeatDeadline()" class="game-button">Start Game</button>
            <button onclick="showInstructions()" class="game-button">How to Play</button>
        </div>
    `;
}

function showInstructions() {
    alert(`How to Play Beat the Deadline:
1. Click the Start Game button
2. Click on tasks as they appear
3. Each task gives you points
4. Tasks disappear after 2 seconds
5. Complete as many tasks as possible in 30 seconds
6. Higher levels = faster tasks and more points!`);
}

function startBeatDeadline() {
    if (gameState.beatDeadline.isPlaying) return;
    
    gameState.beatDeadline.isPlaying = true;
    gameState.beatDeadline.score = 0;
    gameState.beatDeadline.timeLeft = 30;
    gameState.beatDeadline.level = 1;
    gameState.beatDeadline.taskInterval = 2000; // Start with 2 seconds
    
    updateBeatDeadlineDisplay();
    createTask();
    
    const timer = setInterval(() => {
        gameState.beatDeadline.timeLeft--;
        updateBeatDeadlineDisplay();
        
        // Level up every 10 seconds
        if (gameState.beatDeadline.timeLeft % 10 === 0) {
            gameState.beatDeadline.level++;
            gameState.beatDeadline.taskInterval = Math.max(500, 2000 - (gameState.beatDeadline.level - 1) * 200);
            showMessage(`Level ${gameState.beatDeadline.level}! Tasks are getting faster!`);
        }
        
        if (gameState.beatDeadline.timeLeft <= 0) {
            clearInterval(timer);
            endBeatDeadline();
        }
    }, 1000);
}

function createTask() {
    if (!gameState.beatDeadline.isPlaying) return;
    
    const tasksContainer = document.querySelector('.tasks-container');
    const randomTask = gameState.beatDeadline.tasks[
        Math.floor(Math.random() * gameState.beatDeadline.tasks.length)
    ];
    
    const taskElement = document.createElement('div');
    taskElement.className = 'task-item';
    taskElement.textContent = randomTask;
    
    // Random position with padding from edges
    const padding = 20;
    taskElement.style.left = `${padding + Math.random() * (70 - padding)}%`;
    taskElement.style.top = `${padding + Math.random() * (70 - padding)}%`;
    
    // Random size for variety
    const size = 0.8 + Math.random() * 0.4;
    taskElement.style.transform = `scale(${size})`;
    
    taskElement.addEventListener('click', () => {
        const points = Math.floor(10 * (1 + (gameState.beatDeadline.level - 1) * 0.2));
        gameState.beatDeadline.score += points;
        updateBeatDeadlineDisplay();
        
        // Show points gained
        const pointsElement = document.createElement('div');
        pointsElement.className = 'points-gained';
        pointsElement.textContent = `+${points}`;
        pointsElement.style.left = taskElement.style.left;
        pointsElement.style.top = taskElement.style.top;
        tasksContainer.appendChild(pointsElement);
        
        // Remove points element after animation
        setTimeout(() => pointsElement.remove(), 1000);
        
        taskElement.remove();
        if (gameState.beatDeadline.isPlaying) {
            createTask();
        }
    });
    
    tasksContainer.appendChild(taskElement);
    
    // Remove task after interval if not clicked
    setTimeout(() => {
        if (taskElement.parentNode) {
            taskElement.classList.add('fade-out');
            setTimeout(() => {
                if (taskElement.parentNode) {
                    taskElement.remove();
                    if (gameState.beatDeadline.isPlaying) {
                        createTask();
                    }
                }
            }, 300);
        }
    }, gameState.beatDeadline.taskInterval);
}

function showMessage(message) {
    const messageElement = document.querySelector('.game-message');
    messageElement.textContent = message;
    messageElement.classList.add('show');
    setTimeout(() => messageElement.classList.remove('show'), 2000);
}

function updateBeatDeadlineDisplay() {
    document.getElementById('deadline-score').textContent = gameState.beatDeadline.score;
    document.getElementById('deadline-time').textContent = gameState.beatDeadline.timeLeft;
    document.getElementById('deadline-level').textContent = gameState.beatDeadline.level;
}

function endBeatDeadline() {
    gameState.beatDeadline.isPlaying = false;
    document.querySelector('.tasks-container').innerHTML = '';
    
    const finalScore = gameState.beatDeadline.score;
    const level = gameState.beatDeadline.level;
    let message = `Game Over!\n\nFinal Score: ${finalScore}\nLevel Reached: ${level}\n\n`;
    
    if (finalScore >= 200) {
        message += "Outstanding! You're a deadline-crushing machine! 🚀";
    } else if (finalScore >= 100) {
        message += "Great job! You handle pressure well! 💪";
    } else if (finalScore >= 50) {
        message += "Not bad! Keep practicing! 👍";
    } else {
        message += "Keep trying! You'll get better! 💪";
    }
    
    alert(message);
}

// Conflict Manager Game
function initConflictManager() {
    const gameContainer = document.getElementById('conflict-manager');
    gameContainer.innerHTML = `
        <h3>Conflict Manager</h3>
        <div class="game-area">
            <div class="scenario-container">
                <p id="scenario-text"></p>
                <div id="options-container"></div>
            </div>
            <div class="score">Score: <span id="conflict-score">0</span></div>
        </div>
        <button onclick="startConflictManager()" class="game-button">Start New Game</button>
    `;
}

function startConflictManager() {
    gameState.conflictManager.currentScenario = 0;
    gameState.conflictManager.score = 0;
    updateConflictManagerDisplay();
    showNextScenario();
}

function showNextScenario() {
    const scenario = gameState.conflictManager.scenarios[gameState.conflictManager.currentScenario];
    document.getElementById('scenario-text').textContent = scenario.situation;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = scenario.options.map((option, index) => `
        <button onclick="selectOption(${index})" class="option-button">${option}</button>
    `).join('');
}

function selectOption(optionIndex) {
    const scenario = gameState.conflictManager.scenarios[gameState.conflictManager.currentScenario];
    
    if (optionIndex === scenario.correct) {
        gameState.conflictManager.score += 10;
        alert('Correct! Good conflict resolution!');
    } else {
        alert('Not the best approach. Try to think about team dynamics and communication.');
    }
    
    updateConflictManagerDisplay();
    gameState.conflictManager.currentScenario++;
    
    if (gameState.conflictManager.currentScenario < gameState.conflictManager.scenarios.length) {
        showNextScenario();
    } else {
        alert(`Game Over! Your score: ${gameState.conflictManager.score}`);
    }
}

function updateConflictManagerDisplay() {
    document.getElementById('conflict-score').textContent = gameState.conflictManager.score;
}

// Initialize all games when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initSkillChallenge();
    initBeatDeadline();
    initConflictManager();
}); 