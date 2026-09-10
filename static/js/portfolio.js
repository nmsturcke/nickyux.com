document.querySelectorAll('.wordmark > span').forEach((letter, index) => letter.style.setProperty('--index', index));
document.querySelectorAll('[data-year]').forEach(element => element.textContent = new Date().getFullYear());
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches && !document.body.classList.contains('gsap-ready')) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.body.classList.add('motion-ready');
}
