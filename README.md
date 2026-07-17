# Mohamed Ameer — Portfolio

A production-ready developer portfolio built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

## Stack

- React 18 + Vite — fast dev server and build
- Tailwind CSS — utility-first styling, custom theme in `tailwind.config.js`
- Framer Motion — scroll reveals, animated counters/bars, spring-based scroll progress
- Plain JS data modules (`src/data/*.js`) — edit these to update content without touching components

## Color theme

Near-black ink background with acid-lime and coral accents (`tailwind.config.js` → `theme.extend.colors`):

- `ink` `#0A0F0B` — background
- `panel` `#10160F` — cards
- `acid` `#B9FF3D` — primary accent
- `coral` `#FF6B4A` — secondary accent

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Project structure

```
src/
  data/            content — edit these files to update text
    profile.js
    skills.js
    projects.js
    experience.js
    certifications.js
  components/       UI — one component per section
    Navbar.jsx
    Hero.jsx
    Terminal.jsx     signature interactive terminal
    About.jsx
    Skills.jsx
    Projects.jsx
    Experience.jsx
    Certifications.jsx
    Resume.jsx
    Contact.jsx
    Footer.jsx
    ScrollProgress.jsx
    Background.jsx
    SectionHeading.jsx
  hooks/
    useTypewriter.js
  App.jsx
  main.jsx
  index.css
```

## Before you deploy

1. Update `src/data/profile.js`, `skills.js`, `projects.js`, `experience.js`, and `certifications.js` with your real details.
2. Add your resume PDF to `public/resume.pdf` and update the download links in `Hero.jsx` and `Resume.jsx` to `href="/resume.pdf" download`.
3. Wire `Contact.jsx`'s `handleSubmit` to EmailJS, Formspree, or your own backend — it currently only validates and shows a demo success message.
4. Replace the placeholder GitHub/LinkedIn URLs in `src/data/profile.js` and project links in `src/data/projects.js`.

## Build & deploy

```bash
npm run build
```

Outputs a static `dist/` folder — deploy it to any static host:

- **Vercel**: `vercel deploy` or connect the repo in the Vercel dashboard (framework preset: Vite)
- **Netlify**: connect the repo, build command `npm run build`, publish directory `dist`
- **GitHub Pages**: build, then push the contents of `dist/` to a `gh-pages` branch (or use the `gh-pages` npm package)
