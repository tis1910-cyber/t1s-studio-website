(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.getElementById('site-nav');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  const setHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 16);
  };
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    }));
  }

  const revealEls = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  const grid = document.getElementById('video-grid');
  const data = window.T1S_CONTENT;
  if (grid && data?.latestVideos?.length) {
    const escapeHTML = (value = '') => String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

    data.latestVideos.forEach((video, index) => {
      const card = document.createElement('article');
      card.className = 'video-card reveal';
      const meta = [video.views, video.published].filter(Boolean).map(escapeHTML).join(' • ');
      card.innerHTML = `
        <a href="${escapeHTML(video.url || data.channelUrl)}" target="_blank" rel="noreferrer">
          <div class="video-thumb">
            <img src="${escapeHTML(video.image || '')}" alt="" loading="lazy" />
            ${video.duration ? `<span class="duration">${escapeHTML(video.duration)}</span>` : ''}
          </div>
          <div class="video-card-body">
            <div class="video-type"><span>${escapeHTML(video.category || 'T1S')}</span><span>•</span><span>${escapeHTML(video.format || 'Real World')}</span></div>
            <h3>${escapeHTML(video.title || 'T1S Studio video')}</h3>
            <p>${index === 0 ? 'A real T1S upload already identified for this V2. Current live metrics can be connected later.' : 'This card is ready for a current YouTube title, real frame and public stats.'}</p>
            <div class="video-stats">${meta || '<span>Live stats not connected yet</span>'}</div>
          </div>
        </a>`;

      const img = card.querySelector('img');
      img.addEventListener('error', () => {
        img.remove();
        card.querySelector('.video-thumb')?.classList.add('is-empty');
      });
      grid.appendChild(card);
    });

    requestAnimationFrame(() => {
      const newEls = [...grid.querySelectorAll('.reveal')];
      if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        newEls.forEach(el => setTimeout(() => el.classList.add('is-visible'), 80));
      } else {
        newEls.forEach(el => el.classList.add('is-visible'));
      }
    });
  } else if (grid) {
    grid.innerHTML = `<div class="data-empty"><div><strong>No fabricated data.</strong><br>Current YouTube video data has not been connected yet.</div><a class="text-link" href="https://www.youtube.com/channel/UC7tokKEXW1PbJNHov2ePhFw/videos" target="_blank" rel="noreferrer">Open the channel ↗</a></div>`;
  }
})();
