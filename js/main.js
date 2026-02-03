/* ============================================
   Valentine's Day Website - Main JavaScript
   Animations, Interactions & Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // RESET everything on page load (user requested)
    localStorage.removeItem('valentine_user_name');
    localStorage.removeItem('valentine_quiz_answers');
    // Keep valentine_all_answers for reveal page (admin only)

    // Check if name is entered, if not show name modal
    checkNameEntry();
    initFloatingHearts();
    initFloatingPetals();
    initValentineButtons();
    initScrollAnimations();
});

/* ============================================
   Name Entry Modal
   ============================================ */
function checkNameEntry() {
    const savedName = localStorage.getItem('valentine_user_name');

    if (!savedName) {
        showNameModal();
    } else {
        updatePageWithName(savedName);
    }
}

function showNameModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'name-modal';
    modal.innerHTML = `
        <div class="name-modal-overlay">
            <div class="name-modal-content">
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGgxMjkyMWUyaGJ3d3ZtMHpwN2VlZ3R2OXFrdjJ1cW5jcDFwcWVtaSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/VIPdgcooFJHtC/giphy.gif" alt="Cat" style="width: 100px; margin-bottom: 16px;">
                <h2 style="font-family: 'Dancing Script', cursive; font-size: 2rem; color: #C73866; margin-bottom: 16px;">
                    Welcome, Beautiful!
                </h2>
                <p style="color: #4A1942; margin-bottom: 24px;">
                    Please enter your name to continue
                </p>
                <input type="text" id="name-input" placeholder="Your beautiful name..." 
                    style="width: 100%; padding: 12px; border: 2px solid #FF6B9D; border-radius: 12px; 
                    font-size: 1rem; text-align: center; outline: none; margin-bottom: 16px;">
                <button id="name-submit" 
                    style="background: linear-gradient(135deg, #FF6B9D, #C73866); color: white; 
                    border: none; padding: 12px 32px; border-radius: 24px; font-size: 1.1rem; 
                    font-family: 'Dancing Script', cursive; cursor: pointer; transition: transform 0.3s;">
                    Enter
                </button>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .name-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 107, 157, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        .name-modal-content {
            background: rgba(255, 255, 255, 0.95);
            padding: 48px;
            border-radius: 24px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(199, 56, 102, 0.3);
            max-width: 400px;
            width: 90%;
            animation: fadeInUp 0.5s ease-out;
        }
        #name-submit:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Focus on input
    setTimeout(() => {
        document.getElementById('name-input').focus();
    }, 100);

    // Handle submit
    document.getElementById('name-submit').addEventListener('click', submitName);
    document.getElementById('name-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') submitName();
    });
}

function submitName() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim();

    if (name.length < 1) {
        nameInput.style.borderColor = '#E91E63';
        nameInput.placeholder = 'Please enter your name!';
        return;
    }

    // Save name
    localStorage.setItem('valentine_user_name', name);

    // Remove modal with animation
    const modal = document.getElementById('name-modal');
    modal.querySelector('.name-modal-content').style.animation = 'fadeOutDown 0.5s ease-out';

    setTimeout(() => {
        modal.remove();
        updatePageWithName(name);
    }, 400);
}

function updatePageWithName(name) {
    // Update hero title with name
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.textContent = `My ${name}`;
    }
}

/* ============================================
   Floating Hearts Animation
   ============================================ */
function initFloatingHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;

    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.innerHTML = '&#10084;'; // Heart symbol
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 20 + 16) + 'px';
        heart.style.color = '#FF6B9D';

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 20000);
    }

    for (let i = 0; i < 15; i++) {
        setTimeout(() => createHeart(), i * 500);
    }

    setInterval(createHeart, 2000);
}

/* ============================================
   Floating Petals Animation
   ============================================ */
function initFloatingPetals() {
    const background = document.getElementById('background');
    if (!background) return;

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 15 + 15) + 's';
        petal.style.animationDelay = Math.random() * 10 + 's';

        background.appendChild(petal);

        setTimeout(() => {
            if (petal.parentNode) {
                petal.remove();
            }
        }, 30000);
    }

    for (let i = 0; i < 10; i++) {
        setTimeout(() => createPetal(), i * 800);
    }

    setInterval(createPetal, 3000);
}

/* ============================================
   Valentine Yes/No Buttons - No button nautanki!
   ============================================ */
function initValentineButtons() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const celebrationMessage = document.getElementById('celebration-message');
    const buttonContainer = document.querySelector('.button-container');

    if (!yesBtn || !noBtn) return;

    let noClickCount = 0;
    const maxMoves = 9; // Button will move 9 times before disappearing

    const funnyTexts = [
        'No',
        'Are you sure?',
        'Really sure?',
        'Think again!',
        'Last chance!',
        'Surely not?',
        'You might regret this!',
        'Give it another thought!',
        'Are you crazy?!',
        'Fine, I am gone!'
    ];

    // Yes button click - celebration!
    yesBtn.addEventListener('click', function () {
        celebrationMessage.style.display = 'block';
        buttonContainer.style.display = 'none';

        // Save answer with name
        const userName = localStorage.getItem('valentine_user_name') || 'Unknown';
        saveAnswer(userName, 'valentine_question', 'Yes!');

        launchConfetti();
    });

    // No button - moves around with drama!
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);
    noBtn.addEventListener('touchstart', moveNoButton);

    function moveNoButton(e) {
        e.preventDefault();
        noClickCount++;

        // Update text
        if (noClickCount <= maxMoves) {
            noBtn.textContent = funnyTexts[noClickCount];
        }

        // Calculate random position
        const container = buttonContainer.parentElement;
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Random position within viewport
        const maxX = window.innerWidth - btnRect.width - 50;
        const maxY = window.innerHeight - btnRect.height - 50;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // Position the button absolutely on the page
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '1000';
        noBtn.style.transition = 'all 0.3s ease';

        // Add shake animation
        noBtn.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            noBtn.style.animation = '';
        }, 500);

        // After 9 moves, make it disappear
        if (noClickCount >= maxMoves) {
            setTimeout(() => {
                noBtn.style.transform = 'scale(0) rotate(360deg)';
                noBtn.style.opacity = '0';

                setTimeout(() => {
                    noBtn.style.display = 'none';
                    // Make Yes button bigger
                    yesBtn.style.transform = 'scale(1.3)';
                    yesBtn.textContent = 'Just say Yes!';
                }, 500);
            }, 300);
        }
    }
}

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        50% { transform: translateX(10px) rotate(5deg); }
        75% { transform: translateX(-10px) rotate(-5deg); }
    }
    @keyframes fadeOutDown {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(50px); }
    }
`;
document.head.appendChild(shakeStyle);

/* ============================================
   Confetti Animation
   ============================================ */
function launchConfetti() {
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

    for (let i = 0; i < 150; i++) {
        setTimeout(() => createConfetti(), i * 30);
    }

    setTimeout(() => {
        confettiContainer.classList.remove('active');
    }, 5000);
}

/* ============================================
   Scroll Animations
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.shayari-card').forEach(card => {
        observer.observe(card);
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

/* ============================================
   Save Answers to localStorage (for reveal page)
   ============================================ */
function saveAnswer(userName, questionId, answer) {
    // Get existing answers
    let allAnswers = JSON.parse(localStorage.getItem('valentine_all_answers') || '{}');

    // Create user entry if doesn't exist
    if (!allAnswers[userName]) {
        allAnswers[userName] = {
            name: userName,
            timestamp: new Date().toISOString(),
            answers: {}
        };
    }

    // Save answer
    allAnswers[userName].answers[questionId] = answer;
    allAnswers[userName].lastUpdated = new Date().toISOString();

    // Store back
    localStorage.setItem('valentine_all_answers', JSON.stringify(allAnswers));
}

// Expose saveAnswer globally for questions page
window.saveValentineAnswer = saveAnswer;
