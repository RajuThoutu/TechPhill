const root = document.documentElement;
const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.site-nav__list');
const themeToggle = document.getElementById('theme-toggle');
const yearSpans = document.querySelectorAll('[data-year]');

const THEME_KEY = 'techphilosophers-theme';

const applyTheme = (theme, persist = true) => {
  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  root.setAttribute('data-theme', nextTheme);
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Activate light mode' : 'Activate dark mode');
  }
  if (persist) {
    localStorage.setItem(THEME_KEY, nextTheme);
  }
};

const preferredTheme = () => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

applyTheme(preferredTheme(), false);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

if (navToggle && navList) {
  const closeNav = () => {
    navList.classList.remove('is-open');
    body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    body.classList.toggle('menu-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navList.classList.contains('is-open')) {
      closeNav();
      navToggle.focus();
    }
  });
}

yearSpans.forEach((span) => {
  span.textContent = new Date().getFullYear();
});

// Newsletter feedback
const newsletterForm = document.querySelector('.newsletter__form');
if (newsletterForm) {
  const feedback = newsletterForm.querySelector('.newsletter__feedback');
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (feedback) {
      feedback.textContent = 'Thanks for subscribing — wisdom is on its way.';
    }
    newsletterForm.reset();
  });
}

// Contact form feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const feedback = contactForm.querySelector('.form-feedback');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (feedback) {
      feedback.textContent = 'Message received. I will respond with thoughtful clarity soon.';
    }
    contactForm.reset();
  });
}

// Insights filtering system
const insightSearchInput = document.getElementById('insight-search');
const insightItems = Array.from(document.querySelectorAll('.insight-item'));
const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
const resetButton = document.querySelector('[data-reset]');
const insightCount = document.getElementById('insight-count');

const activeFilters = new Set();

const normalise = (value) => value.toLowerCase();

const updateCount = (visibleItems) => {
  if (!insightCount) return;
  const total = insightItems.length;
  const visible = visibleItems.length;
  if (visible === total) {
    insightCount.textContent = 'All entries';
  } else {
    insightCount.textContent = `${visible} of ${total}`;
  }
};

const applyInsightFilters = () => {
  const query = insightSearchInput ? normalise(insightSearchInput.value.trim()) : '';
  const visibleItems = [];

  insightItems.forEach((item) => {
    const tokens = normalise(item.dataset.tags || '').split(/\s+/).filter(Boolean);
    const text = normalise(item.textContent || '');

    const matchesSearch = !query || text.includes(query);
    const matchesFilters = !activeFilters.size || Array.from(activeFilters).every((filter) => tokens.includes(filter));

    const shouldShow = matchesSearch && matchesFilters;
    item.hidden = !shouldShow;
    if (shouldShow) {
      visibleItems.push(item);
    }
  });

  updateCount(visibleItems);
};

filterButtons.forEach((button) => {
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => {
    const key = normalise(button.dataset.filter || '');
    if (!key) return;
    const isActive = activeFilters.has(key);
    if (isActive) {
      activeFilters.delete(key);
    } else {
      activeFilters.add(key);
    }
    button.classList.toggle('is-active', !isActive);
    button.setAttribute('aria-pressed', String(!isActive));
    applyInsightFilters();
  });
});

if (insightSearchInput) {
  insightSearchInput.addEventListener('input', () => {
    applyInsightFilters();
  });
}

if (resetButton) {
  resetButton.addEventListener('click', () => {
    activeFilters.clear();
    filterButtons.forEach((button) => {
      button.classList.remove('is-active');
      button.setAttribute('aria-pressed', 'false');
    });
    if (insightSearchInput) {
      insightSearchInput.value = '';
    }
    applyInsightFilters();
  });
}

if (insightItems.length) {
  applyInsightFilters();
}
