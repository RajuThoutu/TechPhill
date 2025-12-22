# The Tech Philosophers (React Version)

This is the modern React version of The Tech Philosophers website, built with Next.js, Tailwind CSS, and Framer Motion.

## Project Structure

- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable React components
- `content/`: MDX blog posts and data files
- `public/`: Static assets (images, fonts)
- `lib/`: Utility functions (blog post processing)
- `styles/`: Global styles

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

3. **Build for Production**
   ```bash
   npm run build
   ```
   This generates a static export in the `out/` directory.

## Deployment

This project is configured for static export to AWS S3.
See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions.

## Key Features

- **Dark Mode**: Toggle via the header icon. Persists preference.
- **Blog**: Write posts in Markdown (MDX) in `content/blog/`.
- **Animations**: Powered by Framer Motion.
- **Styling**: Tailwind CSS v3 with custom design tokens in `app/globals.css`.
