// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Optional: observer.unobserve(entry.target); 
            // if we only want it to animate once.
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

hiddenElements.forEach((el) => observer.observe(el));

// Magnetic Button Effect (Subtle interaction design)
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;

        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseout', () => {
        btn.style.transform = `translate(0px, 0px)`;
        btn.style.transition = `transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)`;
    });

    btn.addEventListener('mouseenter', () => {
        btn.style.transition = `none`;
    });
});

// Run initial hero animation on load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('hero').classList.add('show');
    }, 100);
});
