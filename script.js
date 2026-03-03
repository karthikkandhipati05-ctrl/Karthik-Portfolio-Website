const roles = [
  'Senior Data Analyst',
  'BI & Dashboard Expert',
  'ML & Python Engineer',
  'Cloud Analytics Architect'
];

const projects = [
  {
    title: 'Healthcare Operations Intelligence Dashboard',
    company: 'Cleveland Clinic',
    description: 'Built a unified Power BI executive dashboard consolidating inpatient, ambulatory, and call center KPIs into a single source of truth. Integrated EHR, scheduling, and claims data through SQL data marts built with CTEs and window functions, enabling real-time visibility into capacity, staffing productivity, and service-line performance.',
    impact: '↑ 27% Decision Speed | ↓ 33% Metric Disputes',
    stack: ['Power BI', 'SQL', 'Azure Databricks', 'ADLS', 'ADF', 'Python']
  },
  {
    title: 'Credit Risk & Portfolio Analytics Platform',
    company: 'JPMorgan Chase',
    description: 'Engineered an end-to-end credit risk analytics platform on AWS using Python, S3, Glue, and EMR to consolidate card, deposit, and lending portfolio metrics. Applied ML clustering to segment customers and built delinquency roll-rate models to support proactive risk management.',
    impact: '99% Data Availability | ↓ 35% Processing Latency',
    stack: ['Python', 'AWS S3', 'Glue', 'EMR', 'SQL', 'Scikit-learn', 'Power BI']
  },
  {
    title: 'Patient Feedback NLP Analytics Engine',
    company: 'Cleveland Clinic',
    description: 'Designed an NLP pipeline using spaCy and BERTopic to automatically categorize thousands of patient feedback entries and service recovery notes into actionable themes. Enabled clinical operations teams to identify complaint drivers and prioritize service improvements at scale.',
    impact: '↑ 42% Root-Cause Discovery Speed | ↓ 10% Complaints',
    stack: ['Python', 'spaCy', 'BERTopic', 'NLTK', 'Hugging Face', 'Azure']
  },
  {
    title: 'Financial Fraud & Anomaly Detection System',
    company: 'JPMorgan Chase',
    description: 'Built an AI-driven anomaly detection system using TensorFlow and SQL to flag abnormal balance movements, unusual payment patterns, and transaction irregularities across enterprise portfolio feeds. Integrated with governance workflows to generate audit-ready evidence for SOX and CCAR compliance.',
    impact: '$2M+ Losses Prevented | ↓ 24% Manual Surveillance',
    stack: ['TensorFlow', 'Python', 'SQL', 'Power BI', 'AWS', 'SOX/CCAR']
  }
];

const typeEl = document.getElementById('typewriter');
let roleIndex = 0, charIndex = 0, deleting = false;
function typeLoop() {
  const word = roles[roleIndex];
  typeEl.textContent = deleting ? word.slice(0, --charIndex) : word.slice(0, ++charIndex);
  let delay = deleting ? 45 : 90;
  if (!deleting && charIndex === word.length) { deleting = true; delay = 2000; }
  if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300; }
  setTimeout(typeLoop, delay);
}
typeLoop();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .skill-card, .project-card, .timeline-item').forEach(el => revealObserver.observe(el));

const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { threshold: 0.55 });
document.querySelectorAll('main section').forEach(sec => sectionObserver.observe(sec));

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(hamburger.classList.contains('open')));
});
navLinks.forEach(link => link.addEventListener('click', () => { hamburger.classList.remove('open'); navMenu.classList.remove('open'); }));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = anchor.getAttribute('href');
    if (target.length > 1) {
      e.preventDefault();
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('show', window.scrollY > 300);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

let countersAnimated = false;
const stats = document.getElementById('stats');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      document.querySelectorAll('.counter').forEach(counter => {
        const target = Number(counter.dataset.target);
        const start = performance.now();
        const dur = 2000;
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          counter.textContent = Math.floor(target * eased);
          if (p < 1) requestAnimationFrame(tick);
          else counter.textContent = target;
        };
        requestAnimationFrame(tick);
      });
    }
  });
}, { threshold: 0.35 });
counterObserver.observe(stats);

const gpaBar = document.getElementById('gpa-bar');
const gpaObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) gpaBar.style.width = '97.5%';
  });
}, { threshold: 0.4 });
gpaObserver.observe(gpaBar);

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalCompany = document.getElementById('modal-company');
const modalDescription = document.getElementById('modal-description');
const modalImpact = document.getElementById('modal-impact');
const modalStack = document.getElementById('modal-stack');

function openModal(project) {
  modalTitle.textContent = project.title;
  modalCompany.textContent = project.company;
  modalDescription.textContent = project.description;
  modalImpact.textContent = project.impact;
  modalStack.innerHTML = project.stack.map(item => `<span>${item}</span>`).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
document.querySelectorAll('.project-card').forEach((card, idx) => {
  card.querySelector('.details-btn').addEventListener('click', () => openModal(projects[idx]));
});

document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');
form.addEventListener('submit', () => {
  success.textContent = 'Thanks! Your message is on its way 🚀';
  setTimeout(() => form.reset(), 50);
});
