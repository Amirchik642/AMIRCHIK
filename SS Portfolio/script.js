// Skill descriptions for the modal
const skillDescriptions = {
    'teamwork': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'problem-solving': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'communication': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    'adaptability': 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
    'intercultural': 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
    'initiative': 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.'
};

// Personality titles
const personalityTitles = [
    'Strategic Dreamer 🌟',
    'Creative Problem Solver 🎯',
    'Cultural Bridge Builder 🌉',
    'Innovation Enthusiast 💡',
    'Adaptive Leader 🎭'
];

// DOM Elements
const modal = document.getElementById('skill-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.querySelector('.close-modal');
const generatePersonalityBtn = document.getElementById('generate-personality');
const personalityResult = document.getElementById('personality-result');

// Skill cards click handler
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
        const skill = card.dataset.skill;
        const description = skillDescriptions[skill];
        
        modalTitle.textContent = description.title;
        modalDescription.textContent = description.description;
        modal.style.display = 'block';
        
        // Add animation
        modal.style.animation = 'fadeIn 0.3s ease-out';
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Generate personality
generatePersonalityBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * personalityTitles.length);
    const personality = personalityTitles[randomIndex];
    
    // Add animation
    personalityResult.style.animation = 'none';
    personalityResult.offsetHeight; // Trigger reflow
    personalityResult.style.animation = 'fadeIn 0.5s ease-out';
    
    personalityResult.textContent = personality;
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add parallax effect to sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const speed = 0.5;
        const rect = section.getBoundingClientRect();
        const scroll = window.pageYOffset;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.style.backgroundPositionY = `${scroll * speed}px`;
        }
    });
});

// Add hover effect to game cards
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 0 20px rgba(255, 51, 102, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = 'none';
    });
});

// Initialize skill bars animation
document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.style.getPropertyValue('--level');
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = level;
        }, 500);
    });
});

// Wait for the DOM to be fully loaded
window.onload = function() {
    // Get all skill buttons
    const buttons = document.getElementsByClassName('skill-button');
    
    // Add click event to each button
    for (let button of buttons) {
        button.addEventListener('click', function() {
            // Get the skill name from the button's data attribute
            const skill = this.getAttribute('data-skill');
            const title = this.querySelector('h3').textContent;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <h3>${title}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            `;
            
            // Add modal to the page
            document.body.appendChild(modal);
            
            // Show modal
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Close button functionality
            const closeButton = modal.querySelector('.close-button');
            closeButton.onclick = function() {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            };
            
            // Close when clicking outside
            modal.onclick = function(e) {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                }
            };
        });
    }
};

function showSkill(title, description) {
    // First, remove any existing modals
    const oldModals = document.querySelectorAll('.modal');
    oldModals.forEach(modal => {
        modal.remove();
    });

    // Create new modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'none'; // Start hidden

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Create close button
    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';

    // Create title
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;

    // Create description
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(titleElement);
    modalContent.appendChild(descriptionElement);
    modal.appendChild(modalContent);

    // Add to document
    document.body.appendChild(modal);

    // Show modal
    requestAnimationFrame(() => {
        modal.style.display = 'flex';
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    });

    // Close button handler
    closeButton.onclick = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    };

    // Click outside handler
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    };
}

function showPhotoDescription(title, description) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content photo-modal">
            <span class="close-button">&times;</span>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
    
    // Add modal to the page
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close button functionality
    const closeButton = modal.querySelector('.close-button');
    closeButton.onclick = function() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    // Close when clicking outside
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    };
}

function showContactForm() {
    const modal = document.getElementById('contact-modal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the form data to your email
    // For now, we'll just show a success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Close the modal
    const modal = document.getElementById('contact-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        // Reset the form
        document.getElementById('contact-form').reset();
    }, 300);
}

// Add event listener for closing the contact modal
document.addEventListener('DOMContentLoaded', function() {
    const contactModal = document.getElementById('contact-modal');
    const closeButton = contactModal.querySelector('.close-button');
    
    closeButton.onclick = function() {
        contactModal.classList.remove('show');
        setTimeout(() => {
            contactModal.style.display = 'none';
        }, 300);
    };
    
    // Close when clicking outside
    contactModal.onclick = function(e) {
        if (e.target === contactModal) {
            contactModal.classList.remove('show');
            setTimeout(() => {
                contactModal.style.display = 'none';
            }, 300);
        }
    };
});

function showEmail() {
    const modal = document.getElementById('email-modal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function copyEmail() {
    const email = 'amirhaitov009@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const button = document.querySelector('.copy-button');
        if (button) {
            button.textContent = 'Copied!';
            button.classList.add('copied');
            setTimeout(() => {
                button.textContent = 'Copy Email';
                button.classList.remove('copied');
            }, 2000);
        }
    });
}

// Initialize all modals when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Email modal
    const emailModal = document.getElementById('email-modal');
    if (emailModal) {
        const closeButton = emailModal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                emailModal.classList.remove('show');
                setTimeout(() => {
                    emailModal.style.display = 'none';
                }, 300);
            });
        }

        // Close when clicking outside
        emailModal.addEventListener('click', function(e) {
            if (e.target === emailModal) {
                emailModal.classList.remove('show');
                setTimeout(() => {
                    emailModal.style.display = 'none';
                }, 300);
            }
        });
    }
}); 