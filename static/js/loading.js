/* The original logo intro, isolated from the old homepage implementation. */
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const template = document.getElementById('loading-template');
  if (!template || preference.matches || window.location.hash) return;

  const loader = template.content.firstElementChild.cloneNode(true);
  document.body.prepend(loader);
  document.body.classList.add('is-loading');

  const finish = () => {
    loader.remove();
    document.body.classList.remove('is-loading');
    window.clearTimeout(fallback);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('pagehide', finish);
    window.removeEventListener('hashchange', finish);
    preference.removeEventListener('change', finish);
  };
  // Keyboard users can immediately access the page without waiting for the intro.
  const onKey = event => {
    if (event.key === 'Tab' || event.key === 'Escape') finish();
  };
  const fallback = window.setTimeout(finish, 4200);
  loader.addEventListener('animationend', event => {
    if (event.target === loader && event.animationName === 'loading-slide-up') finish();
  });
  window.addEventListener('keydown', onKey);
  window.addEventListener('pagehide', finish);
  window.addEventListener('hashchange', finish);
  preference.addEventListener('change', finish);
})();
