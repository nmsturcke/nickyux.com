(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();

  media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1000px)' }, context => {
    if (!context.conditions.motion) return;
    const desktop = context.conditions.desktop;
    document.body.classList.add('gsap-ready');
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.append(progress);
    gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .25 } });

    const originals = [];
    document.querySelectorAll('.section-heading h2').forEach(heading => {
      originals.push([heading, heading.innerHTML]);
      // Keep em/br markup and the existing accessible heading text intact.
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        const fragment = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(word => {
          if (!word.trim()) return fragment.append(document.createTextNode(word));
          const mask = document.createElement('span');
          mask.className = 'motion-word';
          const inner = document.createElement('span');
          inner.textContent = word;
          mask.append(inner);
          fragment.append(mask);
        });
        node.replaceWith(fragment);
      });
      gsap.from(heading.querySelectorAll('.motion-word > span'), {
        yPercent: 130, rotation: 12, rotationX: -65, duration: 1.2, stagger: .095, ease: 'power4.out',
        scrollTrigger: { trigger: heading, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    });

    gsap.to('.wordmark', { yPercent: desktop ? 48 : 20, rotation: desktop ? -7 : -3, scale: desktop ? 1.28 : 1.08, opacity: .12, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .7 } });
    gsap.from('.chapter-divider span', { scaleX: 0, duration: 1.3, ease: 'power3.inOut', scrollTrigger: { trigger: '.chapter-divider', start: 'top 92%' } });
    gsap.to('.chapter-divider i', { rotation: 270, ease: 'none', scrollTrigger: { trigger: '.chapter-divider', start: 'top bottom', end: 'bottom top', scrub: 1 } });

    document.querySelectorAll('.project').forEach((card, index) => {
      const art = card.querySelector('.project-art');
      gsap.from(art, { clipPath: 'inset(35% 14% 35% 14% round 100px)', scale: .72, rotation: index ? 8 : -8, rotationY: desktop ? (index ? -22 : 22) : 0,
        duration: 1.65, ease: 'expo.out', clearProps: 'transform,clipPath',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
      gsap.from(card.querySelector('.project-info'), { y: 35, opacity: 0, duration: .8, delay: .15,
        scrollTrigger: { trigger: card, start: 'top 80%', once: true } });
    });
    gsap.fromTo('.elite-rings', { x: 45, scale: .85 }, { x: -25, scale: 1.3, ease: 'none', scrollTrigger: { trigger: '.project-elite', start: 'top bottom', end: 'bottom top', scrub: .8 } });
    gsap.fromTo('.elite-logo', { rotation: -15, y: 15 }, { rotation: 15, y: -15, ease: 'none', scrollTrigger: { trigger: '.project-elite', start: 'top bottom', end: 'bottom top', scrub: 1 } });

    const experience = document.querySelector('.experience-strip');
    const track = document.createElement('div');
    track.className = 'growth-track';
    track.setAttribute('aria-hidden', 'true');
    track.innerHTML = '<span></span>';
    experience.append(track);
    const growth = document.createElement('div');
    growth.className = 'growth-stage';
    growth.setAttribute('aria-hidden', 'true');
    growth.innerHTML = '<div class="growth-orbits"><i></i><i></i><i></i></div><div class="growth-readout"><span class="growth-number">0.2</span><span class="growth-unit">m</span></div><span class="growth-caption">MEMBERS · SIX YEARS OF COLLECTIVE GROWTH</span>';
    experience.prepend(growth);
    const counter = { value: .2 };
    const story = gsap.timeline({ scrollTrigger: { trigger: experience, start: desktop ? 'top 10%' : 'top 70%',
      end: desktop ? '+=850' : 'bottom 65%', pin: desktop, scrub: .8, invalidateOnRefresh: true } });
    story.from(growth.querySelector('.growth-readout'), { scale: .45, y: 60, rotation: -8, opacity: .1, duration: 1.6, ease: 'power2.out' }, 0)
      .to(counter, { value: 1.3, duration: 2.4, ease: 'none', onUpdate: () => { growth.querySelector('.growth-number').textContent = counter.value.toFixed(1); } }, 0)
      .fromTo(growth.querySelector('.growth-orbits'), { scale: .5, rotation: -60, opacity: .15 }, { scale: 1, rotation: 120, opacity: .8, duration: 2.4, ease: 'none' }, 0)
      .from(experience.querySelectorAll('strong'), { opacity: .15, y: 30, scale: .9, transformOrigin: 'left center', stagger: .3, duration: .8 }, .9)
      .fromTo(track.firstElementChild, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 2.4 }, 0);

    gsap.from('.skill', { y: 100, rotationX: 35, opacity: 0, stagger: .2, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.skills', start: 'top 85%', once: true }, clearProps: 'transform,opacity' });
    gsap.from('.moderation-mark', { scale: .55, rotation: -8, opacity: 0, duration: 1.15, ease: 'back.out(1.5)',
      scrollTrigger: { trigger: '.moderation-feature', start: 'top 80%', once: true } });
    document.querySelectorAll('.lab-card').forEach((card, i) => {
      gsap.from(card, { y: 110, rotation: i ? 5 : -5, rotationY: desktop ? (i ? -28 : 28) : 0, opacity: 0, duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true }, clearProps: 'transform,opacity' });
    });
    gsap.from('.about-art', { clipPath: 'inset(12% 12% 12% 12% round 50%)', duration: 1.25, ease: 'power3.inOut',
      scrollTrigger: { trigger: '.about-art', start: 'top 85%', once: true }, clearProps: 'clipPath' });
    gsap.fromTo('.personal-mark', { rotation: -16, y: 20 }, { rotation: 7, y: -15, ease: 'none',
      scrollTrigger: { trigger: '.about-art', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    gsap.from('.contact h2', { y: 75, rotation: -3, opacity: 0, duration: 1.25, ease: 'power4.out',
      scrollTrigger: { trigger: '.contact', start: 'top 82%', once: true } });
    gsap.to('.contact-star', { rotation: 220, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });
    gsap.from('.contact', { clipPath: 'inset(0 9% 0 9% round 90px)', ease: 'none',
      scrollTrigger: { trigger: '.contact', start: 'top 98%', end: 'top 35%', scrub: .6 } });
    const halo = document.createElement('div');
    halo.className = 'contact-halo';
    halo.setAttribute('aria-hidden', 'true');
    document.querySelector('.contact').prepend(halo);
    gsap.fromTo(halo, { scale: .2, rotation: -50 }, { scale: 1.5, rotation: 130, ease: 'none',
      scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 1 } });

    // Keyboard navigation must never land on an invisible animated link.
    const revealFocused = event => {
      const card = event.target.closest('.project, .lab-card');
      if (!card) return;
      const nodes = [card, ...card.querySelectorAll('.project-art, .project-info')];
      gsap.killTweensOf(nodes);
      gsap.set(nodes, { clearProps: 'transform,opacity,clipPath' });
    };
    document.addEventListener('focusin', revealFocused);
    return () => {
      document.removeEventListener('focusin', revealFocused);
      originals.forEach(([heading, html]) => { heading.innerHTML = html; });
      progress.remove(); track.remove(); growth.remove(); halo.remove();
      document.body.classList.remove('gsap-ready');
    };
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
})();
