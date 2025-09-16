const root = document.documentElement;
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const themeToggle = document.getElementById('theme-toggle');
const THEME_STORAGE_KEY = 'techphill-theme';

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const applyTheme = (theme, persist = true) => {
  root.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Activate light mode' : 'Activate dark mode'
    );
  }
  if (persist) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
};

const getPreferredTheme = () => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return prefersDarkScheme.matches ? 'dark' : 'light';
};

applyTheme(getPreferredTheme(), false);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  });

  const handleSchemeChange = (event) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(event.matches ? 'dark' : 'light', false);
    }
  };

  if (typeof prefersDarkScheme.addEventListener === 'function') {
    prefersDarkScheme.addEventListener('change', handleSchemeChange);
  } else if (typeof prefersDarkScheme.addListener === 'function') {
    prefersDarkScheme.addListener(handleSchemeChange);
  }
}

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('is-open')) {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navList.classList.contains('is-open')) {
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (
      navList.classList.contains('is-open') &&
      !navList.contains(event.target) &&
      event.target !== navToggle &&
      !navToggle.contains(event.target)
    ) {
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const pillarTabs = Array.from(document.querySelectorAll('.pillars__tab'));
const pillarPanels = Array.from(document.querySelectorAll('.pillars__panel'));

if (pillarTabs.length && pillarPanels.length) {
  const activateTab = (tab) => {
    const targetId = tab.getAttribute('aria-controls');

    pillarTabs.forEach((button) => {
      const isActive = button === tab;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
      button.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    pillarPanels.forEach((panel) => {
      const isActive = panel.id === targetId;
      panel.classList.toggle('is-active', isActive);
      panel.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  };

  pillarTabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      const { key } = event;
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) {
        return;
      }

      event.preventDefault();
      const currentIndex = pillarTabs.indexOf(tab);
      let nextIndex = currentIndex;

      if (key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % pillarTabs.length;
      } else if (key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + pillarTabs.length) % pillarTabs.length;
      } else if (key === 'Home') {
        nextIndex = 0;
      } else if (key === 'End') {
        nextIndex = pillarTabs.length - 1;
      }

      pillarTabs[nextIndex].focus();
      activateTab(pillarTabs[nextIndex]);
    });

    // Ensure only the active tab is focusable on load
    tab.setAttribute('tabindex', tab.classList.contains('is-active') ? '0' : '-1');
  });
}

const insightFilters = document.querySelectorAll('.insights__filter');
const insightCards = document.querySelectorAll('.insight-card');

if (insightFilters.length && insightCards.length) {
  insightFilters.forEach((button) => {
    button.setAttribute('aria-pressed', button.classList.contains('is-active') ? 'true' : 'false');
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;

      insightFilters.forEach((control) => {
        control.classList.toggle('is-active', control === button);
        control.setAttribute('aria-pressed', String(control === button));
      });

      insightCards.forEach((card) => {
        const categories = card.dataset.category.split(' ').filter(Boolean);
        const shouldShow = selectedFilter === 'all' || categories.includes(selectedFilter);
        card.hidden = !shouldShow;
      });
    });
  });
}

const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach((item, index) => {
  const button = item.querySelector('button');
  const body = item.querySelector('.faq__body');

  if (!button || !body) return;

  const bodyId = body.id || `faq-body-${index + 1}`;
  body.id = bodyId;
  button.setAttribute('aria-controls', bodyId);
  body.hidden = true;
  button.setAttribute('aria-expanded', 'false');

  button.addEventListener('click', () => {
    const isOpen = item.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
    body.hidden = !isOpen;
  });
});

const newsletterForm = document.querySelector('.newsletter__form');

if (newsletterForm) {
  const feedbackEl = newsletterForm.querySelector('.newsletter__feedback');

  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(newsletterForm);
    const email = formData.get('email');

    if (!email) {
      if (feedbackEl) {
        feedbackEl.textContent = 'Please add a valid email to subscribe.';
      }
      return;
    }

    if (feedbackEl) {
      feedbackEl.textContent = 'Thanks for joining our orbit! We will be in touch soon.';
    }

    newsletterForm.reset();
    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.focus();
    }

    if (feedbackEl) {
      setTimeout(() => {
        feedbackEl.textContent = '';
      }, 6000);
    }
  });
}

const statElements = document.querySelectorAll('[data-count]');
const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if (statElements.length) {
  const prefersReducedMotion = prefersReducedMotionQuery.matches;

  statElements.forEach((element) => {
    const targetValue = parseInt(element.dataset.count, 10);
    if (Number.isNaN(targetValue)) return;

    if (prefersReducedMotion) {
      element.textContent = targetValue.toLocaleString('en-US');
      return;
    }

    element.textContent = '0';
  });

  if (!prefersReducedMotion) {
    const animateCount = (element) => {
      const targetValue = parseInt(element.dataset.count, 10);
      if (Number.isNaN(targetValue) || element.dataset.animated === 'true') {
        return;
      }

      const duration = 1600;
      let startTimestamp = null;

      const step = (timestamp) => {
        if (!startTimestamp) {
          startTimestamp = timestamp;
        }
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * targetValue);
        element.textContent = currentValue.toLocaleString('en-US');

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          element.dataset.animated = 'true';
          element.textContent = targetValue.toLocaleString('en-US');
        }
      };

      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    statElements.forEach((element) => observer.observe(element));
  }
}

const yearSpan = document.getElementById('copyright-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
