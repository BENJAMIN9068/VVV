/* ============================================
   Valentine's Day - Questions Page JavaScript
   Interactive Quiz with Manual Answer Options
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Check if name is entered
    const userName = localStorage.getItem('valentine_user_name');
    if (!userName) {
        window.location.href = 'index.html';
        return;
    }

    initQuestions();
    initFloatingHeartsQuestions();
});

/* ============================================
   Cat Sticker URLs from Giphy
   ============================================ */
const catStickers = {
    happy: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTd6Z3RhZjM0dHFxMzN6NXJhbnpvMDhxdnNlMjU1NHpkcnRhYjJvaiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/MDJ9IbxxvDUQM/giphy.gif',
    love: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGgxMjkyMWUyaGJ3d3ZtMHpwN2VlZ3R2OXFrdjJ1cW5jcDFwcWVtaSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/VIPdgcooFJHtC/giphy.gif',
    cute: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2M5Z3g3cGNhcDF5eGFoamd4bm5zbDF4c3MxZWNjc3JrdHJzbHJuMCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/CjmvTCZf2U3p09Cn0h/giphy.gif',
    funny: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnRlb2VtZWVqamI5bzJkNjFkNjd0c2xhZ3p2a3FhdnpvNWU0azVqcyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/mlvseq9yvZhba/giphy.gif',
    heart: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnlpZnVhM2h0NXhmazhjNWFiajc3Nnp2ZnZuamptZXJ6YjNlc3U1YyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/3o7TKoWXm3okO1kgHC/giphy.gif'
};

/* ============================================
   Questions Data - with Manual Answer Option
   ============================================ */
const questions = [
    {
        id: 1,
        type: 'multiple-with-text',
        question: 'What is my best quality?',
        options: [
            'How much I love you',
            'I always listen to you',
            'I would do anything for you',
            'Everything!'
        ],
        catSticker: catStickers.love
    },
    {
        id: 2,
        type: 'multiple-with-text',
        question: 'What is our best memory together?',
        options: [
            'When we first met',
            'Our first date',
            'When I proposed',
            'Every moment is special!'
        ],
        catSticker: catStickers.happy
    },
    {
        id: 3,
        type: 'text',
        question: 'Describe me in one word!',
        placeholder: 'Type your answer...',
        catSticker: catStickers.cute
    },
    {
        id: 4,
        type: 'slider',
        question: 'Rate our relationship from 1-10!',
        min: 1,
        max: 10,
        default: 8,
        catSticker: catStickers.heart
    },
    {
        id: 5,
        type: 'multiple-with-text',
        question: 'If I give you a gift, what would you want?',
        options: [
            'Your time and love',
            'Anything from you is precious',
            'Chocolate!',
            'Surprise me!'
        ],
        catSticker: catStickers.funny
    },
    {
        id: 6,
        type: 'text',
        question: 'What do you love most about us?',
        placeholder: 'Tell me in your own words...',
        catSticker: catStickers.love
    },
    {
        id: 7,
        type: 'text',
        question: 'Write a love message for me!',
        placeholder: 'Write from your heart...',
        catSticker: catStickers.heart
    },
    {
        id: 8,
        type: 'yesyes',
        question: 'Will you be mine forever?',
        options: [
            'Yes!',
            'Of course Yes!'
        ],
        catSticker: catStickers.heart
    }
];

let currentQuestion = 0;
let answers = [];

/* ============================================
   Initialize Questions
   ============================================ */
function initQuestions() {
    displayQuestion(currentQuestion);
    updateProgress();
}

/* ============================================
   Display Question
   ============================================ */
function displayQuestion(index) {
    const questionCard = document.getElementById('question-card');
    const question = questions[index];

    let html = `
        <div class="question-number">Question ${index + 1} of ${questions.length}</div>
        <img src="${question.catSticker}" alt="Cat" class="cat-reaction-img">
        <h2 class="question-text">${question.question}</h2>
    `;

    switch (question.type) {
        case 'multiple':
            html += createMultipleChoice(question);
            break;
        case 'multiple-with-text':
            html += createMultipleWithText(question);
            break;
        case 'text':
            html += createTextInput(question);
            break;
        case 'slider':
            html += createSlider(question);
            break;
        case 'yesyes':
            html += createYesYes(question);
            break;
    }

    questionCard.innerHTML = html;
    questionCard.style.animation = 'none';
    questionCard.offsetHeight;
    questionCard.style.animation = 'fadeInUp 0.5s ease-out';

    attachEventListeners(question.type);
}

/* ============================================
   Create Question Types
   ============================================ */
function createMultipleChoice(question) {
    let html = '<div class="options-container">';
    question.options.forEach((option, idx) => {
        html += `<button class="option-btn" data-index="${idx}">${option}</button>`;
    });
    html += '</div>';
    return html;
}

