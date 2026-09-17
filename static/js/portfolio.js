document.querySelectorAll('.wordmark > span').forEach((letter, index) => letter.style.setProperty('--index', index));
document.querySelectorAll('[data-year]').forEach(element => element.textContent = new Date().getFullYear());
const backToTop = document.createElement('button');
backToTop.type = 'button';
backToTop.className = 'back-to-top-button';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.title = 'Back to top';
backToTop.inert = true;
backToTop.setAttribute('aria-hidden', 'true');
backToTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M12 19V5m-6 6 6-6 6 6"/></svg>';
document.body.append(backToTop);
let scrollUpdatePending = false;
const updateBackToTop = () => {
  const visible = window.scrollY >= 100;
  backToTop.classList.toggle('is-visible', visible);
  backToTop.inert = !visible;
  backToTop.setAttribute('aria-hidden', String(!visible));
  scrollUpdatePending = false;
};
window.addEventListener('scroll', () => {
  if (!scrollUpdatePending) {
    scrollUpdatePending = true;
    requestAnimationFrame(updateBackToTop);
  }
}, { passive: true });
window.addEventListener('pageshow', updateBackToTop);
updateBackToTop();
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  const destination = document.querySelector('.brand') || document.querySelector('main');
  destination?.focus({ preventScroll: true });
});
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
// Vim-style page navigation; leave typing and browser shortcuts alone.
let lastGAt = 0;
window.addEventListener('keydown', event => {
  const target = event.target;
  if (event.defaultPrevented || event.isComposing || event.ctrlKey || event.metaKey || event.altKey ||
      (target instanceof HTMLElement && (target.isContentEditable ||
        target.closest('input, textarea, select, [role="textbox"], [role="combobox"], [role="slider"], [role="spinbutton"]')))) {
    lastGAt = 0;
    return;
  }
  const now = performance.now();
  if (event.key === 'g' && !event.shiftKey) {
    if (event.repeat) return;
    event.preventDefault();
    if (lastGAt && now - lastGAt < 650) {
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      lastGAt = 0;
    } else {
      lastGAt = now;
    }
    return;
  }
  lastGAt = 0;
  if (event.key === 'G') {
    event.preventDefault();
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  } else if (!event.shiftKey && ['j', 'h', 'k', 'l'].includes(event.key)) {
    event.preventDefault();
    // Instant increments also make holding a key responsive and predictable.
    const direction = event.key === 'j' || event.key === 'l' ? 1 : -1;
    window.scrollBy({ top: direction * 90, behavior: 'instant' });
  }
});
window.addEventListener('blur', () => { lastGAt = 0; });
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
