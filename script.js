// Smooth scrolling for navigation
function smoothScroll(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    // Close menu on mobile after clicking a link
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

// Initialize carousel
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