function createMultipleWithText(question) {
    let html = '<div class="options-container">';
    question.options.forEach((option, idx) => {
        html += `<button class="option-btn" data-index="${idx}">${option}</button>`;
    });
    html += `
        <div style="margin-top: 16px; text-align: center;">
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 8px;">Or write your own answer:</p>
            <input type="text" class="text-input custom-answer" placeholder="Type your own answer..." style="margin-bottom: 8px;">
            <button class="next-btn custom-submit" disabled>Submit Custom Answer</button>
        </div>
    `;
    html += '</div>';
    return html;
}

function createTextInput(question) {
    return `
        <input type="text" class="text-input" id="text-answer" 
               placeholder="${question.placeholder}" maxlength="200">
        <button class="next-btn" id="text-submit" disabled>Next</button>
    `;
}

function createSlider(question) {
    return `
        <input type="range" class="range-slider" id="slider" 
               min="${question.min}" max="${question.max}" value="${question.default}">
        <div class="range-value" id="slider-value">${question.default}</div>
        <p style="color: var(--text-muted); margin-top: 8px;">Slide to rate!</p>
        <button class="next-btn" id="slider-submit">Next</button>
    `;
}

function createYesYes(question) {
    let html = '<div class="options-container">';
    question.options.forEach((option, idx) => {
        html += `<button class="option-btn" data-index="${idx}" style="background: linear-gradient(135deg, var(--pink-soft), var(--rose-deep)); color: white;">${option}</button>`;
    });
    html += '</div>';
    html += '<p style="color: var(--text-muted); margin-top: 16px; font-size: 0.9rem;">Hint: There\'s no wrong answer here!</p>';
    return html;
}

/* ============================================
   Attach Event Listeners
   ============================================ */
function attachEventListeners(type) {
    switch (type) {
        case 'multiple':
        case 'yesyes':
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const selectedIndex = parseInt(this.dataset.index);
                    const question = questions[currentQuestion];
                    saveAnswer(question.options[selectedIndex]);
                    nextQuestion();
                });
            });
            break;

        case 'multiple-with-text':
            // Option buttons
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const selectedIndex = parseInt(this.dataset.index);
                    const question = questions[currentQuestion];
                    saveAnswer(question.options[selectedIndex]);
                    nextQuestion();
                });
            });

            // Custom text input
            const customInput = document.querySelector('.custom-answer');
            const customSubmit = document.querySelector('.custom-submit');

            if (customInput && customSubmit) {
                customInput.addEventListener('input', function () {
                    customSubmit.disabled = this.value.trim().length === 0;
                });

                customSubmit.addEventListener('click', function () {
                    saveAnswer(customInput.value.trim());
                    nextQuestion();
                });

                customInput.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter' && this.value.trim().length > 0) {
                        saveAnswer(this.value.trim());
                        nextQuestion();
                    }
                });
            }
            break;

        case 'text':
            const textInput = document.getElementById('text-answer');
            const textSubmit = document.getElementById('text-submit');

            textInput.addEventListener('input', function () {
                textSubmit.disabled = this.value.trim().length === 0;
            });

            textSubmit.addEventListener('click', function () {
                saveAnswer(textInput.value.trim());
                nextQuestion();
            });

            textInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter' && this.value.trim().length > 0) {
                    saveAnswer(this.value.trim());
                    nextQuestion();
                }
            });
            break;

        case 'slider':
            const slider = document.getElementById('slider');
            const sliderValue = document.getElementById('slider-value');
            const sliderSubmit = document.getElementById('slider-submit');

            slider.addEventListener('input', function () {
                const value = parseInt(this.value);
                let text = value.toString();
                if (value >= 9) text = value + ' - Perfect!';
                else if (value >= 7) text = value + ' - Amazing!';
                else if (value >= 5) text = value + ' - Good!';
                sliderValue.textContent = text;
            });

            sliderSubmit.addEventListener('click', function () {
                saveAnswer(parseInt(slider.value) + '/10');
                nextQuestion();
            });
            break;
    }
}

/* ============================================
   Navigation Functions
   ============================================ */
function saveAnswer(answer) {
    const question = questions[currentQuestion];
    const userName = localStorage.getItem('valentine_user_name') || 'Unknown';

    answers.push({
        questionId: question.id,
        question: question.question,
        answer: answer
    });

    // Save to localStorage for local viewing
    localStorage.setItem('valentine_quiz_answers', JSON.stringify(answers));

    // Save to global answers storage for reveal page
    let allAnswers = JSON.parse(localStorage.getItem('valentine_all_answers') || '{}');

    if (!allAnswers[userName]) {
        allAnswers[userName] = {
            name: userName,
            timestamp: new Date().toISOString(),
            answers: {}
        };
    }

    allAnswers[userName].answers[`q${question.id}`] = {
        question: question.question,
        answer: answer
    };
    allAnswers[userName].lastUpdated = new Date().toISOString();

    localStorage.setItem('valentine_all_answers', JSON.stringify(allAnswers));
}

