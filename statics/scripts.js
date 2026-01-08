/*
 * csz Portfolio
 * Minimal JS - modal and smooth scroll
 */

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Resume Modal
const resumeEmbed = document.querySelector('.resume-embed');
const modal = document.getElementById('resumeModal');
const modalClose = document.getElementById('modalClose');

if (resumeEmbed && modal) {
    // Open modal on click
    resumeEmbed.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal on button click
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal on overlay click (outside content)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
