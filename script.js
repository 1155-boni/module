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

// Apply saved theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').classList.replace('fa-sun', 'fa-moon');
    }
    // Load businesses from localStorage
    loadBusinesses();
});

// Business form handling
document.getElementById('businessForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('businessName').value.trim();
    const description = document.getElementById('businessDescription').value.trim();
    const category = document.getElementById('businessCategory').value;
    const contact = document.getElementById('businessContact').value.trim();
    const message = document.getElementById('businessMessage');

    if (name && description && category && contact) {
        // Create business object
        const business = { name, description, category, contact };
        
        // Get existing businesses from localStorage
        let businesses = JSON.parse(localStorage.getItem('businesses')) || [];
        
        // Add new business
        businesses.push(business);
        
        // Save to localStorage
        localStorage.setItem('businesses', JSON.stringify(businesses));
        
        // Display success message
        message.style.display = 'block';
        message.style.color = 'green';
        message.textContent = 'Business added successfully!';
        
        // Reset form
        this.reset();
        
        // Update business list
        displayBusinesses(businesses);
    } else {
        message.style.display = 'block';
        message.style.color = 'red';
        message.textContent = 'Please fill out all fields.';
    }
});

// Load businesses from localStorage
function loadBusinesses() {
    const businesses = JSON.parse(localStorage.getItem('businesses')) || [];
    displayBusinesses(businesses);
}

// Display businesses
function displayBusinesses(businesses) {
    const businessList = document.getElementById('businessList');
    businessList.innerHTML = ''; // Clear existing list
    
    businesses.forEach(business => {
        const card = document.createElement('div');
        card.className = 'business-card';
        card.innerHTML = `
            <h3>${business.name}</h3>
            <p>${business.description}</p>
            <p class="category">Category: ${business.category}</p>
            <p class="contact">Contact: <a href="mailto:${business.contact}">${business.contact}</a></p>
        `;
        businessList.appendChild(card);
    });
}

// Smooth scrolling for navigation
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

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');

    if (name && email && message) {
        formMessage.style.display = 'block';
        formMessage.style.color = 'green';
        formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        this.reset();
    } else {
        formMessage.style.display = 'block';
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please fill out all fields.';
    }
});

// Newsletter form handling
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

showTestimonial(currentTestimonial);

// Lightbox for gallery
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Back to Top button
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
});