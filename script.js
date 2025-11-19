// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Intersection Observer for Scroll Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple elements
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);

            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .feature-card, .step, .testimonial-card');
    animatedElements.forEach(el => observer.observe(el));
});

// ========================================
// Navbar Background on Scroll
// ========================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove shadow based on scroll position
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
});

// ========================================
// Waitlist Form Handling
// ========================================
const waitlistForm = document.getElementById('waitlistForm');
const successMessage = document.getElementById('successMessage');

waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        specialty: document.getElementById('specialty').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.specialty) {
        showError('Please fill in all fields');
        return;
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
        showError('Please enter a valid email address');
        return;
    }

    // Get submit button
    const submitBtn = waitlistForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Joining...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    try {
        // TODO: Replace this with your actual form submission endpoint
        // Examples:
        // - Google Forms
        // - Formspree (https://formspree.io/)
        // - Your own backend API
        // - Email service like Mailchimp

        // Simulated API call (replace with actual submission)
        await simulateFormSubmission(formData);

        // Show success message
        waitlistForm.style.display = 'none';
        successMessage.classList.add('show');

        // Optional: Track conversion with analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'waitlist_signup', {
                'event_category': 'engagement',
                'event_label': formData.specialty
            });
        }

        // Store in localStorage to prevent duplicate submissions
        localStorage.setItem('survade_waitlist_joined', 'true');

    } catch (error) {
        console.error('Form submission error:', error);
        showError('Something went wrong. Please try again.');

        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});

// ========================================
// Form Helper Functions
// ========================================

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    // Create error element if it doesn't exist
    let errorElement = document.querySelector('.form-error');

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.style.cssText = `
            padding: 1rem;
            background: rgba(245, 87, 108, 0.2);
            border: 1px solid rgba(245, 87, 108, 0.5);
            border-radius: 0.5rem;
            color: #f5576c;
            margin-bottom: 1rem;
            text-align: center;
        `;
        waitlistForm.insertBefore(errorElement, waitlistForm.firstChild);
    }

    errorElement.textContent = message;
    errorElement.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Log form data to console (for testing)
            console.log('Waitlist signup:', data);

            // Simulate success
            resolve({ success: true });

            // To test error handling, uncomment:
            // reject(new Error('Submission failed'));
        }, 1500);
    });
}

// ========================================
// Real Form Submission Examples
// ========================================

// Example 1: Formspree (https://formspree.io/)
// Uncomment and replace YOUR_FORM_ID with your Formspree form ID
/*
async function submitToFormspree(data) {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Submission failed');
    }

    return response.json();
}
*/

// Example 2: Google Forms
// You can embed a Google Form and submit to it via fetch
/*
async function submitToGoogleForm(data) {
    const formUrl = 'YOUR_GOOGLE_FORM_URL';
    const formData = new FormData();

    // Map your form fields to Google Form entry IDs
    formData.append('entry.YOUR_NAME_ENTRY_ID', data.name);
    formData.append('entry.YOUR_EMAIL_ENTRY_ID', data.email);
    formData.append('entry.YOUR_SPECIALTY_ENTRY_ID', data.specialty);

    await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    });
}
*/

// Example 3: Custom API endpoint
/*
async function submitToCustomAPI(data) {
    const response = await fetch('https://yourdomain.com/api/waitlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY' // if needed
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Submission failed');
    }

    return response.json();
}
*/

// ========================================
// Check if user already joined waitlist
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const hasJoined = localStorage.getItem('survade_waitlist_joined');

    if (hasJoined) {
        waitlistForm.style.display = 'none';
        successMessage.classList.add('show');
    }
});

// ========================================
// Parallax Effect on Hero Background
// ========================================
const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ========================================
// Add hover effect to CTA buttons
// ========================================
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            width: 10px;
            height: 10px;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(10);
            opacity: 0;
        }
    }

    .cta-button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// ========================================
// Performance Optimization: Debounce Scroll
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// Console Welcome Message
// ========================================
console.log('%c🚀 Welcome to Survade!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cInterested in how this works? We\'re hiring! Check out our careers page.', 'font-size: 12px; color: #888;');
