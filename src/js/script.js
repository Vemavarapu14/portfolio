// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Skills Section Animation - Trigger when skills section is in viewport
const animateSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
        // Add animation classes to skill cards
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * index); // Stagger the animations
        });
    }
};

// Initial check on load
animateSkills();

// Check when scrolling
window.addEventListener('scroll', animateSkills);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add fade-in effect to elements
            if (entry.target.classList.contains('education-item') || 
                entry.target.classList.contains('experience-item') || 
                entry.target.classList.contains('project-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe elements that should animate when scrolled into view
document.querySelectorAll('.education-item, .experience-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation styles for profile elements
const profileImg = document.querySelector('.profile-img img');
if (profileImg) {
    profileImg.style.opacity = '0';
    profileImg.style.transform = 'scale(0.8)';
    profileImg.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
}

const profileInfo = document.querySelector('.profile-info');
if (profileInfo) {
    profileInfo.style.opacity = '0';
    profileInfo.style.transform = 'translateY(30px)';
    profileInfo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
}

// Add active class to navigation links when scrolling to sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// About section animation
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate profile image
                const profileImg = entry.target.querySelector('.profile-img img');
                if (profileImg) {
                    profileImg.style.opacity = '1';
                    profileImg.style.transform = 'scale(1)';
                }
                
                // Animate profile info
                const profileInfo = entry.target.querySelector('.profile-info');
                if (profileInfo) {
                    profileInfo.style.opacity = '1';
                    profileInfo.style.transform = 'translateY(0)';
                }
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(aboutSection);
}

// CTA Button functionality
const ctaButton = document.querySelector('.cta-btn');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        // Scroll to about section when CTA button is clicked
        e.preventDefault();
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            window.scrollTo({
                top: aboutSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}

// Project Card Hover Effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});