// Gameverse - Cinematic Console Startup Intro (PlayStation / Xbox Style)
(function () {
  'use strict';

  // Helpers
  const $ = (s, ctx = document) => ctx.querySelector(s);

  // Sintetizador Web Audio API para o chime de boot do console
  class ConsoleAudio {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('gv_intro_muted') === 'true';
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('gv_intro_muted', String(this.muted));
      return this.muted;
    }

    playBootSequence() {
      if (this.muted) return;
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        // 1. Sub Bass Drone (grave profundo estilo PS2/Xbox)
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(55, now);
        subOsc.frequency.exponentialRampToValueAtTime(110, now + 1.1);
        subOsc.frequency.exponentialRampToValueAtTime(73.42, now + 2.5);

        subGain.gain.setValueAtTime(0.0001, now);
        subGain.gain.exponentialRampToValueAtTime(0.35, now + 0.6);
        subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        subOsc.connect(subGain);
        subGain.connect(this.ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 2.9);

        // 2. Cosmic Shimmer Pad (acorde etéreo Dmaj9: D, F#, A, C#, E)
        const chordFreqs = [146.83, 220.0, 277.18, 329.63, 440.0, 554.37];
        chordFreqs.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now + 0.25);

          gain.gain.setValueAtTime(0.0001, now + 0.25);
          gain.gain.exponentialRampToValueAtTime(0.05 / (idx + 1), now + 1.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.7);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + 0.25);
          osc.stop(now + 2.8);
        });

        // 3. Cristal Glass Chime (o "ding" no instante em que o logo converge aos 1.35s)
        const chimeTimes = [1.3, 1.38, 1.46];
        const chimeFreqs = [880, 1318.51, 1760]; // A5, E6, A6
        chimeFreqs.forEach((freq, i) => {
          const cOsc = this.ctx.createOscillator();
          const cGain = this.ctx.createGain();
          cOsc.type = 'sine';
          cOsc.frequency.setValueAtTime(freq, now + chimeTimes[i]);

          cGain.gain.setValueAtTime(0.0001, now + chimeTimes[i]);
          cGain.gain.exponentialRampToValueAtTime(0.14, now + chimeTimes[i] + 0.03);
          cGain.gain.exponentialRampToValueAtTime(0.0001, now + chimeTimes[i] + 1.3);

          cOsc.connect(cGain);
          cGain.connect(this.ctx.destination);
          cOsc.start(now + chimeTimes[i]);
          cOsc.stop(now + chimeTimes[i] + 1.4);
        });
      } catch (err) {
        // Ignora silenciosamente se o navegador bloquear autoplay
      }
    }
  }

  const audio = new ConsoleAudio();

  // Criação dos elementos DOM da Cinematic Intro
  function buildIntroDOM() {
    let overlay = $('#gvCinematicIntro');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'gvCinematicIntro';
    overlay.className = 'gv-intro-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Abertura Cinematográfica Gameverse');

    overlay.innerHTML = `
      <canvas id="gvIntroCanvas" class="gv-intro-canvas"></canvas>

      <!-- Barra de Controle Superior (Som e Pular) -->
      <div class="gv-intro-skip-bar">
        <button id="gvIntroAudioToggle" class="gv-skip-btn sound-btn" aria-label="Ativar ou desativar áudio">
          <span class="icon">${audio.muted ? '🔇' : '🔊'}</span>
          <span class="label">${audio.muted ? 'Mudo' : 'Som'}</span>
        </button>
        <button id="gvIntroSkipBtn" class="gv-skip-btn" aria-label="Pular introdução">
          <span>Pular</span>
          <kbd>ESC</kbd>
        </button>
      </div>

      <!-- Palco Central Cinematográfico -->
      <div class="gv-intro-stage">
        <!-- Grade de perspectiva estilo Tron/Console -->
        <div class="gv-grid-floor"></div>

        <!-- Container do Logo -->
        <div class="gv-intro-logo-wrap" id="gvIntroLogoWrap">
          <!-- Ondas de choque neon -->
          <div class="gv-shockwave wave-1"></div>
          <div class="gv-shockwave wave-2"></div>
          
          <!-- Marca do Console: Ícone do Controle + Texto GAMEVERSE -->
          <div class="gv-intro-brand">
            <div class="gv-intro-icon-box">
              <svg class="gv-intro-controller" viewBox="0 0 100 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="introCtrlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#9d65ff" />
                    <stop offset="50%" stop-color="#7c4dff" />
                    <stop offset="100%" stop-color="#5a24eb" />
                  </linearGradient>
                  <filter id="introCtrlGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <!-- Corpo curvado do controle gamer -->
                <path d="M28 15 C38 11, 62 11, 72 15 C85 20, 95 34, 91 56 C88 72, 75 76, 65 68 L57 60 C53 58, 47 58, 43 60 L35 68 C25 76, 12 72, 9 56 C5 34, 15 20, 28 15 Z" 
                      fill="url(#introCtrlGrad)" filter="url(#introCtrlGlow)" />
                <!-- D-Pad minimalista -->
                <rect x="23" y="32" width="6" height="14" rx="2" fill="#131326" />
                <rect x="19" y="36" width="14" height="6" rx="2" fill="#131326" />
                <!-- Botões de ação neon (estilo PlayStation/Xbox) -->
                <circle cx="73" cy="33" r="2.8" fill="#00e5ff" />
                <circle cx="79" cy="39" r="2.8" fill="#ff3d71" />
                <circle cx="67" cy="39" r="2.8" fill="#00e676" />
                <circle cx="73" cy="45" r="2.8" fill="#ffc400" />
                <!-- Analógicos com anel neon -->
                <circle cx="36" cy="46" r="6.5" fill="#15152a" stroke="#7c4dff" stroke-width="1.8" />
                <circle cx="64" cy="46" r="6.5" fill="#15152a" stroke="#00e5ff" stroke-width="1.8" />
              </svg>
            </div>

            <div class="gv-intro-title-box">
              <h1 class="gv-intro-title">GAMEVERSE</h1>
              <!-- Flash de Laser / Lens Flare que percorre o texto -->
              <div class="gv-intro-lens-flare"></div>
            </div>
          </div>

          <!-- Subtítulo de Boot do Sistema -->
          <div class="gv-intro-tagline">
            <span class="dot"></span>
            <span class="text">SYSTEM READY • LEVEL UP YOUR SETUP</span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    return overlay;
  }

  // Animação de Partículas Espaciais no Canvas
  function initParticleCanvas(canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // 55 partículas estelares com efeito de profundidade warp
    const particles = [];
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 800 + 100,
        size: Math.random() * 2 + 0.8,
        color: Math.random() > 0.4 ? '#00e5ff' : '#7c4dff'
      });
    }

    let speed = 2.5;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ponto de fuga central
      const cx = width / 2;
      const cy = height / 2;

      particles.forEach(p => {
        p.z -= speed;
        if (p.z <= 0) {
          p.z = 800;
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }

        const k = 250 / p.z;
        const px = (p.x - cx) * k + cx;
        const py = (p.y - cy) * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, (800 - p.z) / 400);
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.arc(px, py, p.size * k * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return {
      destroy: () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', onResize);
      },
      setWarpSpeed: (s) => {
        speed = s;
      }
    };
  }

  // Executa a Cinematic
  function playCinematic(force = false) {
    // Se não for forçado, checa se já rodou na sessão
    if (!force) {
      const alreadySeen = sessionStorage.getItem('gv_intro_played');
      const urlParams = new URLSearchParams(window.location.search);
      const requestedInUrl = urlParams.get('intro') === '1';

      if (alreadySeen && !requestedInUrl) {
        return;
      }
    }

    sessionStorage.setItem('gv_intro_played', 'true');

    const overlay = buildIntroDOM();
    const canvas = $('#gvIntroCanvas', overlay);
    const particlesCtrl = initParticleCanvas(canvas);

    // Reseta classes de estado
    overlay.classList.remove('hiding');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Inicia o áudio sincronizado
    audio.playBootSequence();

    let isDone = false;
    const finish = () => {
      if (isDone) return;
      isDone = true;

      // Aumenta a velocidade do warp para transição fluida
      if (particlesCtrl) particlesCtrl.setWarpSpeed(18);

      overlay.classList.add('hiding');

      setTimeout(() => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (particlesCtrl) particlesCtrl.destroy();
      }, 550);
    };

    // Duração total da cinematic: 2.8s
    const timer = setTimeout(finish, 2800);

    // Eventos para pular (ESC, Espaço, Enter ou clique no botão/overlay)
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        clearTimeout(timer);
        window.removeEventListener('keydown', onKey);
        finish();
      }
    };
    window.addEventListener('keydown', onKey);

    const skipBtn = $('#gvIntroSkipBtn', overlay);
    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearTimeout(timer);
        finish();
      });
    }

    // Clique na tela ativa o áudio caso o navegador tenha bloqueado, ou pula se o usuário quiser
    overlay.addEventListener('click', (e) => {
      if (e.target.closest('#gvIntroAudioToggle')) return;
      if (e.target.closest('#gvIntroSkipBtn')) return;
      // Destrava áudio caso não tenha iniciado
      audio.init();
      // Pula instantaneamente
      clearTimeout(timer);
      finish();
    });

    // Botão de Mudo / Som
    const audioBtn = $('#gvIntroAudioToggle', overlay);
    if (audioBtn) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMuted = audio.toggleMute();
        const icon = $('.icon', audioBtn);
        const label = $('.label', audioBtn);
        if (icon) icon.textContent = isMuted ? '🔇' : '🔊';
        if (label) label.textContent = isMuted ? 'Mudo' : 'Som';
        if (!isMuted) audio.playBootSequence();
      });
    }
  }

  // Inicialização
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => playCinematic(false));
  } else {
    playCinematic(false);
  }

  // API global para disparar a qualquer momento (ex: menu lateral ou rodapé)
  window.GameverseCinematic = {
    play: () => playCinematic(true)
  };
})();

