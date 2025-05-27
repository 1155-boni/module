// Theme toggle
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        body.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

// Sign-up form handling
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const message = document.getElementById('signupMessage');

        if (username && email && password) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.email === email)) {
                message.style.display = 'block';
                message.style.color = 'red';
                message.textContent = 'Email already registered.';
                return;
            }
            users.push({ username, email, password }); // Note: In production, hash passwords
            localStorage.setItem('users', JSON.stringify(users));
            message.style.display = 'block';
            message.style.color = 'green';
            message.textContent = 'Sign-up successful! Redirecting to login...';
            setTimeout(() => window.location.href = 'login.html', 2000);
        } else {
            message.style.display = 'block';
            message.style.color = 'red';
            message.textContent = 'Please fill out all fields.';
        }
    });
}

// Login form handling
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const message = document.getElementById('loginMessage');

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            message.style.display = 'block';
            message.style.color = 'green';
            message.textContent = 'Login successful! Redirecting...';
            setTimeout(() => window.location.href = 'index.html', 2000);
        } else {
            message.style.display = 'block';
            message.style.color = 'red';
            message.textContent = 'Invalid email or password.';
        }
    });
}

// Logout
function logout() {
    localStorage.removeItem('loggedInUser');
    updateNav();
    window.location.href = 'login.html';
}

// Update nav based on login status
function updateNav() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const signupNav = document.getElementById('signup-nav');
    const loginNav = document.getElementById('login-nav');
    const logoutNav = document.getElementById('logout-nav');

    if (loggedInUser) {
        if (signupNav) signupNav.style.display = 'none';
        if (loginNav) loginNav.style.display = 'none';
        if (logoutNav) logoutNav.style.display = 'block';
    } else {
        if (signupNav) signupNav.style.display = 'block';
        if (loginNav) loginNav.style.display = 'block';
        if (logoutNav) logoutNav.style.display = 'none';
    }
}

// Apply saved theme and nav on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    updateNav();
    if (document.getElementById('businessList')) loadBusinesses();
});

// Business form handling
if (document.getElementById('businessForm')) {
    document.getElementById('businessForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('businessName').value.trim();
        const description = document.getElementById('businessDescription').value.trim();
        const category = document.getElementById('businessCategory').value;
        const contact = document.getElementById('businessContact').value.trim();
        const message = document.getElementById('businessMessage');

        if (name && description && category && contact) {
            const business = { name, description, category, contact };
            let businesses = JSON.parse(localStorage.getItem('businesses')) || [];
            businesses.push(business);
            localStorage.setItem('businesses', JSON.stringify(businesses));
            message.style.display = 'block';
            message.style.color = 'green';
            message.textContent = 'Business added successfully!';
            this.reset();
            displayBusinesses(businesses);
        } else {
            message.style.display = 'block';
            message.style.color = 'red';
            message.textContent = 'Please fill out all fields.';
        }
    });
}

function loadBusinesses() {
    const businesses = JSON.parse(localStorage.getItem('businesses')) || [];
    displayBusinesses(businesses);
}

function displayBusinesses(businesses) {
    const businessList = document.getElementById('businessList');
    if (businessList) {
        businessList.innerHTML = '';
        businesses.forEach(business => {
            const card = document.createElement('div');
            card.className = 'business-card';
            card.innerHTML = `
                <h3>${sanitizeInput(business.name)}</h3>
                <p>${sanitizeInput(business.description)}</p>
                <p class="category">Category: ${sanitizeInput(business.category)}</p>
                <p class="contact">Contact: <a href="mailto:${sanitizeInput(business.contact)}">${sanitizeInput(business.contact)}</a></p>
            `;
            businessList.appendChild(card);
        });
    }
}

// Input sanitization
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Smooth scrolling
function smoothScroll(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth <= 768) {
        document.querySelector('.nav-menu').classList.remove('active');
    }
}

// Toggle hamburger menu
function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
}

// Contact form
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const formMessage = document.getElementById('formMessage');

        if (name && email && message) {
            formMessage.style.display = 'block';
            formMessage.style.color = 'green';
            formMessage.textContent = 'Thank you for your message!';
            this.reset();
        } else {
            formMessage.style.display = 'block';
            formMessage.style.color = 'red';
            formMessage.textContent = 'Please fill out all fields.';
        }
    });
}

// Newsletter form
if (document.getElementById('newsletterForm')) {
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value.trim();
        const newsletterMessage = document.getElementById('newsletterMessage');

        if (email) {
            newsletterMessage.style.display = 'block';
            newsletterMessage.style.color = 'green';
            newsletterMessage.textContent = 'Thank you for subscribing!';
            this.reset();
        } else {
            newsletterMessage.style.display = 'block';
            newsletterMessage.style.color = 'red';
            newsletterMessage.textContent = 'Please enter a valid email.';
        }
    });
}

// Testimonial carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

if (testimonials.length) showTestimonial(currentTestimonial);

// Lightbox for gallery
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = 'none';
}

// Back to Top
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
});