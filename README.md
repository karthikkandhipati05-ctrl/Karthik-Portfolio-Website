# Karthik Kandhipati Portfolio Website

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://yourusername.github.io/repo-name)
![HTML5](https://img.shields.io/badge/HTML5-Structure-orange)
![CSS3](https://img.shields.io/badge/CSS3-Styling-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Interactivity-yellow)
![GitHub%20Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-black)

A modern, dark-themed personal portfolio for **Karthik Kandhipati**, Senior Data Analyst, built with pure HTML/CSS/JavaScript and ready for automatic deployment to GitHub Pages.

## Features
- Responsive single-page layout with 7 sections (Hero, About, Skills, Experience, Projects, Education, Contact)
- Sticky glassmorphism navbar with active-section highlighting
- Typewriter hero subtitle, stat counters, scroll reveal animations, project modals
- Contact form with `mailto:` behavior and browser-native validation
- GitHub Actions workflow that deploys on every push to `main`

## Project Structure

```text
/
├── index.html
├── style.css
├── script.js
├── assets/
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

## Local Preview
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/repo-name.git
   cd repo-name
   ```
2. Open `index.html` directly in your browser, or run a static server:
   ```bash
   python3 -m http.server 8000
   ```

## Deployment (GitHub Pages)
1. Push all files to the `main` branch.
2. The workflow at `.github/workflows/deploy.yml` runs automatically.
3. In GitHub, go to **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. After the workflow succeeds, your site will be available at:
   `https://yourusername.github.io/repo-name`

## Customization Tips
- Update theme colors in `:root` variables inside `style.css`.
- Edit content section-by-section in `index.html`.
- Add or remove animations/interactions in `script.js`.
- Replace placeholder social/profile links and add files under `/assets` as needed.
