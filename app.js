(function () {
  'use strict';

  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 7902;
  const reducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. Responsive 500px Canvas Scaling (Mobile-first, zero horizontal scroll)
     ------------------------------------------------------------------------ */
  const viewportEl = document.getElementById('canvas-viewport');
  const canvasEl = document.getElementById('freeform-canvas');

  function updateCanvasScale() {
    if (!viewportEl || !canvasEl) return;
    const vw = document.documentElement.clientWidth || window.innerWidth;
    const scale = vw < CANVAS_WIDTH ? vw / CANVAS_WIDTH : 1;
    canvasEl.style.transform = scale < 1 ? `scale(${scale})` : 'none';
    viewportEl.style.height = `${Math.round(CANVAS_HEIGHT * scale)}px`;
  }

  updateCanvasScale();
  window.addEventListener('resize', updateCanvasScale);

  /* ------------------------------------------------------------------------
     2. Resolve Side (nha_trai | nha_gai) + Apply WEDDING_CONFIG + Visitor Name
     ------------------------------------------------------------------------ */
  const params = new URLSearchParams(window.location.search);

  function detectSideKey(rawConfig) {
    const normalize = (val) => {
      const s = (val || '').toLowerCase().trim();
      if (!s) return '';
      if (['nha_gai', 'nhagai', 'nha-gai', 'bride', 'codau', 'vuquy', 'gai'].includes(s)) {
        return 'nha_gai';
      }
      if (['nha_trai', 'nhatrai', 'nha-trai', 'groom', 'chure', 'thanhhon', 'trai'].includes(s)) {
        return 'nha_trai';
      }
      return '';
    };

    const fromQuery = normalize(params.get('side'));
    if (fromQuery) return fromQuery;

    const path = window.location.pathname.toLowerCase();
    if (/\/(nha-gai|nhagai|bride|vu-quy)\b/.test(path)) return 'nha_gai';
    if (/\/(nha-trai|nhatrai|groom|thanh-hon)\b/.test(path)) return 'nha_trai';

    const host = window.location.hostname.toLowerCase();
    if (/(nhagai|nha-gai|bride|quynhtrang|vuquy)/.test(host)) return 'nha_gai';
    if (/(nhatrai|nha-trai|groom|vanhung|thanhhon)/.test(host)) return 'nha_trai';

    return rawConfig.defaultSide || 'nha_trai';
  }

  const rawCfg = window.WEDDING_CONFIG || {};
  const activeSideKey = detectSideKey(rawCfg);
  const sideCfg = (rawCfg.sides && rawCfg.sides[activeSideKey]) || {};
  const cfg = {
    ...rawCfg,
    ...sideCfg,
    photos: { ...(rawCfg.photos || {}), ...(sideCfg.photos || {}) },
    bank: { ...(rawCfg.bank || {}), ...(sideCfg.bank || {}) },
  };

  if (cfg.pageTitle) {
    document.title = cfg.pageTitle;
  }

  document.querySelectorAll('[data-field]').forEach((el) => {
    const key = el.dataset.field;
    if (key && cfg[key]) el.textContent = cfg[key];
  });
  document.querySelectorAll('[data-field-href]').forEach((el) => {
    const key = el.dataset.fieldHref;
    if (key && cfg[key]) el.href = cfg[key];
  });
  if (cfg.photos) {
    document.querySelectorAll('[data-photo]').forEach((img) => {
      const key = img.dataset.photo;
      if (!key) return;
      if (key === 'firstPortrait' && cfg.firstPortraitPhotoKey && cfg.photos[cfg.firstPortraitPhotoKey]) {
        img.src = cfg.photos[cfg.firstPortraitPhotoKey];
      } else if (key === 'secondPortrait' && cfg.secondPortraitPhotoKey && cfg.photos[cfg.secondPortraitPhotoKey]) {
        img.src = cfg.photos[cfg.secondPortraitPhotoKey];
      } else if (cfg.photos[key]) {
        img.src = cfg.photos[key];
      }
    });
    if (Array.isArray(cfg.photos.album) && cfg.photos.album.length) {
      const track = document.querySelector('.bd-alb-3d .track');
      if (track) {
        track.replaceChildren(
          ...cfg.photos.album.map((url, idx) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            const img = document.createElement('img');
            img.src = url;
            img.alt = `Ảnh cưới ${idx + 1}`;
            img.loading = 'lazy';
            slide.appendChild(img);
            return slide;
          })
        );
      }
    }
  }
  if (cfg.musicUrl) {
    const audioEl = document.getElementById('bg-music');
    if (audioEl) audioEl.src = cfg.musicUrl;
  }
  if (cfg.bank) {
    const qrImg = document.querySelector('#qr-dialog img');
    const bankInfo = document.querySelector('#qr-dialog .qr-bank-info');
    if (qrImg && cfg.bank.bankBin && cfg.bank.accountNumber) {
      const nameParam = encodeURIComponent(cfg.bank.accountHolder || '');
      qrImg.src = `https://img.vietqr.io/image/${cfg.bank.bankBin}-${cfg.bank.accountNumber}-compact2.png?accountName=${nameParam}`;
      qrImg.alt = `Mã QR ${cfg.bank.bankName || 'Ngân hàng'}`;
    }
    if (bankInfo) {
      bankInfo.innerHTML =
        `<div><strong></strong></div>` +
        `<div>Chủ tài khoản: <strong></strong></div>` +
        `<div>Số tài khoản: <strong></strong></div>`;
      const strongs = bankInfo.querySelectorAll('strong');
      if (strongs[0]) strongs[0].textContent = cfg.bank.bankName || '';
      if (strongs[1]) strongs[1].textContent = cfg.bank.accountHolder || '';
      if (strongs[2]) strongs[2].textContent = cfg.bank.accountNumber || '';
    }
  }

  const mapIframe = document.getElementById('venue-map-iframe');
  if (mapIframe && cfg.mapEmbedUrl) {
    mapIframe.src = cfg.mapEmbedUrl;
  }

  const addToCalBtn = document.getElementById('add-to-calendar-btn');
  if (addToCalBtn && cfg.calendarEvent) {
    const calUrl = new URL('https://www.google.com/calendar/render');
    calUrl.searchParams.set('action', 'TEMPLATE');
    calUrl.searchParams.set('text', cfg.calendarEvent.title || cfg.ceremonyTitle || 'Lễ Cưới');
    if (cfg.calendarEvent.start && cfg.calendarEvent.end) {
      calUrl.searchParams.set('dates', `${cfg.calendarEvent.start}/${cfg.calendarEvent.end}`);
    }
    calUrl.searchParams.set('ctz', 'Asia/Ho_Chi_Minh');
    const locationText = [cfg.venueName, cfg.venueAddress]
      .filter(Boolean)
      .join(', ')
      .replace(/\s+/g, ' ');
    if (locationText) calUrl.searchParams.set('location', locationText);
    if (cfg.calendarEvent.details) calUrl.searchParams.set('details', cfg.calendarEvent.details);
    addToCalBtn.href = calUrl.toString();
  }

  const jumpRsvpBtn = document.getElementById('jump-rsvp-btn');
  if (jumpRsvpBtn) {
    jumpRsvpBtn.addEventListener('click', () => {
      const rsvpSection = document.getElementById('rsvp-section') || document.getElementById('rsvp-form');
      if (rsvpSection) {
        rsvpSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
      }
    });
  }

  if (cfg.defaultGuestbookSide) {
    const sideRadio = document.querySelector(
      `input[name="gb-side-radio"][value="${cfg.defaultGuestbookSide}"]`
    );
    if (sideRadio) sideRadio.checked = true;
  }

  const guestName = (params.get('name') || params.get('guest') || '').trim();
  const visitorNode = document.getElementById('visitor-name-text');
  if (visitorNode) {
    visitorNode.textContent = guestName || cfg.defaultGuestName || 'Quý Khách';
  }

  /* ------------------------------------------------------------------------
     3. Opening Curtain Effect ("curtain-reveal-red" / Màn đỏ)
     ------------------------------------------------------------------------ */
  const curtainOverlay = document.getElementById('curtain-overlay');
  let curtainDismissed = false;
  let scrollObserverStarted = false;

  function dismissCurtain() {
    if (!curtainOverlay || curtainDismissed) return;
    curtainDismissed = true;
    curtainOverlay.classList.add('is-dismissing');
    startScrollAnimations();

    if (reducedMotion) {
      curtainOverlay.classList.add('is-hidden');
      return;
    }

    setTimeout(() => {
      curtainOverlay.classList.add('is-hidden');
    }, 600);
  }

  if (curtainOverlay) {
    const openAndDismiss = () => {
      if (curtainOverlay.classList.contains('open')) return;
      // Phát nhạc đồng bộ ngay trong user gesture để iOS/Android/Chrome luôn cho phép
      tryPlayMusic();
      curtainOverlay.classList.add('open');
      startScrollAnimations();
      setTimeout(dismissCurtain, reducedMotion ? 0 : 2200);
    };

    curtainOverlay.addEventListener('click', openAndDismiss);
    curtainOverlay.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openAndDismiss();
      }
    });
  } else {
    startScrollAnimations();
  }

  /* ------------------------------------------------------------------------
     4. Scroll-Triggered Entrance Animations (IntersectionObserver)
     ------------------------------------------------------------------------ */
  function revealElement(el) {
    const anim = el.dataset.anim;
    const duration = el.dataset.animDuration || '2.5';
    el.classList.remove('anim-pending');
    if (anim && !reducedMotion) {
      el.style.setProperty('--anim-duration', `${duration}s`);
      el.classList.add('freeform-anim', `freeform-anim-${anim}`);
    }
  }

  function startScrollAnimations() {
    if (scrollObserverStarted) return;
    scrollObserverStarted = true;

    const animatedEls = document.querySelectorAll('[data-anim]');
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      animatedEls.forEach(revealElement);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.05 }
    );

    animatedEls.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     5. Live Countdown (Target from config.js)
     ------------------------------------------------------------------------ */
  const targetMs = new Date(cfg.countdownTarget || '2026-09-28T22:00:00+07:00').getTime();
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');

  function pad2(n) {
    return String(Math.max(0, n)).padStart(2, '0');
  }

  function tickCountdown() {
    const diff = Math.max(0, targetMs - Date.now());
    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    if (cdDays) cdDays.textContent = pad2(days);
    if (cdHours) cdHours.textContent = pad2(hours);
    if (cdMins) cdMins.textContent = pad2(mins);
    if (cdSecs) cdSecs.textContent = pad2(secs);
  }

  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ------------------------------------------------------------------------
     6. Background Music Player (audio-1)
     ------------------------------------------------------------------------ */
  const bgAudio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-fab');
  let userPausedMusic = false;

  function syncMusicUI() {
    if (!musicBtn || !bgAudio) return;
    const playing = !bgAudio.paused;
    musicBtn.classList.toggle('playing', playing);
    musicBtn.setAttribute('aria-pressed', String(playing));
    musicBtn.setAttribute(
      'aria-label',
      playing ? 'Tạm dừng nhạc nền' : 'Phát nhạc nền'
    );
  }

  function tryPlayMusic() {
    if (!bgAudio || !bgAudio.paused || userPausedMusic) return;
    const p = bgAudio.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        syncMusicUI();
        removeUnlockListeners();
      }).catch(() => {});
    }
  }

  function unlockOnce() {
    tryPlayMusic();
  }

  function removeUnlockListeners() {
    window.removeEventListener('pointerdown', unlockOnce);
    window.removeEventListener('touchstart', unlockOnce);
    window.removeEventListener('click', unlockOnce);
    window.removeEventListener('keydown', unlockOnce);
  }

  if (musicBtn && bgAudio) {
    musicBtn.addEventListener('click', () => {
      if (bgAudio.paused) {
        userPausedMusic = false;
        bgAudio.play().then(() => {
          syncMusicUI();
          removeUnlockListeners();
        }).catch(() => {});
      } else {
        userPausedMusic = true;
        bgAudio.pause();
        syncMusicUI();
      }
    });

    bgAudio.addEventListener('play', syncMusicUI);
    bgAudio.addEventListener('pause', syncMusicUI);

    window.addEventListener('pointerdown', unlockOnce, { passive: true });
    window.addEventListener('touchstart', unlockOnce, { passive: true });
    window.addEventListener('click', unlockOnce, { passive: true });
    window.addEventListener('keydown', unlockOnce);

    // Thử tự động phát ngay khi mở thiệp (nếu trình duyệt cho phép)
    tryPlayMusic();
  }

  /* ------------------------------------------------------------------------
     7. 3D Perspective Photo Album + Lightbox Dialog (Prev/Next + Thumbnails)
     ------------------------------------------------------------------------ */
  const albumSection = document.querySelector('.bd-alb-3d');
  const lightboxDialog = document.getElementById('lightbox-dialog');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxThumbs = document.getElementById('lightbox-thumbs');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (albumSection) {
    const slides = Array.from(albumSection.querySelectorAll('.slide'));
    const counter = albumSection.querySelector('.counter');
    const prevBtn = albumSection.querySelector('.nav.prev');
    const nextBtn = albumSection.querySelector('.nav.next');
    const stage = albumSection.querySelector('.stage');
    const total = slides.length;
    let idx = 0;
    let lbIdx = 0;
    let paused = false;
    let timer = null;

    function renderLightbox(targetIdx) {
      if (!lightboxImg || !total) return;
      lbIdx = ((targetIdx % total) + total) % total;
      const img = slides[lbIdx]?.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || `Ảnh cưới ${lbIdx + 1}`;
      }
      if (lightboxCounter) {
        lightboxCounter.textContent = `${lbIdx + 1} / ${total}`;
      }
      if (lightboxThumbs) {
        lightboxThumbs.querySelectorAll('.lightbox-thumb').forEach((btn, i) => {
          btn.classList.toggle('active', i === lbIdx);
        });
      }
    }

    if (lightboxThumbs && total) {
      lightboxThumbs.replaceChildren(
        ...slides.map((s, i) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'lightbox-thumb';
          btn.setAttribute('aria-label', `Xem ảnh ${i + 1}`);
          const thumbImg = document.createElement('img');
          const srcImg = s.querySelector('img');
          thumbImg.src = srcImg ? srcImg.src : '';
          thumbImg.alt = `Ảnh thu nhỏ ${i + 1}`;
          thumbImg.loading = 'lazy';
          btn.appendChild(thumbImg);
          btn.addEventListener('click', () => renderLightbox(i));
          return btn;
        })
      );
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => renderLightbox(lbIdx - 1));
    }
    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => renderLightbox(lbIdx + 1));
    }
    if (lightboxDialog) {
      lightboxDialog.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') renderLightbox(lbIdx - 1);
        if (e.key === 'ArrowRight') renderLightbox(lbIdx + 1);
      });
    }

    function renderAlbum() {
      slides.forEach((s, i) => {
        let d = i - idx;
        if (d > total / 2) d -= total;
        if (d < -total / 2) d += total;
        const abs = Math.abs(d);
        const x = d * 60;
        const z = -150 * abs;
        const ry = d * 45;
        const sc = abs === 0 ? 1 : abs === 1 ? 0.85 : 0.7;
        const op = abs === 0 ? 1 : abs === 1 ? 0.75 : abs === 2 ? 0.5 : 0;

        s.style.transform = `translateX(${x}%) translateZ(${z}px) rotateY(${ry}deg) scale(${sc})`;
        s.style.opacity = String(op);
        s.style.zIndex = String(100 - abs);
        s.style.pointerEvents = abs > 2 ? 'none' : 'auto';
        s.onclick = () => {
          if (d !== 0) {
            idx = i;
            renderAlbum();
            restartAutoplay();
          } else if (lightboxDialog && lightboxImg) {
            renderLightbox(i);
            lightboxDialog.showModal();
          }
        };
      });
      if (counter) counter.textContent = `${idx + 1} / ${total}`;
    }

    function startAutoplay() {
      if (reducedMotion || paused || total <= 1) return;
      stopAutoplay();
      timer = setInterval(() => {
        idx = (idx + 1) % total;
        renderAlbum();
      }, 4000);
    }

    function stopAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function restartAutoplay() {
      if (timer) {
        stopAutoplay();
        startAutoplay();
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        idx = (idx - 1 + total) % total;
        renderAlbum();
        restartAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        idx = (idx + 1) % total;
        renderAlbum();
        restartAutoplay();
      });
    }

    albumSection.addEventListener('mouseenter', () => {
      paused = true;
      stopAutoplay();
    });
    albumSection.addEventListener('mouseleave', () => {
      paused = false;
      startAutoplay();
    });

    if (stage) {
      let touchX = 0;
      stage.addEventListener(
        'touchstart',
        (e) => {
          touchX = e.touches[0].clientX;
        },
        { passive: true }
      );
      stage.addEventListener(
        'touchend',
        (e) => {
          const dx = e.changedTouches[0].clientX - touchX;
          if (Math.abs(dx) > 36) {
            idx = dx < 0 ? (idx + 1) % total : (idx - 1 + total) % total;
            renderAlbum();
            restartAutoplay();
          }
        },
        { passive: true }
      );
    }

    renderAlbum();
    startAutoplay();
  }

  /* ------------------------------------------------------------------------
     8. QR Gift Modal & Lightbox Light-Dismiss Fallback
     ------------------------------------------------------------------------ */
  const qrTrigger = document.getElementById('qr-box-trigger');
  const qrDialog = document.getElementById('qr-dialog');
  const qrCopyBtn = document.getElementById('qr-copy-btn');

  if (qrTrigger && qrDialog) {
    qrTrigger.addEventListener('click', () => qrDialog.showModal());
  }

  if (qrCopyBtn) {
    qrCopyBtn.addEventListener('click', () => {
      const accNo = cfg.bank?.accountNumber || '0869259444';
      navigator.clipboard?.writeText(accNo).then(() => {
        qrCopyBtn.textContent = 'Đã sao chép STK!';
        setTimeout(() => {
          qrCopyBtn.textContent = 'Sao chép số tài khoản';
        }, 1800);
      });
    });
  }

  document.querySelectorAll('dialog.meli-dialog').forEach((dlg) => {
    const closeBtn = dlg.querySelector('[data-close-dialog]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => dlg.close());
    }
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dlg.addEventListener('click', (event) => {
        if (event.target !== dlg) return;
        const rect = dlg.getBoundingClientRect();
        const inside =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!inside) dlg.close();
      });
    }
  });

  /* ------------------------------------------------------------------------
     9. Guestbook (Sổ Lưu Bút) — Google Sheets + Local Fallback + Auto-Scroll
     ------------------------------------------------------------------------ */
  const gbForm = document.getElementById('guestbook-form');
  const gbListWrap = document.getElementById('gb-list-wrap');
  const gbList = document.getElementById('gb-list');
  const GB_STORAGE_KEY = 'meli_clone_guestbook_v1';
  const sheetApiUrl = (cfg.googleSheetApiUrl || '').trim();

  function postToSheet(payload) {
    if (!sheetApiUrl) return Promise.resolve();
    // Dùng text/plain để tránh CORS preflight OPTIONS trên Google Apps Script
    return fetch(sheetApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }

  const defaultMessages = [
    { name: 'Quỳnh Anh', side: 'nha_gai', message: 'Chúc mừng hai bạn! Hạnh phúc trọn đời nhé.' },
    { name: 'Minh Đức', side: 'nha_trai', message: 'Chúc đôi vợ chồng son sắt, vạn sự như ý.' },
    { name: 'Linh', side: 'nha_gai', message: 'Chúc đám cưới vui vẻ.' },
  ];

  function loadMessages() {
    try {
      const saved = JSON.parse(localStorage.getItem(GB_STORAGE_KEY) || 'null');
      return Array.isArray(saved) && saved.length ? saved : defaultMessages;
    } catch {
      return defaultMessages;
    }
  }

  function renderMessages(items) {
    if (!gbList) return;
    gbList.replaceChildren();
    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'gb-msg';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'gb-name';
      nameDiv.textContent = item.name + ' ';

      const badge = document.createElement('span');
      badge.className = `gb-side gb-side--${item.side}`;
      badge.textContent = item.side === 'nha_trai' ? '🤵 Nhà trai' : '👰 Nhà gái';
      nameDiv.appendChild(badge);

      const textDiv = document.createElement('div');
      textDiv.className = 'gb-text';
      textDiv.textContent = item.message;

      row.append(nameDiv, textDiv);
      gbList.appendChild(row);
    });
  }

  if (gbForm && gbList && gbListWrap) {
    let messages = loadMessages();
    renderMessages(messages);

    if (sheetApiUrl) {
      fetch(sheetApiUrl)
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.guestbook) && data.guestbook.length) {
            messages = data.guestbook;
            renderMessages(messages);
            try {
              localStorage.setItem(GB_STORAGE_KEY, JSON.stringify(messages));
            } catch {}
          }
        })
        .catch(() => {});
    }

    gbForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('gb-name');
      const msgInput = document.getElementById('gb-msg');
      const sideInput = gbForm.querySelector('input[name="gb-side-radio"]:checked');
      const name = (nameInput?.value || '').trim();
      const message = (msgInput?.value || '').trim();
      const side = sideInput?.value || 'nha_trai';
      if (!name) {
        nameInput?.focus();
        return;
      }
      if (!message) {
        msgInput?.focus();
        return;
      }

      messages = [{ name, side, message }, ...messages];
      try {
        localStorage.setItem(GB_STORAGE_KEY, JSON.stringify(messages));
      } catch {}
      renderMessages(messages);
      if (msgInput) msgInput.value = '';

      postToSheet({ type: 'guestbook', name, side, message });
    });

    if (!reducedMotion) {
      let pauseUntil = 0;
      const pause = () => {
        pauseUntil = Date.now() + 2200;
      };
      gbListWrap.addEventListener('mouseenter', pause);
      gbListWrap.addEventListener('touchstart', pause, { passive: true });
      setInterval(() => {
        if (Date.now() < pauseUntil) return;
        if (gbListWrap.scrollHeight <= gbListWrap.clientHeight + 4) return;
        gbListWrap.scrollTop += 0.5;
        if (
          gbListWrap.scrollTop + gbListWrap.clientHeight >=
          gbListWrap.scrollHeight - 1
        ) {
          gbListWrap.scrollTop = 0;
        }
      }, 30);
    }
  }

  /* ------------------------------------------------------------------------
     10. RSVP Form
     ------------------------------------------------------------------------ */
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    const rsvpName = document.getElementById('rsvp-name');
    const handleRsvp = (attending) => {
      const name = (rsvpName?.value || '').trim();
      if (!name) {
        rsvpName?.setCustomValidity('Vui lòng nhập họ và tên của bạn.');
        rsvpName?.reportValidity();
        rsvpName?.focus();
        return;
      }
      const statusText = attending
        ? `Cảm ơn ${name}! Chúng mình rất mong được đón tiếp bạn.`
        : `Cảm ơn ${name}! Tiếc quá khi bạn không thể tham dự.`;

      const box = document.createElement('div');
      box.setAttribute('role', 'status');
      box.style.cssText = 'padding: 18px 12px; text-align: center;';
      box.innerHTML =
        '<div style="font-size:34px;line-height:1;margin-bottom:8px;">💌</div>' +
        '<h3 style="margin:0 0 4px;font-size:20px;">Cảm ơn bạn!</h3>';
      const p = document.createElement('p');
      p.style.cssText = 'margin:0;opacity:.8;font-size:14px;';
      p.textContent = statusText;
      box.appendChild(p);

      rsvpForm.replaceChildren(box);
      postToSheet({ type: 'rsvp', name, attending });
    };

    rsvpName?.addEventListener('input', () => rsvpName.setCustomValidity(''));
    rsvpForm
      .querySelector('.yes')
      ?.addEventListener('click', () => handleRsvp(true));
    rsvpForm
      .querySelector('.no')
      ?.addEventListener('click', () => handleRsvp(false));
  }
})();
