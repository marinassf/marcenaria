/* ==========================================================================
   S & A — NÚCLEO DO SITE
   --------------------------------------------------------------------------
   Módulos:
   SA.utils      — utilitários (escape, imagens responsivas, links)
   SA.header     — comportamento do header durante a rolagem
   SA.menu       — menu mobile
   SA.reveal     — animações de entrada ao rolar
   SA.contact    — links de WhatsApp e dados de contato a partir do config.js
   SA.transitions— transição suave entre páginas
   Os demais módulos (catálogo, lightbox, materiais, formulário) ficam em
   render.js e form.js e usam as funções expostas aqui.
   ========================================================================== */
(function () {
  'use strict';

  var SA = (window.SA = window.SA || {});
  var SITE = window.SITE || {};
  var doc = document;
  var root = doc.documentElement;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Caminho até a raiz do site ('' na home, '../' nas páginas internas) */
  SA.root = root.getAttribute('data-root') || '';

  /* ------------------------------------------------------------------------
     UTILS
     ------------------------------------------------------------------------ */
  SA.utils = {
    esc: function (str) {
      return String(str == null ? '' : str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },

    pad: function (n) { return (n < 10 ? '0' : '') + n; },

    /* Gera src/srcset para uma imagem.
       src: 'unsplash:<id>'  → imagem provisória do Unsplash em WebP/AVIF automático
            'assets/...'     → arquivo do site (caminho a partir da raiz)
       ratio: proporção largura/altura para recorte (somente Unsplash) */
    image: function (src, ratio) {
      if (!src) return null;
      if (src.indexOf('unsplash:') === 0) {
        var id = src.slice(9);
        var base = 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&q=78';
        var widths = [480, 800, 1200, 1600, 2200];
        var make = function (w) {
          return base + '&w=' + w + (ratio ? '&h=' + Math.round(w / ratio) : '');
        };
        return {
          src: make(1200),
          srcset: widths.map(function (w) { return make(w) + ' ' + w + 'w'; }).join(', '),
          large: base + '&w=2400',
          external: true
        };
      }
      var path = /^(https?:)?\/\//.test(src) ? src : SA.root + src;
      return { src: path, srcset: '', large: path, external: false };
    },

    /* HTML de <img> responsivo */
    imgTag: function (img, opts) {
      opts = opts || {};
      if (!img || !img.src) return '';
      var data = SA.utils.image(img.src, opts.ratio);
      var attrs = [
        'src="' + SA.utils.esc(data.src) + '"',
        data.srcset ? 'srcset="' + SA.utils.esc(data.srcset) + '"' : '',
        data.srcset ? 'sizes="' + SA.utils.esc(opts.sizes || '(max-width: 640px) 100vw, 60vw') + '"' : '',
        'alt="' + SA.utils.esc(img.alt || '') + '"',
        opts.eager ? 'fetchpriority="high"' : 'loading="lazy"',
        'decoding="async"',
        opts.width ? 'width="' + opts.width + '"' : '',
        opts.height ? 'height="' + opts.height + '"' : ''
      ];
      return '<img ' + attrs.filter(Boolean).join(' ') + '>';
    },

    whatsappUrl: function (mensagem) {
      var num = String(SITE.whatsapp || '').replace(/\D/g, '');
      if (!num) return '';
      var msg = mensagem || SITE.whatsappMensagem || '';
      return 'https://wa.me/' + num + (msg ? '?text=' + encodeURIComponent(msg) : '');
    },

    param: function (name) {
      try { return new URLSearchParams(window.location.search).get(name); }
      catch (e) { return null; }
    },

    categoria: function (id) {
      var list = window.CATEGORIAS || [];
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
      return { id: id, nome: id };
    },

    roll: function (text) {
      var t = SA.utils.esc(text);
      return '<span class="roll"><span data-text="' + t + '">' + t + '</span></span>';
    },

    arrow: '<svg class="arrow" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 9.5l7-7M3.5 2.5h6v6" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>'
  };

  /* ------------------------------------------------------------------------
     HEADER — troca de cor sobre seções claras e logo oculto sobre o hero
     Seções com data-theme="light" ou "sand" deixam o header escuro.
     ------------------------------------------------------------------------ */
  SA.header = (function () {
    var el = doc.querySelector('[data-header]');
    if (!el) return {};
    var hero = doc.querySelector('.hero');
    var ticking = false;

    function update() {
      var probe = el.offsetHeight / 2;
      var light = false;
      var sections = doc.querySelectorAll('[data-theme]');
      for (var i = 0; i < sections.length; i++) {
        var r = sections[i].getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) {
          var t = sections[i].getAttribute('data-theme');
          light = (t === 'light' || t === 'sand');
        }
      }
      el.classList.toggle('on-light', light && !doc.body.classList.contains('menu-open'));
      if (hero) el.classList.toggle('at-hero', hero.getBoundingClientRect().bottom > el.offsetHeight * 2);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
    return { el: el, update: update };
  })();

  /* ------------------------------------------------------------------------
     EFEITOS DE ROLAGEM (desativados com prefers-reduced-motion)
     SA.hero    — letras do título, ajuste de tamanho e parallax
     SA.scrub   — palavras que acendem conforme a rolagem [data-scrub]
     SA.expand  — imagem que cresce até ocupar a tela [data-expand]
     ------------------------------------------------------------------------ */
  SA.hero = (function () {
    var hero = doc.querySelector('.hero');
    if (!hero) return {};
    var words = hero.querySelectorAll('.hero__word');
    var bottom = hero.querySelector('.hero__word--bottom');

    /* divide cada palavra em letras para a animação de entrada */
    Array.prototype.forEach.call(words, function (w) {
      var text = w.textContent.trim();
      w.setAttribute('aria-label', text);
      w.innerHTML = '<span class="hero__word-mask" aria-hidden="true">' + text.split('').map(function (c, i) {
        return '<span class="ch" style="transition-delay:' + (i * 45 + 120) + 'ms">' + (c === ' ' ? '&nbsp;' : SA.utils.esc(c)) + '</span>';
      }).join('') + '</span>';
    });

    /* ajusta o tamanho para a palavra mais longa ocupar a largura da tela */
    function fit() {
      if (!bottom) return;
      hero.style.setProperty('--hero-fs', '100px');
      var inner = bottom.querySelector('.hero__word-mask') || bottom;
      var w = inner.getBoundingClientRect().width || bottom.scrollWidth;
      var box = hero.querySelector('.hero__content');
      var target = box ? box.clientWidth : window.innerWidth * .92;
      var size = Math.min(100 * target / w, 300);
      hero.style.setProperty('--hero-fs', size.toFixed(2) + 'px');
    }
    fit();
    window.addEventListener('resize', fit);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(fit);

    if (!reducedMotion.matches) {
      var t = false;
      window.addEventListener('scroll', function () {
        if (t) return; t = true;
        window.requestAnimationFrame(function () {
          var p = Math.min(Math.max(window.scrollY / hero.offsetHeight, 0), 1);
          hero.style.setProperty('--hp', p.toFixed(3));
          t = false;
        });
      }, { passive: true });
    }
    /* Vídeo: não toca para quem pediu menos movimento e pausa fora da tela */
    var video = hero.querySelector('video');
    if (video) {
      var play = function () { var pr = video.play(); if (pr && pr.catch) pr.catch(function () {}); };
      if (reducedMotion.matches) { video.removeAttribute('autoplay'); video.pause(); }
      else if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) {
          if (en[0].isIntersecting) play(); else video.pause();
        }).observe(hero);
      }
    }

    return { fit: fit };
  })();

  SA.scrub = (function () {
    var els = doc.querySelectorAll('[data-scrub]');
    if (!els.length) return {};
    var items = [];
    Array.prototype.forEach.call(els, function (el) {
      /* divide em palavras preservando os blocos internos (.first / .rest) */
      var blocks = el.children.length ? el.children : [el];
      var words = [];
      Array.prototype.forEach.call(blocks, function (b) {
        var parts = b.textContent.trim().split(/\s+/);
        b.innerHTML = parts.map(function (w) { return '<span class="w">' + SA.utils.esc(w) + '</span>'; }).join(' ');
        words = words.concat(Array.prototype.slice.call(b.querySelectorAll('.w')));
      });
      items.push({ el: el, words: words });
    });
    if (reducedMotion.matches) return {};

    function update() {
      var vh = window.innerHeight;
      items.forEach(function (it) {
        var r = it.el.getBoundingClientRect();
        /* começa quando o topo chega a 85% da tela e termina quando o fim chega a 45% */
        var start = vh * .85, end = vh * .45;
        var total = (r.height) + (start - end);
        var p = Math.min(Math.max((start - r.top) / total, 0), 1);
        var n = it.words.length;
        it.words.forEach(function (w, i) {
          var o = Math.min(Math.max(p * n * 1.15 - i, 0), 1);
          w.style.setProperty('--o', o.toFixed(2));
        });
      });
    }
    var t = false;
    window.addEventListener('scroll', function () {
      if (t) return; t = true;
      window.requestAnimationFrame(function () { update(); t = false; });
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
    return { update: update };
  })();

  SA.expand = (function () {
    var els = doc.querySelectorAll('[data-expand]');
    if (!els.length || reducedMotion.matches) return {};
    function update() {
      var vh = window.innerHeight;
      Array.prototype.forEach.call(els, function (el) {
        var frame = el.querySelector('.expand__frame');
        var r = el.getBoundingClientRect();
        var range = el.offsetHeight - vh;
        var p = Math.min(Math.max((-r.top + vh * .25) / (range * .8 + vh * .25), 0), 1);
        /* suaviza o fim do movimento */
        p = 1 - Math.pow(1 - p, 2);
        frame.style.setProperty('--e', p.toFixed(3));
      });
    }
    var t = false;
    window.addEventListener('scroll', function () {
      if (t) return; t = true;
      window.requestAnimationFrame(function () { update(); t = false; });
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
    return { update: update };
  })();

  /* ------------------------------------------------------------------------
     MENU MOBILE
     ------------------------------------------------------------------------ */
  SA.menu = (function () {
    var toggle = doc.querySelector('[data-menu-toggle]');
    var menu = doc.getElementById('mobile-menu');
    if (!toggle || !menu) return {};
    var label = toggle.querySelector('[data-menu-label]');
    var isOpen = false;

    function focusables() {
      return Array.prototype.slice.call(menu.querySelectorAll('a[href], button'));
    }

    function open() {
      isOpen = true;
      menu.hidden = false;
      // força reflow para a transição acontecer
      void menu.offsetWidth;
      menu.classList.add('is-open');
      menu.removeAttribute('inert');
      doc.body.classList.add('menu-open');
      doc.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
      if (label) label.textContent = 'Fechar';
      var first = focusables()[0];
      if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 350);
      if (SA.header.update) SA.header.update();
    }

    function close(returnFocus) {
      isOpen = false;
      menu.classList.remove('is-open');
      menu.setAttribute('inert', '');
      doc.body.classList.remove('menu-open');
      doc.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
      if (label) label.textContent = 'Menu';
      if (returnFocus) toggle.focus();
      if (SA.header.update) SA.header.update();
    }

    menu.setAttribute('inert', '');
    menu.hidden = false;

    toggle.addEventListener('click', function () { isOpen ? close(true) : open(); });

    doc.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape') { close(true); return; }
      if (e.key === 'Tab') {
        var items = [toggle].concat(focusables());
        var i = items.indexOf(doc.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) close(false);
    });

    window.matchMedia('(min-width: 961px)').addEventListener('change', function (mq) {
      if (mq.matches && isOpen) close(false);
    });

    return { open: open, close: close };
  })();

  /* ------------------------------------------------------------------------
     REVEAL — revela elementos com [data-reveal] quando entram na tela
     ------------------------------------------------------------------------ */
  SA.reveal = (function () {
    var io = null;
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }

    function observe(scope) {
      var els = (scope || doc).querySelectorAll('[data-reveal]:not(.is-in)');
      Array.prototype.forEach.call(els, function (el) {
        if (io) io.observe(el);
        else el.classList.add('is-in');
      });
    }

    return { observe: observe };
  })();

  /* ------------------------------------------------------------------------
     CONTATO — aplica dados do config.js em toda a página
     [data-whatsapp]            → link de WhatsApp (data-whatsapp-msg opcional)
     [data-site="campo"]        → texto/link a partir de SITE.campo
     [data-site-block="campo"]  → bloco oculto quando SITE.campo estiver vazio
     ------------------------------------------------------------------------ */
  SA.contact = (function () {
    function apply(scope) {
      scope = scope || doc;

      Array.prototype.forEach.call(scope.querySelectorAll('[data-whatsapp]'), function (a) {
        var url = SA.utils.whatsappUrl(a.getAttribute('data-whatsapp-msg'));
        if (url) {
          a.href = url;
          a.target = '_blank';
          a.rel = 'noopener';
        } else {
          // Sem número configurado: leva ao formulário de contato
          a.href = SA.root + 'pages/contato.html#formulario';
          a.removeAttribute('target');
          a.setAttribute('data-whatsapp-pending', '');
        }
      });

      Array.prototype.forEach.call(scope.querySelectorAll('[data-site-block]'), function (el) {
        var key = el.getAttribute('data-site-block');
        if (!SITE[key]) el.hidden = true;
      });

      Array.prototype.forEach.call(scope.querySelectorAll('[data-site]'), function (el) {
        var key = el.getAttribute('data-site');
        var val = SITE[key];
        if (!val) return;
        if (key === 'email') { el.textContent = val; if (el.tagName === 'A') el.href = 'mailto:' + val; }
        else if (key === 'instagram') {
          if (el.tagName === 'A') { el.href = val; el.target = '_blank'; el.rel = 'noopener'; }
          el.textContent = SITE.instagramUsuario || val.replace(/^https?:\/\/(www\.)?/, '');
        }
        else if (key === 'telefoneExibicao') {
          el.textContent = val;
          var wa = SA.utils.whatsappUrl();
          if (el.tagName === 'A' && wa) { el.href = wa; el.target = '_blank'; el.rel = 'noopener'; }
        }
        else if (key === 'mapaUrl') { if (el.tagName === 'A') { el.href = val; el.target = '_blank'; el.rel = 'noopener'; } }
        else el.textContent = val;
      });

      Array.prototype.forEach.call(scope.querySelectorAll('[data-year]'), function (el) {
        el.textContent = new Date().getFullYear();
      });
    }
    apply();
    return { apply: apply };
  })();

  /* ------------------------------------------------------------------------
     TRANSIÇÕES ENTRE PÁGINAS
     Navegadores com View Transitions entre documentos usam CSS (@view-transition).
     Nos demais, aplicamos um fade curto antes de navegar.
     ------------------------------------------------------------------------ */
  SA.transitions = (function () {
    var nativeVT = 'onpagereveal' in window;
    if (nativeVT || reducedMotion.matches) return {};

    doc.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download')) return;
      var url;
      try { url = new URL(a.href, window.location.href); } catch (err) { return; }
      if (url.origin !== window.location.origin && url.protocol !== 'file:') return;
      if (url.protocol !== window.location.protocol) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return; // âncoras
      e.preventDefault();
      doc.body.classList.add('is-leaving');
      setTimeout(function () { window.location.href = url.href; }, 260);
    });

    window.addEventListener('pageshow', function (e) {
      if (e.persisted) doc.body.classList.remove('is-leaving');
    });
    return {};
  })();

  /* ------------------------------------------------------------------------
     INICIALIZAÇÃO
     ------------------------------------------------------------------------ */
  function onReady() {
    SA.reveal.observe();
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { doc.body.classList.add('is-loaded'); });
    });
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', onReady);
  else onReady();
})();
