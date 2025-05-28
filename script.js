// Theme Toggle
const themeIcon = document.getElementById('theme-icon');
let isDarkTheme = localStorage.getItem('theme') === 'dark';

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    console.log('Toggling theme to:', isDarkTheme ? 'dark' : 'light'); // Debug log
    // Set the theme
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    // Update the icon shape
    if (themeIcon) {
        themeIcon.classList.remove('fa-sun', 'fa-moon'); // Remove both classes first
        if (isDarkTheme) {
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.add('fa-sun');
        }
    }
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    if (themeIcon) {
        if (isDarkTheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
});

// Hamburger Menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Smooth Scroll and Close Hamburger Menu
function smoothScroll(sectionId) {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Back to Top
window.onscroll = function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
};

// Testimonial Carousel
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

if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);
}

// Gallery Lightbox
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightbox.style.display = 'flex';
        lightboxImg.src = src;
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// Sanitize Input
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Signup Form
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        const signupMessage = document.getElementById('signupMessage');

        if (name && email && password) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                signupMessage.textContent = 'Email already registered. Please log in.';
                signupMessage.className = 'form-message error';
                signupMessage.style.display = 'block';
                setTimeout(() => {
                    signupMessage.style.display = 'none';
                }, 5000);
            } else {
                users.push({ name, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                signupMessage.textContent = 'Sign up successful! Redirecting to login...';
                signupMessage.className = 'form-message success';
                signupMessage.style.display = 'block';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        } else {
            signupMessage.textContent = 'Please fill in all fields.';
            signupMessage.className = 'form-message error';
            signupMessage.style.display = 'block';
            setTimeout(() => {
                signupMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const loginMessage = document.getElementById('loginMessage');

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            loginMessage.textContent = 'Login successful! Redirecting...';
            loginMessage.className = 'form-message success';
            loginMessage.style.display = 'block';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            loginMessage.textContent = 'Invalid email or password.';
            loginMessage.className = 'form-message error';
            loginMessage.style.display = 'block';
            setTimeout(() => {
                loginMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Business Form
const businessForm = document.getElementById('businessForm');
const businessList = document.getElementById('businessList');
const businessMessage = document.getElementById('businessMessage');
let businesses = JSON.parse(localStorage.getItem('businesses')) || [];

function displayBusinesses() {
    if (businessList) {
        businessList.innerHTML = '';
        businesses.forEach((business, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${sanitizeInput(business.name)}</h3>
                <p>${sanitizeInput(business.description)}</p>
                <p class="category">Category: ${sanitizeInput(business.category)}</p>
                <p class="contact">Contact: ${sanitizeInput(business.contact)}</p>
                <div class="button-group">
                    <button class="action-button edit-button" onclick="openEditBusinessModal(${index}); return false;">Edit</button>
                    <button class="action-button delete-button" onclick="deleteBusiness(${index}); return false;">Delete</button>
                </div>
            `;
            businessList.appendChild(li);
        });
    }
}

if (businessForm) {
    businessForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('businessName').value.trim();
        const description = document.getElementById('businessDescription').value.trim();
        const category = document.getElementById('businessCategory').value;
        const contact = document.getElementById('businessContact').value.trim();

        if (name && description && category && contact) {
            businesses.push({ name, description, category, contact });
            localStorage.setItem('businesses', JSON.stringify(businesses));
            displayBusinesses();
            businessForm.reset();
            businessMessage.textContent = 'Business added successfully!';
            businessMessage.className = 'form-message success';
            businessMessage.style.display = 'block';
            setTimeout(() => {
                businessMessage.style.display = 'none';
            }, 5000);
        } else {
            businessMessage.textContent = 'Please fill in all fields.';
            businessMessage.className = 'form-message error';
            businessMessage.style.display = 'block';
            setTimeout(() => {
                businessMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Job Form
const jobForm = document.getElementById('jobForm');
const jobList = document.getElementById('jobList');
const jobMessage = document.getElementById('jobMessage');
let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

function displayJobs() {
    if (jobList) {
        jobList.innerHTML = '';
        jobs.forEach((job, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${sanitizeInput(job.title)}</h3>
                <p>${sanitizeInput(job.description)}</p>
                <p class="category">Category: ${sanitizeInput(job.category)}</p>
                <p class="contact">Contact: ${sanitizeInput(job.contact)}</p>
                <p class="salary">Salary: $${sanitizeInput(job.salary || 'N/A')}</p>
                <div class="button-group">
                    <button class="action-button edit-button" onclick="openEditJobModal(${index}); return false;">Edit</button>
                    <button class="action-button delete-button" onclick="deleteJob(${index}); return false;">Delete</button>
                    <button class="book-now-button" onclick="openBookingModal(${index}, '${sanitizeInput(job.title)}'); return false;">Book Now</button>
                </div>
            `;
            jobList.appendChild(li);
        });
    }
}

if (jobForm) {
    jobForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('jobTitle').value.trim();
        const description = document.getElementById('jobDescription').value.trim();
        const category = document.getElementById('jobCategory').value;
        const contact = document.getElementById('jobContact').value.trim();
        const salary = parseInt(document.getElementById('jobSalary').value.trim()) || 0;

        if (title && description && category && contact && salary >= 0) {
            jobs.push({ title, description, category, contact, salary });
            localStorage.setItem('jobs', JSON.stringify(jobs));
            displayJobs();
            jobForm.reset();
            jobMessage.textContent = 'Job posted successfully!';
            jobMessage.className = 'form-message success';
            jobMessage.style.display = 'block';
            setTimeout(() => {
                jobMessage.style.display = 'none';
            }, 5000);
        } else {
            jobMessage.textContent = 'Please fill in all fields with valid values.';
            jobMessage.className = 'form-message error';
            jobMessage.style.display = 'block';
            setTimeout(() => {
                jobMessage.style.display = 'none';
            }, 5000);
        }
    });
}
// [Previous code remains unchanged until deleteBusiness function]

// Edit Business Modal
function openEditBusinessModal(index) {
    const modal = document.getElementById('editBusinessModal');
    const form = document.getElementById('editBusinessForm');
    const message = document.getElementById('editBusinessMessage');
    const business = businesses[index];

    if (modal && form && message) {
        document.getElementById('editBusinessId').value = index;
        document.getElementById('editBusinessName').value = business.name;
        document.getElementById('editBusinessDescription').value = business.description;
        document.getElementById('editBusinessCategory').value = business.category;
        document.getElementById('editBusinessContact').value = business.contact;

        modal.style.display = 'flex';
    }
}

function closeEditBusinessModal() {
    const modal = document.getElementById('editBusinessModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function deleteBusiness(index) {
    if (confirm('Are you sure you want to delete this business? This action cannot be undone.')) {
        businesses.splice(index, 1);
        localStorage.setItem('businesses', JSON.stringify(businesses));
        displayBusinesses();
        const businessMessage = document.getElementById('businessMessage');
        if (businessMessage) {
            businessMessage.textContent = 'Business deleted successfully!';
            businessMessage.className = 'form-message success';
            businessMessage.style.display = 'block';
            setTimeout(() => {
                businessMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Edit Job Modal
function openEditJobModal(index) {
    const modal = document.getElementById('editJobModal');
    const form = document.getElementById('editJobForm');
    const message = document.getElementById('editJobMessage');
    const job = jobs[index];

    if (modal && form && message) {
        document.getElementById('editJobId').value = index;
        document.getElementById('editJobTitle').value = job.title;
        document.getElementById('editJobDescription').value = job.description;
        document.getElementById('editJobCategory').value = job.category;
        document.getElementById('editJobContact').value = job.contact;
        document.getElementById('editJobSalary').value = job.salary || '';

        modal.style.display = 'flex';

        form.onsubmit = function(e) {
            e.preventDefault();
            const title = document.getElementById('editJobTitle').value.trim();
            const description = document.getElementById('editJobDescription').value.trim();
            const category = document.getElementById('editJobCategory').value;
            const contact = document.getElementById('editJobContact').value.trim();
            const salary = parseInt(document.getElementById('editJobSalary').value.trim()) || 0;

            if (title && description && category && contact && salary >= 0) {
                jobs[index] = { title, description, category, contact, salary };
                localStorage.setItem('jobs', JSON.stringify(jobs));
                displayJobs();
                modal.style.display = 'none';
                message.textContent = 'Job updated successfully!';
                message.className = 'form-message success';
                message.style.display = 'block';
                setTimeout(() => {
                    message.style.display = 'none';
                }, 5000);
            } else {
                message.textContent = 'Please fill in all fields with valid values.';
                message.className = 'form-message error';
                message.style.display = 'block';
                setTimeout(() => {
                    message.style.display = 'none';
                }, 5000);
            }
        };
    }
}

function closeEditJobModal() {
    const modal = document.getElementById('editJobModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function deleteJob(index) {
    if (confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
        jobs.splice(index, 1);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        displayJobs();
        const jobMessage = document.getElementById('jobMessage');
        if (jobMessage) {
            jobMessage.textContent = 'Job deleted successfully!';
            jobMessage.className = 'form-message success';
            jobMessage.style.display = 'block';
            setTimeout(() => {
                jobMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// [Rest of the code remains unchanged]

function closeEditJobModal() {
    const modal = document.getElementById('editJobModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function deleteJob(index) {
    jobs.splice(index, 1);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    displayJobs();
    const jobMessage = document.getElementById('jobMessage');
    if (jobMessage) {
        jobMessage.textContent = 'Job deleted successfully!';
        jobMessage.className = 'form-message success';
        jobMessage.style.display = 'block';
        setTimeout(() => {
            jobMessage.style.display = 'none';
        }, 5000);
    }
}

// Booking Modal
function openBookingModal(jobId, jobTitle) {
    const modal = document.getElementById('bookingModal');
    const titleElement = document.getElementById('bookingJobTitle');
    const jobIdInput = document.getElementById('bookingJobId');
    if (modal && titleElement && jobIdInput) {
        titleElement.textContent = sanitizeInput(jobTitle);
        jobIdInput.value = jobId;
        modal.style.display = 'flex';
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('bookingName').value.trim();
        const email = document.getElementById('bookingEmail').value.trim();
        const message = document.getElementById('bookingMessage').value.trim();
        const jobId = document.getElementById('bookingJobId').value;
        const jobTitle = document.getElementById('bookingJobTitle').textContent;

        if (name && email) {
            console.log(`Booking for Job: ${jobTitle} (ID: ${jobId}) by ${name} (${email}) - Message: ${message}`);
            bookingForm.reset();
            closeBookingModal();
            const bookingMessage = document.getElementById('bookingMessage');
            bookingMessage.textContent = 'Booking request submitted successfully!';
            bookingMessage.className = 'form-message success';
            bookingMessage.style.display = 'block';
            setTimeout(() => {
                bookingMessage.style.display = 'none';
            }, 5000);
        } else {
            const bookingMessage = document.getElementById('bookingMessage');
            bookingMessage.textContent = 'Please fill in all required fields.';
            bookingMessage.className = 'form-message error';
            bookingMessage.style.display = 'block';
            setTimeout(() => {
                bookingMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            console.log(`Contact Form: ${name} (${email}) - ${message}`);
            contactForm.reset();
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = 'Message sent successfully!';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value.trim();

        if (email) {
            console.log(`Newsletter Subscription: ${email}`);
            newsletterForm.reset();
            const newsletterMessage = document.getElementById('newsletterMessage');
            newsletterMessage.textContent = 'Subscribed successfully!';
            newsletterMessage.className = 'form-message success';
            newsletterMessage.style.display = 'block';
            setTimeout(() => {
                newsletterMessage.style.display = 'none';
            }, 5000);
        } else {
            const newsletterMessage = document.getElementById('newsletterMessage');
            newsletterMessage.textContent = 'Please enter a valid email.';
            newsletterMessage.className = 'form-message error';
            newsletterMessage.style.display = 'block';
            setTimeout(() => {
                newsletterMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Auth Check
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const businessForm = document.getElementById('businessForm');
    const jobForm = document.getElementById('jobForm');
    const loginPrompt = document.getElementById('loginPrompt');
    const jobLoginPrompt = document.getElementById('jobLoginPrompt');
    const signupNav = document.getElementById('signup-nav');
    const loginNav = document.getElementById('login-nav');
    const logoutNav = document.getElementById('logout-nav');

    if (isLoggedIn) {
        if (businessForm) businessForm.style.display = 'block';
        if (jobForm) jobForm.style.display = 'block';
        if (loginPrompt) loginPrompt.style.display = 'none';
        if (jobLoginPrompt) jobLoginPrompt.style.display = 'none';
        if (signupNav) signupNav.style.display = 'none';
        if (loginNav) loginNav.style.display = 'none';
        if (logoutNav) logoutNav.style.display = 'block';
    } else {
        if (businessForm) businessForm.style.display = 'none';
        if (jobForm) jobForm.style.display = 'none';
        if (loginPrompt) loginPrompt.style.display = 'block';
        if (jobLoginPrompt) jobLoginPrompt.style.display = 'block';
        if (signupNav) signupNav.style.display = 'block';
        if (loginNav) loginNav.style.display = 'block';
        if (logoutNav) logoutNav.style.display = 'none';
    }
}

function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    checkAuth();
    window.location.href = 'login.html';
}

// Ensure modals and theme are set on page load
document.addEventListener('DOMContentLoaded', function() {
    const editBusinessModal = document.getElementById('editBusinessModal');
    const editJobModal = document.getElementById('editJobModal');
    const bookingModal = document.getElementById('bookingModal');
    if (editBusinessModal) editBusinessModal.style.display = 'none';
    if (editJobModal) editJobModal.style.display = 'none';
    if (bookingModal) bookingModal.style.display = 'none';

    checkAuth();
    displayBusinesses();
    displayJobs();
});

// Add CSS for button group and theme icon transition
const style = document.createElement('style');
style.textContent = `
    .button-group {
        display: inline-block;
        margin-top: 10px;
    }
    .button-group button {
        margin-right: 8px;
    }
    .button-group .book-now-button {
        padding: 6px 12px;
        background-color: var(--button-bg);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.85rem;
        display: inline-block;
        vertical-align: middle;
    }
    .button-group .book-now-button:hover {
        background-color: var(--button-hover);
    }
    .salary {
        color: var(--section-title);
        margin: 0.5rem 0;
    }
    #theme-icon {
        transition: all 0.3s ease;
        font-size: 1.5rem;
        cursor: pointer;
    }
    #theme-icon.fa-sun {
        color: #f1c40f; /* Bright yellow for sun */
    }
    #theme-icon.fa-moon {
        color: #3498db; /* Soft blue for moon */
    }
`;
document.head.appendChild(style);
// [Previous theme toggle, hamburger menu, smooth scroll, back to top, testimonial carousel, gallery lightbox remain unchanged]

// Language Support
const translations = {
    en: {
        title: "Acme Business ",
        signup: { title: "Sign Up - Acme Business", header: "Sign Up", button: "Sign Up", loginPrompt: "Already have an account?", loginLink: "Login here" },
        login: { title: "Login - Business Directory", header: "Login", button: "Login", signupPrompt: "Don't have an account?", signupLink: "Sign up here" },
        nav: { home: "Home", about: "About", services: "Services", testimonials: "Testimonials", gallery: "Gallery", businesses: "Businesses", jobs: "Jobs", contact: "Contact", signup: "Sign Up", login: "Login", logout: "Logout", profile: "Profile" },
        hero: { title: "Welcome to Acme Business", subtitle: "Find businesses, services, and job opportunities near you!", cta: "Get Started" },
        about: { title: "About Us", description: "We connect people with local businesses and job opportunities. Whether you're looking for a service or a career, we've got you covered!" },
        services: { title: "Our Services", listing: "Business Listings", listingDesc: "List your business to reach more customers.", jobs: "Job Opportunities", jobsDesc: "Post or find jobs in your area.", support: "Community Support", supportDesc: "Connect with local professionals and resources." },
        testimonials: { title: "Testimonials", test1: '"This platform helped me find the perfect job in just a few days!"', author1: "- Boni Bolo", test2: '"Listing my business here brought in so many new customers."', author2: "- James Morris", test3: '"A great way to connect with local services and professionals."', author3: "- Promsie Hazel", prev: "⬅", next: "➡" },
        gallery: { title: "Gallery" },
        businesses: { title: "List Your Business", loginPrompt: "Please <a href='login.html'>log in</a> to list a business.", selectCategory: "Select Category", category: { retail: "Retail", service: "Service", tech: "Technology" }, add: "Add Business", allCategories: "All Categories" },
        jobs: { title: "Job Opportunities", loginPrompt: "Please <a href='login.html'>log in</a> to post a job.", selectCategory: "Select Category", category: { full: "Full-Time", part: "Part-Time", freelance: "Freelance" }, post: "Post Job", allCategories: "All Categories" },
        contact: { title: "Contact Us", send: "Send Message" },
        footer: { copyright: "© 2025 Business Directory. All rights reserved.", facebook: "Facebook", twitter: "Twitter", instagram: "Instagram", subscribe: "Subscribe" },
        modal: { editBusiness: "Edit Business", editJob: "Edit Job", applyFor: "Apply for Job: ", save: "Save", cancel: "Cancel", submit: "Submit Application", profile: "User Profile" }
    },
    es: {
        title: "Directorio Empresarial",
        signup: { title: "Registrarse - Directorio Empresarial", header: "Registrarse", button: "Registrarse", loginPrompt: "¿Ya tienes una cuenta?", loginLink: "Inicia sesión aquí" },
        login: { title: "Iniciar Sesión - Directorio Empresarial", header: "Iniciar Sesión", button: "Iniciar Sesión", signupPrompt: "¿No tienes una cuenta?", signupLink: "Regístrate aquí" },
        nav: { home: "Inicio", about: "Acerca de", services: "Servicios", testimonials: "Testimonios", gallery: "Galería", businesses: "Empresas", jobs: "Trabajos", contact: "Contacto", signup: "Registrarse", login: "Iniciar Sesión", logout: "Cerrar Sesión", profile: "Perfil" },
        hero: { title: "¡Bienvenido al Directorio Empresarial!", subtitle: "¡Encuentra empresas, servicios y oportunidades de trabajo cerca de ti!", cta: "Comenzar" },
        about: { title: "Acerca de Nosotros", description: "Conectamos a las personas con empresas locales y oportunidades laborales. ¡Ya sea que busques un servicio o una carrera, te tenemos cubierto!" },
        services: { title: "Nuestros Servicios", listing: "Listados de Empresas", listingDesc: "Lista tu empresa para llegar a más clientes.", jobs: "Oportunidades Laborales", jobsDesc: "Publica o encuentra trabajos en tu área.", support: "Soporte Comunitario", supportDesc: "Conéctate con profesionales y recursos locales." },
        testimonials: { title: "Testimonios", test1: '"¡Esta plataforma me ayudó a encontrar el trabajo perfecto en solo unos días!"', author1: "- Jane Doe", test2: '"Listar mi empresa aquí atrajo a muchos nuevos clientes."', author2: "- John Smith", test3: '"Una gran manera de conectar con servicios y profesionales locales."', author3: "- Emily Johnson", prev: "Anterior", next: "Siguiente" },
        gallery: { title: "Galería" },
        businesses: { title: "Lista Tu Empresa", loginPrompt: "Por favor <a href='login.html'>inicia sesión</a> para listar una empresa.", selectCategory: "Seleccionar Categoría", category: { retail: "Comercio", service: "Servicio", tech: "Tecnología" }, add: "Añadir Empresa", allCategories: "Todas las Categorías" },
        jobs: { title: "Oportunidades Laborales", loginPrompt: "Por favor <a href='login.html'>inicia sesión</a> para publicar un trabajo.", selectCategory: "Seleccionar Categoría", category: { full: "Tiempo Completo", part: "Medio Tiempo", freelance: "Freelance" }, post: "Publicar Trabajo", allCategories: "Todas las Categorías" },
        contact: { title: "Contáctanos", send: "Enviar Mensaje" },
        footer: { copyright: "© 2025 Directorio Empresarial. Todos los derechos reservados.", facebook: "Facebook", twitter: "Twitter", instagram: "Instagram", subscribe: "Suscribirse" },
        modal: { editBusiness: "Editar Empresa", editJob: "Editar Trabajo", applyFor: "Solicitar Trabajo: ", save: "Guardar", cancel: "Cancelar", submit: "Enviar Solicitud", profile: "Perfil de Usuario" }
    },
    sw: {
    "title": "Biashara ya Acme",
    "signup": {
        "title": "Jisajili - Biashara ya Acme",
        "header": "Jisajili",
        "button": "Jisajili",
        "loginPrompt": "Je, una akaunti tayari?",
        "loginLink": "Ingia hapa"
    },
    "login": {
        "title": "Ingia - Saraka ya Biashara",
        "header": "Ingia",
        "button": "Ingia",
        "signupPrompt": "Je, huna akaunti?",
        "signupLink": "Jisajili hapa"
    },
    "nav": {
        "home": "Nyumbani",
        "about": "Kuhusu",
        "services": "Huduma",
        "testimonials": "Heshima",
        "gallery": "Matangazo",
        "businesses": "Biashara",
        "jobs": "Kazi",
        "contact": "Wasiliana",
        "signup": "Jisajili",
        "login": "Ingia",
        "logout": "Toka",
        "profile": "Profaili"
    },
    "hero": {
        "title": "Karibu katika Biashara ya Acme",
        "subtitle": "Pata biashara, huduma, na fursa za kazi karibu nawe!",
        "cta": "Anza"
    },
    "about": {
        "title": "Kuhusu Sisi",
        "description": "Tunawasilisha watu na biashara za ndani na fursa za kazi. Iwe unatafuta huduma au kazi, tumekujia!"
    },
    "services": {
        "title": "Huduma Zetu",
        "listing": "Orodha za Biashara",
        "listingDesc": "Orisha biashara yako ili kufikia wateja wengi zaidi.",
        "jobs": "Fursa za Kazi",
        "jobsDesc": "Chapisha au pata kazi katika eneo lako.",
        "support": "Msaada wa Jamii",
        "supportDesc": "Ungana na wataalamu wa ndani na rasilimali."
    },
    "testimonials": {
        "title": "Heshima",
        "test1": '"Jukwaa hili lininisaidia kupata kazi bora kwa siku chache tu!"',
        "author1": "- Boni Bolo",
        "test2": '"Kuorodhesha biashara yangu hapa kumetuletea wateja wengi wapya."',
        "author2": "- James Morris",
        "test3": '"Njia nzuri ya kuungana na huduma za ndani na wataalamu."',
        "author3": "- Promsie Hazel",
        "prev": "Ya Awali",
        "next": "Inayofuata"
    },
    "gallery": {
        "title": "Matangazo"
    },
    "businesses": {
        "title": "Orisha Biashara Yako",
        "loginPrompt": "Tafadhali <a href='login.html'>ingia</a> ili kuorodhesha biashara.",
        "selectCategory": "Chagua Jamii",
        "category": {
            "retail": "Rejareja",
            "service": "Huduma",
            "tech": "Teknolojia"
        },
        "add": "Ongeza Biashara",
        "allCategories": "Jamii Zote"
    },
    "jobs": {
        "title": "Fursa za Kazi",
        "loginPrompt": "Tafadhali <a href='login.html'>ingia</a> ili kuchapisha kazi.",
        "selectCategory": "Chagua Jamii",
        "category": {
            "full": "Muda Mzima",
            "part": "Muda wa Nusu",
            "freelance": "Kazi ya Kujitegemea"
        },
        "post": "Chapisha Kazi",
        "allCategories": "Jamii Zote"
    },
    "contact": {
        "title": "Wasiliana Nasi",
        "send": "Tuma Ujumbe"
    },
    "footer": {
        "copyright": "© 2025 Saraka ya Biashara. Haki zote zimehifadhiwa.",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "instagram": "Instagram",
        "subscribe": "Jisajili"
    },
    "modal": {
        "editBusiness": "Hariri Biashara",
        "editJob": "Hariri Kazi",
        "applyFor": "Omba Kazi: ",
        "save": "Hifadhi",
        "cancel": "Futa",
        "submit": "Wasilisha Maombi",
        "profile": "Profaili ya Mtumiaji"
    }
},
fr: {
    "title": "Acme Business",
    "signup": {
        "title": "Inscription - Acme Business",
        "header": "Inscription",
        "button": "S'inscrire",
        "loginPrompt": "Vous avez déjà un compte ?",
        "loginLink": "Connectez-vous ici"
    },
    "login": {
        "title": "Connexion - Répertoire d'Entreprises",
        "header": "Connexion",
        "button": "Se connecter",
        "signupPrompt": "Vous n'avez pas de compte ?",
        "signupLink": "Inscrivez-vous ici"
    },
    "nav": {
        "home": "Accueil",
        "about": "À propos",
        "services": "Services",
        "testimonials": "Témoignages",
        "gallery": "Galerie",
        "businesses": "Entreprises",
        "jobs": "Emplois",
        "contact": "Contact",
        "signup": "S'inscrire",
        "login": "Connexion",
        "logout": "Déconnexion",
        "profile": "Profil"
    },
    "hero": {
        "title": "Bienvenue chez Acme Business",
        "subtitle": "Trouvez des entreprises, des services et des opportunités d'emploi près de chez vous !",
        "cta": "Commencer"
    },
    "about": {
        "title": "À propos de nous",
        "description": "Nous connectons les gens avec des entreprises locales et des opportunités d'emploi. Que vous cherchiez un service ou une carrière, nous sommes là pour vous !"
    },
    "services": {
        "title": "Nos Services",
        "listing": "Listes d'Entreprises",
        "listingDesc": "Inscrivez votre entreprise pour atteindre plus de clients.",
        "jobs": "Opportunités d'Emploi",
        "jobsDesc": "Publiez ou trouvez des emplois dans votre région.",
        "support": "Soutien Communautaire",
        "supportDesc": "Connectez-vous avec des professionnels locaux et des ressources."
    },
    "testimonials": {
        "title": "Témoignages",
        "test1": "\"Cette plateforme m'a aidé à trouver l'emploi parfait en seulement quelques jours !\"",
        "author1": "- Boni Bolo",
        "test2": "\"Lister mon entreprise ici a attiré beaucoup de nouveaux clients.\"",
        "author2": "- James Morris",
        "test3": "\"Un excellent moyen de se connecter avec des services locaux et des professionnels.\"",
        "author3": "- Promsie Hazel",
        "prev": "Précédent",
        "next": "Suivant"
    },
    "gallery": {
        "title": "Galerie"
    },
    "businesses": {
        "title": "Listez Votre Entreprise",
        "loginPrompt": "Veuillez <a href='login.html'>vous connecter</a> pour lister une entreprise.",
        "selectCategory": "Sélectionner une Catégorie",
        "category": {
            "retail": "Commerce de détail",
            "service": "Service",
            "tech": "Technologie"
        },
        "add": "Ajouter une Entreprise",
        "allCategories": "Toutes les Catégories"
    },
    "jobs": {
        "title": "Opportunités d'Emploi",
        "loginPrompt": "Veuillez <a href='login.html'>vous connecter</a> pour publier une offre d'emploi.",
        "selectCategory": "Sélectionner une Catégorie",
        "category": {
            "full": "Temps Plein",
            "part": "Temps Partiel",
            "freelance": "Indépendant"
        },
        "post": "Publier une Offre d'Emploi",
        "allCategories": "Toutes les Catégories"
    },
    "contact": {
        "title": "Nous Contacter",
        "send": "Envoyer le Message"
    },
    "footer": {
        "copyright": "© 2025 Répertoire d'Entreprises. Tous droits réservés.",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "instagram": "Instagram",
        "subscribe": "S'abonner"
    },
    "modal": {
        "editBusiness": "Modifier l'Entreprise",
        "editJob": "Modifier l'Emploi",
        "applyFor": "Postuler pour l'Emploi : ",
        "save": "Enregistrer",
        "cancel": "Annuler",
        "submit": "Soumettre la Candidature",
        "profile": "Profil Utilisateur"
    }
}
};


let currentLanguage = localStorage.getItem('language') || 'en';

function changeLanguage() {
    const lang = document.getElementById('languageSelect').value;
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateTranslations();
}

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        let translation = translations[currentLanguage];
        key.split('.').forEach(k => translation = translation[k]);
        if (typeof translation === 'string') {
            element.textContent = translation;
        } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else if (element.tagName === 'OPTION') {
            element.text = translation;
        }
    });
    // Handle HTML links within translated text
    document.querySelectorAll('.form-message a').forEach(a => {
        if (a.parentElement.textContent.includes('log in')) a.href = 'login.html';
    });
}

document.addEventListener('DOMContentLoaded', updateTranslations);

// [Previous sanitizeInput, signupForm, loginForm, businessForm, jobForm, displayBusinesses, displayJobs remain unchanged]

// Filter Functions
function filterBusinesses() {
    const searchTerm = document.getElementById('businessSearchInput').value.toLowerCase();
    const category = document.getElementById('businessFilterCategory').value;
    const filteredBusinesses = businesses.filter(business => {
        const matchesSearch = business.name.toLowerCase().includes(searchTerm) || business.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || business.category === category;
        return matchesSearch && matchesCategory;
    });
    const businessList = document.getElementById('businessList');
    if (businessList) {
        businessList.innerHTML = '';
        filteredBusinesses.forEach((business, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${sanitizeInput(business.name)}</h3>
                <p>${sanitizeInput(business.description)}</p>
                <p class="category">Category: ${sanitizeInput(business.category)}</p>
                <p class="contact">Contact: ${sanitizeInput(business.contact)}</p>
                <div class="button-group">
                    <button class="action-button edit-button" onclick="openEditBusinessModal(${index}); return false;">Edit</button>
                    <button class="action-button delete-button" onclick="deleteBusiness(${index}); return false;">Delete</button>
                </div>
            `;
            businessList.appendChild(li);
        });
    }
}

function filterJobs() {
    const searchTerm = document.getElementById('jobSearchInput').value.toLowerCase();
    const category = document.getElementById('jobFilterCategory').value;
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) || job.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || job.category === category;
        return matchesSearch && matchesCategory;
    });
    const jobList = document.getElementById('jobList');
    if (jobList) {
        jobList.innerHTML = '';
        filteredJobs.forEach((job, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${sanitizeInput(job.title)}</h3>
                <p>${sanitizeInput(job.description)}</p>
                <p class="category">Category: ${sanitizeInput(job.category)}</p>
                <p class="contact">Contact: ${sanitizeInput(job.contact)}</p>
                <p class="salary">Salary: $${sanitizeInput(job.salary || 'N/A')}</p>
                <div class="button-group">
                    <button class="action-button edit-button" onclick="openEditJobModal(${index}); return false;">Edit</button>
                    <button class="action-button delete-button" onclick="deleteJob(${index}); return false;">Delete</button>
                    <button class="apply-button" onclick="openApplicationModal(${index}, '${sanitizeInput(job.title)}'); return false;">Apply</button>
                </div>
            `;
            jobList.appendChild(li);
        });
    }
}
// Profile Modal
function openProfileModal() {
    const modal = document.getElementById('profileModal');
    const form = document.getElementById('profileForm');
    const message = document.getElementById('profileMessage');
    const user = JSON.parse(localStorage.getItem('users'))?.find(u => u.email === JSON.parse(localStorage.getItem('currentUser'))?.email);

    if (modal && form && message && user) {
        document.getElementById('profileName').value = user.name;
        modal.style.display = 'flex';

        form.onsubmit = function(e) {
            e.preventDefault();
            const name = document.getElementById('profileName').value.trim();
            if (name) {
                user.name = name;
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const updatedUsers = users.map(u => u.email === user.email ? user : u);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                localStorage.setItem('currentUser', JSON.stringify(user));
                modal.style.display = 'none';
                message.textContent = translations[currentLanguage].modal.success;
                message.className = 'form-message success';
                message.style.display = 'block';
                setTimeout(() => {
                    message.style.display = 'none';
                }, 2000);
            } else {
                message.textContent = translations[currentLanguage].modal.error;
                message.className = 'form-message error';
                message.style.display = 'block';
                setTimeout(() => {
                    message.style.display = 'none';
                }, 2000);
            }
        };
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// [Previous contactForm, newsletterForm, checkAuth, logout, DOMContentLoaded remain unchanged]

// Update auth check to set current user and show profile
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const businessForm = document.getElementById('businessForm');
    const jobForm = document.getElementById('jobForm');
    const loginPrompt = document.getElementById('loginPrompt');
    const jobLoginPrompt = document.getElementById('jobLoginPrompt');
    const signupNav = document.getElementById('signup-nav');
    const loginNav = document.getElementById('login-nav');
    const logoutNav = document.getElementById('logout-nav');
    const profileNav = document.getElementById('profile-nav');

    if (isLoggedIn) {
        if (businessForm) businessForm.style.display = 'block';
        if (jobForm) jobForm.style.display = 'block';
        if (loginPrompt) loginPrompt.style.display = 'none';
        if (jobLoginPrompt) jobLoginPrompt.style.display = 'none';
        if (signupNav) signupNav.style.display = 'none';
        if (loginNav) loginNav.style.display = 'none';
        if (logoutNav) logoutNav.style.display = 'block';
        if (profileNav) profileNav.style.display = 'block';
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const email = document.getElementById('loginEmail')?.value || localStorage.getItem('lastLoggedInEmail');
        const user = users.find(u => u.email === email);
        if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        if (businessForm) businessForm.style.display = 'none';
        if (jobForm) jobForm.style.display = 'none';
        if (loginPrompt) loginPrompt.style.display = 'block';
        if (jobLoginPrompt) jobLoginPrompt.style.display = 'block';
        if (signupNav) signupNav.style.display = 'block';
        if (loginNav) loginNav.style.display = 'block';
        if (logoutNav) logoutNav.style.display = 'none';
        if (profileNav) profileNav.style.display = 'none';
    }
}

// Update loginForm to store last logged-in email
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const loginMessage = document.getElementById('loginMessage');

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('lastLoggedInEmail', email);
            loginMessage.textContent = translations[currentLanguage].login.success || 'Login successful! Redirecting...';
            loginMessage.className = 'form-message success';
            loginMessage.style.display = 'block';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            loginMessage.textContent = translations[currentLanguage].login.error || 'Invalid email or password.';
            loginMessage.className = 'form-message error';
            loginMessage.style.display = 'block';
            setTimeout(() => {
                loginMessage.style.display = 'none';
            }, 2000);
        }
    });
}

// [Previous style injection remains unchanged]