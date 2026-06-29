// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Contact form — opens user's email client with a prefilled message.
// (Easy to swap for a Cloudflare Pages Function or Formspree endpoint later.)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const RECIPIENT = 'wyattmorgan11@outlook.com';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.className = 'form-note';
  note.textContent = '';

  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const company = (data.get('company') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();

  if (!name || !email || !message) {
    note.classList.add('error');
    note.textContent = 'Please fill out name, email, and a short message.';
    return;
  }

  const subject = `New project inquiry from ${name}`;
  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    (company ? `Company: ${company}\n` : '') +
    `\n${message}\n`;

  const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  note.classList.add('success');
  note.textContent = "Opening your email client… if nothing happens, email " + RECIPIENT + " directly.";
});
