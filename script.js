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
            users.push({ username, email, password });
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

// Update nav and form visibility
function updateNav() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const signupNav = document.getElementById('signup-nav');
    const loginNav = document.getElementById('login-nav');
    const logoutNav = document.getElementById('logout-nav');
    const businessForm = document.getElementById('businessForm');
    const loginPrompt = document.getElementById('loginPrompt');
    const jobForm = document.getElementById('jobForm');
    const jobLoginPrompt = document.getElementById('jobLoginPrompt');

    if (loggedInUser) {
        if (signupNav) signupNav.style.display = 'none';
        if (loginNav) loginNav.style.display = 'none';
        if (logoutNav) logoutNav.style.display = 'block';
        if (businessForm) businessForm.style.display = 'block';
        if (loginPrompt) loginPrompt.style.display = 'none';
        if (jobForm) jobForm.style.display = 'block';
        if (jobLoginPrompt) jobLoginPrompt.style.display = 'none';
    } else {
        if (signupNav) signupNav.style.display = 'block';
        if (loginNav) loginNav.style.display = 'block';
        if (logoutNav) logoutNav.style.display = 'none';
        if (businessForm) businessForm.style.display = 'none';
        if (loginPrompt) loginPrompt.style.display = 'block';
        if (jobForm) jobForm.style.display = 'none';
        if (jobLoginPrompt) jobLoginPrompt.style.display = 'block';
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
    if (document.getElementById('jobList')) loadJobs();
});

// Business form handling
if (document.getElementById('businessForm')) {
    document.getElementById('businessForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const loggedInUser = localStorage.getItem('loggedInUser');
        const message = document.getElementById('businessMessage');

        if (!loggedInUser) {
            message.style.display = 'block';
            message.style.color = 'red';
            message.textContent = 'Please login to add a business.';
            setTimeout(() => window.location.href = 'login.html', 2000);
            return;
        }

        const name = document.getElementById('businessName').value.trim();
        const description = document.getElementById('businessDescription').value.trim();
        const category = document.getElementById('businessCategory').value;
        const contact = document.getElementById('businessContact').value.trim();

        if (name && description && category && contact) {
            const business = {
                id: Date.now().toString(),
                name,
                description,
                category,
                contact,
                postedBy: JSON.parse(loggedInUser).email
            };
            let businesses = JSON.parse(localStorage.getItem('businesses')) || [];
            businesses.push(business);
            localStorage.setItem('businesses', JSON.stringify(businesses));
            message.style.display = 'block';
            message.style.color = 'green';
            message.textContent = 'Business added successfully!';
            this.reset();
            displayBusinesses();
        } else {
            message.style.display = 'block';
            message.style.color = 'red';
            message.textContent = 'Please fill out all fields.';
        }
    });
}

// Job posting form
if (document.getElementById('jobForm')) {
    document.getElementById('jobForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const loggedInUser = localStorage.getItem('loggedInUser');
        const message = document.getElementById('jobMessage');

        if (!loggedInUser) {
            message.style.display = 'block';
            message.style.color = 'red';
            message.textContent = 'Please login to post a job.';
            setTimeout(() => window.location.href = 'login.html', 2000);
            return;
        }

        const title = document.getElementById('jobTitle').value.trim();
        const description = document.getElementById('jobDescription').value.trim();
        const category = document.getElementById('jobCategory').value;
        const contact = document.getElementById('jobContact').value.trim();

        if (title && description && category && contact) {
            const job = {
                id: Date.now().toString(),
                title,
                description,
                category,
                contact,
                postedBy: JSON.parse(loggedInUser).email
            };
            let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
            jobs.push(job);
            localStorage.setItem('jobs', JSON.stringify(jobs));
            message.style.display = 'block';
            message.style.color = 'green';
            message.textContent = 'Job posted successfully!';
            this.reset();
            displayJobs();
        } else {
            message.style.display = 'block';
            message.style.color = 'red';
            message.textContent = 'Please fill out all fields.';
        }
    });
}

