# Portfolio mockup

Static HTML, CSS, and JavaScript, ready for GitHub Pages on the existing custom domain. No build step or external runtime dependencies.

## Edit content

- `index.html`: homepage, personal introduction, and three areas of work.
- `work/cellule/index.html`: Cellule case study.
- `work/elite-scrims/index.html`: Elite Scrims case study.
- `work/practice-server/index.html`: executive collaboration and engineering case study.
- `work/beep/index.html` and `work/sentry-to-github/index.html`: application case studies (Beep awaiting release; Sentry-To-GitHub public).
- `static/css/portfolio.css`: shared design and responsive layouts.
- `static/css/portfolio-refresh.css`: larger type, revised project artwork, and the opening title sequence.
- `static/js/portfolio.js`: entrance sequencing, section reveals, and footer year.

Search for `Placeholder` in the Cellule case study to replace its remaining lorem ipsum. Other case studies use the experience provided in September 2026. Elite Scrims membership growth is attributed to the platform collectively, and Suja's follower count describes the channel audience. Project artwork is illustrative, not a screenshot of a functioning interface. Sentry-To-GitHub is public and its project page links to the repository. Add a repository link for Beep once it is public; both cards link to local project descriptions.

## Preview

Serve the repository root with any local static server (for example `python -m http.server 4173`) and open `http://localhost:4173`. Root-relative asset links assume the existing custom domain; opening HTML directly as a file is not supported.

## Motion

A 1.65-second opening title sequence transitions into a staggered capitalized wordmark. A static graphic divider replaces the scrolling phrases. Project hover effects and one-time scroll reveals continue through the page. Reduced-motion preferences disable animation, and all content remains available without JavaScript.

## Publishing

The mockup is local to the `mockup` branch. Creating it does not change the live GitHub Pages site. Keep `CNAME` when publishing. Each case study has a physical `index.html`, so direct links and refreshes work without SPA routing.
