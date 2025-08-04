// buildshift.dev - Elegant & Professional JavaScript
// Sophisticated animations inspired by _samples

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTaglineCycling();
    initSkillBars();
    initScrollEffects();
    initMobileMenu();
    fixSafariBrackets();
});

// Safari iOS bracket fix
function fixSafariBrackets() {
    // Detect Safari iOS
    const isSafariIOS = /Safari/.test(navigator.userAgent) && /iPhone|iPad/.test(navigator.userAgent);
    
    if (isSafariIOS) {
        const brackets = document.querySelectorAll('.brackets');
        brackets.forEach(bracket => {
            // Fix visibility without affecting positioning
            bracket.style.color = '#06b6d4';
            bracket.style.webkitTextFillColor = '#06b6d4';
            bracket.style.background = 'none';
            bracket.style.webkitBackgroundClip = 'initial';
            bracket.style.backgroundClip = 'initial';
            bracket.style.animation = 'none';
            bracket.style.webkitAnimation = 'none';
            bracket.style.display = 'inline';
            bracket.style.position = 'static';
            bracket.style.verticalAlign = 'baseline';
            bracket.style.transform = 'none';
            bracket.style.webkitTransform = 'none';
        });
    }
}

// Navigation scroll effects
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderBottomColor = 'rgba(59, 130, 246, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
        }
    });
}

// Elegant tagline cycling
function initTaglineCycling() {
    const taglines = document.querySelectorAll('.tagline');
    if (taglines.length === 0) return;
    
    let currentIndex = 0;
    
    function cycleTaglines() {
        // Fade out current
        taglines[currentIndex].classList.remove('active');
        
        // Move to next
        currentIndex = (currentIndex + 1) % taglines.length;
        
        // Fade in next with delay for smooth transition
        setTimeout(() => {
            taglines[currentIndex].classList.add('active');
        }, 200);
    }
    
    // Cycle every 4 seconds for elegant pacing
    setInterval(cycleTaglines, 4000);
    
    // Initialize first tagline
    taglines[0].classList.add('active');
}

// Skill bar animations with intersection observer
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const skill = bar.getAttribute('data-skill');
                
                // Elegant delay before animation
                setTimeout(() => {
                    bar.style.width = skill + '%';
                }, 600);
                
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Sophisticated scroll effects
function initScrollEffects() {
    // Parallax for floating shapes
    const shapes = document.querySelectorAll('.shape');
    const profileGlow = document.querySelector('.profile-glow');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Gentle shape movement
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
        
        // Profile glow rotation
        if (profileGlow) {
            profileGlow.style.transform = `rotate(${scrolled * 0.1}deg)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Intersection observer for entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const entranceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entranceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply to key elements
    const animatedElements = document.querySelectorAll(`
        .section-title, 
        .project-card, 
        .blog-card, 
        .skill-item,
        .about-text,
        .skills-preview
    `);
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        entranceObserver.observe(element);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced button interactions
document.querySelectorAll('.btn, .project-link, .social-link').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = this.style.transform.replace('translateY(-3px)', '') + ' translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = this.style.transform.replace(' translateY(-3px)', '');
    });
});

// Elegant page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Stagger hero element animations
    const heroElements = [
        '.logo-main',
        '.tagline-cycle', 
        '.hero-description',
        '.hero-buttons',
        '.social-links',
        '.profile-container'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        }
    });
});

// Performance optimizations
// Debounce scroll events
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

// Optimize scroll listeners
const optimizedScrollHandler = debounce(() => {
    // Additional scroll optimizations can go here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