// Edit form handling
if (document.getElementById('editForm')) {
    document.getElementById('editForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('editId').value;
        const type = document.getElementById('editType').value;
        const name = document.getElementById('editName').value.trim();
        const description = document.getElementById('editDescription').value.trim();
        const category = document.getElementById('editCategory').value;
        const contact = document.getElementById('editContact').value.trim();
        const message = document.getElementById('editMessage');

        if (name && description && category && contact) {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (type === 'business') {
                let businesses = JSON.parse(localStorage.getItem('businesses')) || [];
                const idx = businesses.findIndex(b => b.id === id && b.postedBy === loggedInUser.email);
                if (idx !== -1) {
                    businesses[idx] = { ...businesses[idx], name, description, category, contact };
                    localStorage.setItem('businesses', JSON.stringify(businesses));
                    displayBusinesses();
                }
            } else if (type === 'job') {
                let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
                const idx = jobs.findIndex(j => j.id === id && j.postedBy === loggedInUser.email);
                if (idx !== -1) {
                    jobs[idx] = { ...jobs[idx], title: name, description, category, contact };
                    localStorage.setItem('jobs', JSON.stringify(jobs));
                    displayJobs();
                }
            }
            message.style.display = 'block';
            message.style.color = 'green';
            message.textContent = 'Changes saved successfully!';
            setTimeout(() => closeEditModal(), 2000);
        } else {
            message.style.display = 'block';
            message.style.color = 'red';
            message.textContent = 'Please fill out all fields.';
        }
    });
}

// Booking form handling
if (document.getElementById('bookingForm')) {
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const jobId = document.getElementById('bookingJobId').value;
        const name = document.getElementById('bookingName').value.trim();
        const email = document.getElementById('bookingEmail').value.trim();
        const messageText = document.getElementById('bookingMessage').value.trim();
        const message = document.getElementById('bookingMessage');

        if (name && email) {
            const booking = { jobId, userEmail: email, name, message: messageText };
            let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings.push(booking);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            message.style.display = 'block';
            message.style.color = 'green';
            message.textContent = 'Booking submitted successfully!';
            this.reset();
            setTimeout(() => closeBookingModal(), 2000);
        } else {
            message.style.display = 'block';
            message.style.color = 'red';
            message.textContent = 'Please fill out name and email.';
        }
    });
}

// Load businesses
function loadBusinesses() {
    displayBusinesses();
}

// Display businesses
function displayBusinesses() {
    const businessList = document.getElementById('businessList');
    if (businessList) {
        businessList.innerHTML = '';
        let businesses = JSON.parse(localStorage.getItem('businesses')) || [];
        businesses.sort((a, b) => a.name.localeCompare(b.name));
        const loggedInUser = localStorage.getItem('loggedInUser');
        const userEmail = loggedInUser ? JSON.parse(loggedInUser).email : '';
        
        businesses.forEach(business => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${sanitizeInput(business.name)}</h3>
                <p>${sanitizeInput(business.description)}</p>
                <p class="category">Category: ${sanitizeInput(business.category)}</p>
                <p class="contact">Contact: <a href="mailto:${sanitizeInput(business.contact)}">${sanitizeInput(business.contact)}</a></p>
                ${
                    userEmail && business.postedBy === userEmail ? `
                        <button class="action-button edit-button" onclick="openEditModal('business', '${business.id}', '${sanitizeInput(business.name)}', '${sanitizeInput(business.description)}', '${sanitizeInput(business.category)}', '${sanitizeInput(business.contact)}')">Edit</button>
                        <button class="action-button delete-button" onclick="deleteItem('business', '${business.id}')">Delete</button>
                    ` : ''
                }
            `;
            businessList.appendChild(li);
        });
    }
}

// Load jobs
function loadJobs() {
    displayJobs();
}

// Display jobs
function displayJobs() {
    const jobList = document.getElementById('jobList');
    if (jobList) {
        jobList.innerHTML = '';
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        jobs.sort((a, b) => a.title.localeCompare(b.title));
        const loggedInUser = localStorage.getItem('loggedInUser');
        const userEmail = loggedInUser ? JSON.parse(loggedInUser).email : '';
        
        jobs.forEach(job => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${sanitizeInput(job.title)}</h3>
                <p>${sanitizeInput(job.description)}</p>
                <p class="category">Category: ${sanitizeInput(job.category)}</p>
                <p class="contact">Contact: <a href="mailto:${sanitizeInput(job.contact)}">${sanitizeInput(job.contact)}</a></p>
                <button onclick="openBookingModal('${sanitizeInput(job.id)}', '${sanitizeInput(job.title)}')">Book Now</button>
                ${
                    userEmail && job.postedBy === userEmail ? `
                        <button class="action-button edit-button" onclick="openEditModal('job', '${job.id}', '${sanitizeInput(job.title)}', '${sanitizeInput(job.description)}', '${sanitizeInput(job.category)}', '${sanitizeInput(job.contact)}')">Edit</button>
                        <button class="action-button delete-button" onclick="deleteItem('job', '${job.id}')">Delete</button>
                    ` : ''
                }
            `;
            jobList.appendChild(li);
        });
    }
}

