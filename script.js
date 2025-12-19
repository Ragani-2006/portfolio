// ✅ Smooth Scroll for Navbar Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ✅ Fade-In Animation for About Section
const aboutCard = document.querySelector('.about-card');
window.addEventListener('scroll', () => {
    const rect = aboutCard.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        aboutCard.classList.add('visible');
    }
});

// ✅ Modal for Project Details
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.view-btn[data-img]').forEach(button => {
    button.addEventListener('click', () => {
        modalImg.src = button.getAttribute('data-img');
        modalTitle.textContent = button.getAttribute('data-title');
        modalDesc.textContent = button.getAttribute('data-desc');
        modal.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ✅ Contact Form Submission with Formspree
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        formStatus.style.display = 'block';
        formStatus.textContent = '⏳ Sending...';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://formspree.io/f/xnnzplqw', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                formStatus.textContent = '✅ Message sent successfully!';
                formStatus.style.color = '#4CAF50';
                contactForm.reset();
            } else {
                formStatus.textContent = '❌ Failed to send message. Try again later.';
                formStatus.style.color = '#ff4ecd';
            }
        } catch (error) {
            formStatus.textContent = '⚠ Something went wrong!';
            formStatus.style.color = '#ff4ecd';
            console.error(error);
        }
    });
}
