# Tech Philosophers Website

A modern, accessible landing site for the Tech Philosophers collective. The single-page experience highlights the group's pillars, podcast, insights, and community programming with a bold, future-forward visual language.

## ✨ Features

- **Responsive layout:** Fluid grid and typography system optimized for desktops, tablets, and phones.
- **Light/dark themes:** Visitors can toggle between modes. Their choice is remembered locally and respects OS preferences.
- **Interactive content:**
  - Tabbed "Pillars" section with keyboard navigation support.
  - Insight cards filter instantly by category.
  - FAQ accordion with ARIA attributes for screen reader compatibility.
  - Animated community statistics (disabled for reduced-motion preferences).
- **Newsletter form:** Client-side validation with friendly feedback messaging.
- **Mobile navigation:** Accessible menu with keyboard shortcuts, focus management, and outside-click dismissal.

## 📁 Project structure

```
.
├── index.html            # Landing page markup
├── assets
│   ├── css
│   │   └── styles.css    # Core styles and theme variables
│   ├── js
│   │   └── main.js       # Interactivity and accessibility helpers
│   └── images
│       ├── favicon.svg   # SVG favicon used in the head
│       └── orbit.svg     # Hero illustration
└── README.md
```

## 🚀 Getting started

1. Serve the site locally with any static server, e.g.:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```
2. Visit `http://localhost:8000` in your browser.

No build tools are required—everything is plain HTML, CSS, and JavaScript.

## ☁️ Deployment tips

To host on AWS S3 + CloudFront or AWS Amplify:

1. Upload the entire repository contents to your S3 bucket or Amplify app.
2. Configure the bucket for static website hosting (ensure `index.html` is the default document).
3. Set the correct MIME types: `text/html` for HTML, `text/css` for CSS, `application/javascript` for JS, and `image/svg+xml` for SVG files.
4. (Optional) Place CloudFront or Route 53 in front for HTTPS and custom domains.

## 🧰 Customization

- Update copy directly in `index.html` to reflect new programs or episodes.
- Add additional insight cards by duplicating existing `<article class="insight-card">` blocks and updating the `data-category` attribute for filtering.
- Extend styling via CSS variables near the top of `assets/css/styles.css`.
- Hook the newsletter form to your preferred backend service by replacing the client-side handler in `assets/js/main.js`.

Enjoy building futures where technology and philosophy thrive together! 🌌
