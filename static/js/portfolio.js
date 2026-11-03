/* Content stays visible if JavaScript or motion support is unavailable. */
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const elements = [...document.querySelectorAll('.reveal')];
  let observer;
  const showAll = () => {
    observer?.disconnect();
    elements.forEach(element => element.classList.remove('is-pending'));
    document.documentElement.classList.remove('motion-ready');
  };
  if (!preference.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('is-pending');
        observer.observe(element);
      }
    });
    document.documentElement.classList.add('motion-ready');
  }
  preference.addEventListener('change', showAll);
  window.addEventListener('beforeprint', showAll);
  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });
})();