function nextQuestion() {
    currentQuestion++;
    updateProgress();

    if (currentQuestion >= questions.length) {
        showResults();
    } else {
        displayQuestion(currentQuestion);
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const percentage = (currentQuestion / questions.length) * 100;
    progressFill.style.width = percentage + '%';
}

/* ============================================
   Show Results
   ============================================ */
function showResults() {
    const questionCard = document.getElementById('question-card');
    const resultsContainer = document.getElementById('results-container');
    const userName = localStorage.getItem('valentine_user_name') || 'You';

    questionCard.style.display = 'none';
    resultsContainer.style.display = 'block';

    // Calculate "love score"
    const sliderAnswer = answers.find(a => a.questionId === 4);
    let baseScore = 8;
    if (sliderAnswer && typeof sliderAnswer.answer === 'string') {
        baseScore = parseInt(sliderAnswer.answer) || 8;
    }
    const loveScore = Math.min(baseScore + 2, 10);

    launchConfettiResults();

    resultsContainer.innerHTML = `
        <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 16px;">
            <img src="${catStickers.love}" alt="Love cat" style="width: 80px;">
            <img src="${catStickers.happy}" alt="Happy cat" style="width: 80px;">
            <img src="${catStickers.cute}" alt="Cute cat" style="width: 80px;">
        </div>
        <h2 style="font-family: var(--font-romantic); font-size: 2rem; color: var(--rose-deep); margin-bottom: 16px;">
            Thank you, ${userName}!
        </h2>
        
        <div class="love-score">${loveScore}/10</div>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">Our Love Score!</p>
        
        <div class="love-message">
            ${getLoveMessage(loveScore)}
        </div>
        
        <div style="background: rgba(255, 107, 157, 0.1); padding: 24px; border-radius: 16px; margin: 24px 0;">
            <h3 style="color: var(--rose-deep); margin-bottom: 16px;">Your Answers</h3>
            ${generateAnswersSummary()}
        </div>
        
        <div style="display: flex; justify-content: center; gap: 16px; margin: 16px 0;">
            <img src="${catStickers.funny}" alt="Funny cat" style="width: 80px;">
            <img src="${catStickers.heart}" alt="Heart cat" style="width: 80px;">
        </div>
        
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 16px;">
            All your answers have been saved with love!
        </p>
        
        <a href="index.html" class="back-link">Back to Main Page</a>
    `;

    resultsContainer.style.animation = 'fadeInUp 0.5s ease-out';
}

function getLoveMessage(score) {
    if (score >= 9) {
        return `
            <span style="font-size: 1.5rem;">PERFECT MATCH!</span><br><br>
            Our love is truly special!<br>
            We are made for each other!
        `;
    } else if (score >= 7) {
        return `
            <span style="font-size: 1.5rem;">AMAZING!</span><br><br>
            We have the best relationship!<br>
            Together forever!
        `;
    } else {
        return `
            <span style="font-size: 1.5rem;">BEAUTIFUL!</span><br><br>
            Our love story is just beginning!<br>
            The best is yet to come!
        `;
    }
}

function generateAnswersSummary() {
    let html = '<div style="text-align: left;">';
    answers.forEach((answer, idx) => {
        html += `
            <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(199, 56, 102, 0.2);">
                <strong style="color: var(--rose-deep);">Q${idx + 1}:</strong> 
                <span style="color: var(--text-primary);">${answer.answer}</span>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

/* ============================================
   Confetti for Results
   ============================================ */
function launchConfettiResults() {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;

    confettiContainer.classList.add('active');

    const colors = ['#FF6B9D', '#FFB6C1', '#E91E63', '#FF85A2', '#C73866', '#E8A0BF', '#FFD700'];

    function createConfetti() {
        const confetti = document.createElement('span');
        confetti.className = 'confetti';

        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';

        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 4000);
    }

    for (let i = 0; i < 100; i++) {
        setTimeout(() => createConfetti(), i * 40);
    }

    setTimeout(() => {
        confettiContainer.classList.remove('active');
    }, 5000);
}

/* ============================================
   Floating Hearts
   ============================================ */
function initFloatingHeartsQuestions() {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;

    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.innerHTML = '&#10084;';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 15 + 14) + 'px';
        heart.style.color = '#FF6B9D';

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 20000);
    }

    for (let i = 0; i < 8; i++) {
        setTimeout(() => createHeart(), i * 600);
    }

    setInterval(createHeart, 3000);
}
