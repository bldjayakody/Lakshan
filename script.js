// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#64ffda'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#64ffda',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission handling with validation
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    form.reset();
});

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add parallax effect to background
document.addEventListener('mousemove', (e) => {
    const background = document.querySelector('.background');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    background.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Timeline interactions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize progress bars
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const progress = bar.dataset.progress;
        bar.style.setProperty('--progress', `${progress}%`);
    });

    // Mouse tracking for timeline items
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    timelineContents.forEach(content => {
        content.addEventListener('mousemove', (e) => {
            const rect = content.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / content.offsetWidth) * 100;
            const y = ((e.clientY - rect.top) / content.offsetHeight) * 100;
            
            content.style.setProperty('--mouse-x', `${x}%`);
            content.style.setProperty('--mouse-y', `${y}%`);
        });

        content.addEventListener('mouseleave', () => {
            content.style.setProperty('--mouse-x', '50%');
            content.style.setProperty('--mouse-y', '50%');
        });
    });

    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Interactive timeline icons
    const timelineIcons = document.querySelectorAll('.timeline-icon');
    timelineIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.querySelector('.glow-circle').style.opacity = '0.3';
        });

        icon.addEventListener('mouseleave', () => {
            icon.querySelector('.glow-circle').style.opacity = '0';
        });
    });
});

// Mouse trail effect
function createMouseTrail() {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Smooth follow effect
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.1;
        trailY += dy * 0.1;

        trail.style.transform = `translate(${trailX - 10}px, ${trailY - 10}px)`;

        // Add glow effect when near timeline items
        const timelineCards = document.querySelectorAll('.timeline-card');
        timelineCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

            if (distance < 200) {
                const scale = 1 + (1 - distance / 200) * 0.5;
                trail.style.transform += ` scale(${scale})`;
                trail.style.borderColor = `rgba(100, 255, 218, ${1 - distance / 200})`;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize mouse trail
createMouseTrail();

// Page Load and Refresh Effects
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.page-loader');
    const transition = document.querySelector('.page-transition');
    const contentWrapper = document.querySelector('.content-wrapper');
    
    // Initial page load
    setTimeout(() => {
        loader.classList.add('hidden');
        contentWrapper.classList.add('visible');
    }, 2500);

    // Add refresh button to the page
    const refreshButton = document.createElement('button');
    refreshButton.className = 'refresh-button';
    refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
    document.body.appendChild(refreshButton);

    // Refresh functionality
    refreshButton.addEventListener('click', async () => {
        // Add loading state
        refreshButton.classList.add('loading');
        
        // Show transition
        transition.classList.add('active');
        
        // Wait for transition
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simulate content refresh
        document.querySelectorAll('.fade-in-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
        
        // Hide transition
        setTimeout(() => {
            transition.classList.remove('active');
            
            // Trigger re-animation of elements
            document.querySelectorAll('.fade-in-item').forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '';
                    item.style.transform = '';
                }, index * 100);
            });
            
            // Reset refresh button
            refreshButton.classList.remove('loading');
        }, 1000);
    });

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.fade-in-item, .timeline-item, .glass-card').forEach(item => {
        observer.observe(item);
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
