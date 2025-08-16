(function () {
  const AUDIO_ID = 'site-bgm';
  const KEY_TIME = 'bgm-current-time';
  const KEY_VOL  = 'bgm-volume';
  const KEY_PLAYED = 'bgm-ever-started';
  const SAVE_INTERVAL_MS = 2000;
  const FADE_MS = 600;

  const audio = document.getElementById(AUDIO_ID);
  if (!audio) return;

  const savedVol = parseFloat(localStorage.getItem(KEY_VOL));
  audio.volume = Number.isFinite(savedVol) ? Math.min(1, Math.max(0, savedVol)) : 0.9;

  function tryRestoreTime() {
    const t = parseFloat(localStorage.getItem(KEY_TIME));
    if (!Number.isFinite(t) || !audio.duration) return;
    const dur = audio.duration;
    const target = ((t % dur) + dur) % dur;
    try { audio.currentTime = target; } catch(_) {}
  }

  let saver = null;
  function startSaver() {
    if (saver) return;
    saver = setInterval(() => {
      if (!audio.paused && !audio.seeking) {
        localStorage.setItem(KEY_TIME, String(audio.currentTime));
      }
    }, SAVE_INTERVAL_MS);
  }
  function stopSaver() {
    if (saver) clearInterval(saver);
    saver = null;
  }

  window.addEventListener('beforeunload', () => {
    localStorage.setItem(KEY_TIME, String(audio.currentTime || 0));
    localStorage.setItem(KEY_VOL, String(audio.volume));
  });

  audio.addEventListener('canplay', tryRestoreTime, { once: true });

  function fadeInPlay() {
    if (!audio.paused) return Promise.resolve();
    const targetVol = audio.volume;
    audio.volume = 0.0001;
    return audio.play().then(() => {
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / FADE_MS);
        audio.volume = targetVol * p;
        if (p < 1 && !audio.paused) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      startSaver();
      localStorage.setItem(KEY_PLAYED, '1');
    });
  }

  fadeInPlay().catch(() => {
    if (localStorage.getItem(KEY_PLAYED) === '1') {
      fadeInPlay().catch(showPlayButton);
    } else {
      showPlayButton();
    }
  });

  function showPlayButton() {
    const fab = document.getElementById('bgm-fab');
    const btn = document.getElementById('bgm-play-btn');
    if (!fab || !btn) return;
    fab.style.display = 'block';
    const activate = () => {
      btn.disabled = true;
      fadeInPlay().finally(() => {
        fab.style.display = 'none';
        btn.removeEventListener('click', activate);
      });
    };
    btn.addEventListener('click', activate);
  }

  const fireOnce = () => {
    fadeInPlay().finally(() => {
      removeInteractionListeners();
    });
  };
  function addInteractionListeners() {
    window.addEventListener('pointerdown', fireOnce, { passive: true });
    window.addEventListener('keydown', fireOnce);
    window.addEventListener('touchstart', fireOnce, { passive: true });
  }
  function removeInteractionListeners() {
    window.removeEventListener('pointerdown', fireOnce);
    window.removeEventListener('keydown', fireOnce);
    window.removeEventListener('touchstart', fireOnce);
  }
  addInteractionListeners();

  window.addEventListener('keydown', (e) => {
    if (!e.ctrlKey) return;
    if (e.key === 'ArrowUp') {
      audio.volume = Math.min(1, audio.volume + 0.05);
      localStorage.setItem(KEY_VOL, String(audio.volume));
    } else if (e.key === 'ArrowDown') {
      audio.volume = Math.max(0, audio.volume - 0.05);
      localStorage.setItem(KEY_VOL, String(audio.volume));
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSaver();
      localStorage.setItem(KEY_TIME, String(audio.currentTime || 0));
    } else if (!audio.paused) {
      startSaver();
    }
  });
})();