// Delete item
function deleteItem(type, id) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) return;

    if (type === 'business') {
        let businesses = JSON.parse(localStorage.getItem('businesses')) || [];
        businesses = businesses.filter(b => !(b.id === id && b.postedBy === loggedInUser.email));
        localStorage.setItem('businesses', JSON.stringify(businesses));
        displayBusinesses();
    } else if (type === 'job') {
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        jobs = jobs.filter(j => !(j.id === id && j.postedBy === loggedInUser.email));
        localStorage.setItem('jobs', JSON.stringify(jobs));
        // Remove associated bookings
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings = bookings.filter(b => b.jobId !== id);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        displayJobs();
    }
}

// Edit modal
function openEditModal(type, id, name, description, category, contact) {
    const modal = document.getElementById('editModal');
    const titleElement = document.getElementById('editModalTitle');
    const nameInput = document.getElementById('editName');
    const descInput = document.getElementById('editDescription');
    const catInput = document.getElementById('editCategory');
    const contactInput = document.getElementById('editContact');
    const idInput = document.getElementById('editId');
    const typeInput = document.getElementById('editType');

    if (modal && titleElement && nameInput && descInput && catInput && contactInput && idInput && typeInput) {
        titleElement.textContent = type === 'business' ? 'Edit Business' : 'Edit Job';
        nameInput.value = name;
        descInput.value = description;
        catInput.value = category;
        contactInput.value = contact;
        idInput.value = id;
        typeInput.value = type;
        modal.style.display = 'block';
    }
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    const message = document.getElementById('editMessage');
    if (modal) modal.style.display = 'none';
    if (message) {
        message.style.display = 'none';
        message.textContent = '';
    }
    const form = document.getElementById('editForm');
    if (form) form.reset();
}

// Booking modal
function openBookingModal(jobId, jobTitle) {
    const modal = document.getElementById('bookingModal');
    const titleElement = document.getElementById('bookingJobTitle');
    const jobIdInput = document.getElementById('bookingJobId');
    if (modal && titleElement && jobIdInput) {
        titleElement.textContent = sanitizeInput(jobTitle);
        jobIdInput.value = jobId;
        modal.style.display = 'block';
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    const message = document.getElementById('bookingMessage');
    if (modal) modal.style.display = 'none';
    if (message) {
        message.style.display = 'none';
        message.textContent = '';
    }
    const form = document.getElementById('bookingForm');
    if (form) form.reset();
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
        const messageText = document.getElementById('message').value.trim();
        const formMessage = document.getElementById('formMessage');

        if (name && email && messageText) {
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