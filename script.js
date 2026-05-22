const typedPhrases = [
  'AI-powered experiences',
  'futuristic chatbot systems',
  'intelligent automation',
  'robotics & Gen AI'
];
const typedText = document.getElementById('typed-text');
let typeIndex = 0;
let charIndex = 0;
let typingForward = true;

function updateTyping() {
  const current = typedPhrases[typeIndex];
  if (typingForward) {
    typedText.textContent = current.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === current.length) {
      typingForward = false;
      setTimeout(updateTyping, 1300);
      return;
    }
  } else {
    typedText.textContent = current.slice(0, charIndex - 1);
    charIndex -= 1;
    if (charIndex === 0) {
      typingForward = true;
      typeIndex = (typeIndex + 1) % typedPhrases.length;
    }
  }
  setTimeout(updateTyping, typingForward ? 120 : 45);
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  observer.observe(el);
});

const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .contact-form input, .contact-form textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 2.5 + 0.5;
    this.alpha = Math.random() * 0.35 + 0.18;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.fillStyle = `rgba(31, 240, 201, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  particles = Array.from({ length: Math.floor(window.innerWidth / 18) }, () => new Particle());
}

function renderParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(renderParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

window.addEventListener('load', () => {
  resizeCanvas();
  createParticles();
  renderParticles();
  updateTyping();
  document.getElementById('preloader').style.opacity = '0';
  setTimeout(() => document.getElementById('preloader').style.display = 'none', 800);
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('button');
    submitButton.textContent = 'Sending...';
    setTimeout(() => {
      submitButton.textContent = 'Send Message';
      alert('Message sent to Karthikasri!');
      contactForm.reset();
    }, 900);
  });
}
