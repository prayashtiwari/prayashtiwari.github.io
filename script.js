//POP-UP SCRIPT
(function () {
const overlay = document.getElementById('prealphaModalOverlay');
const okBtn = document.getElementById('prealphaOkBtn');

// show on load (only once per browser via localStorage)
const key = 'prealphaModalSeen';
const alreadySeen = localStorage.getItem(key) === '1';

function openModal() {
overlay.classList.add('is-open');
overlay.setAttribute('aria-hidden', 'false');
okBtn.focus();
}

function closeModal() {
overlay.classList.remove('is-open');
overlay.setAttribute('aria-hidden', 'true');
localStorage.setItem(key, '1');
}

okBtn.addEventListener('click', closeModal);

// close when clicking outside the dialog
overlay.addEventListener('click', (e) => {
if (e.target === overlay) closeModal();
});

// close on Escape
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
});

window.addEventListener('load', () => {
if (!alreadySeen) openModal();
});
})();

// Smooth scrolling for navigation links
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.8)';
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('section:not(.hero)').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(section);
});

// Animate skill progress bars when they come into view
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector('.skill-progress');
      if (progressBar) {
        const width = progressBar.style.width;
        progressBar.style.width = '0';
        setTimeout(() => {
          progressBar.style.width = width;
        }, 100);
      }
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
  skillObserver.observe(card);
});

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink();

// Typing effect for hero greeting (optional enhancement)
const heroGreeting = document.querySelector('.hero-greeting');
if (heroGreeting) {
  const text = heroGreeting.textContent;
  heroGreeting.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      heroGreeting.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  
  // Start typing effect after page load
  setTimeout(typeWriter, 500);
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });
}

// Add cursor trail effect (optional - can be disabled)
const createCursorTrail = () => {
  let dots = [];
  const maxDots = 10;
  
  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.left = e.pageX + 'px';
      dot.style.top = e.pageY + 'px';
      document.body.appendChild(dot);
      
      dots.push(dot);
      
      if (dots.length > maxDots) {
        const oldDot = dots.shift();
        oldDot.remove();
      }
      
      setTimeout(() => {
        dot.style.opacity = '0';
        setTimeout(() => dot.remove(), 300);
      }, 100);
    }
  });
};

// Uncomment to enable cursor trail
// createCursorTrail();

// Console message for visitors
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #94a3b8;');
console.log('%cFeel free to reach out if you want to collaborate!', 'font-size: 14px; color: #94a3b8;');

// Handle external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.setAttribute('rel', 'noopener noreferrer');
});

// Performance optimization - lazy load images if any are added
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add loading state
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    console.log('%c🎉 Konami Code Activated! You found the easter egg!', 'font-size: 24px; font-weight: bold; color: #ec4899;');
    document.body.style.animation = 'rainbow 2s infinite';
  }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a, button, input, textarea, select').forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid #6366f1';
      element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
      element.style.outline = '';
      element.style.outlineOffset = '';
    });
  });
});
