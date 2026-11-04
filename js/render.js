/* ==========================================================================
   S & A — RENDERIZAÇÃO DE CONTEÚDO
   --------------------------------------------------------------------------
   Lê os dados de projects.js e materials.js e monta:
   SA.featured   — projetos em destaque (home)
   SA.brands     — marcas de MDF (home e materiais)
   SA.catalog    — catálogo com filtros (pages/projetos.html)
   SA.project    — página individual (pages/projeto.html?p=slug)
   SA.materials  — página de materiais (marcas de MDF)
   SA.lightbox   — visualização ampliada das imagens
   Cada módulo só roda se o container correspondente existir na página.
   ========================================================================== */
(function () {
  'use strict';

  var SA = window.SA;
  var U = SA.utils;
  var esc = U.esc;
  var doc = document;
  var PROJETOS = window.PROJETOS || [];

  function projectUrl(p) { return SA.root + 'pages/projeto.html?p=' + encodeURIComponent(p.slug); }
  function prov(flag, kind) { return flag ? ' data-provisorio="' + kind + '"' : ''; }

  function finish(scope) {
    SA.reveal.observe(scope);
    SA.contact.apply(scope);
  }

  /* ------------------------------------------------------------------------
     PROJETOS EM DESTAQUE — home
     ------------------------------------------------------------------------ */
  function card(p, i, opts) {
    opts = opts || {};
    return '' +
      '<a class="card" href="' + esc(projectUrl(p)) + '"' + (opts.delay ? ' style="animation-delay:' + opts.delay + 'ms"' : '') + '>' +
        '<div class="card__media" data-reveal="media"' + prov(p.provisorio, 'imagem') + '>' +
          U.imgTag(p.capa, { ratio: opts.ratio || 5 / 4, eager: opts.eager, sizes: '(max-width: 640px) 100vw, 50vw' }) +
        '</div>' +
        '<div class="card__meta">' +
          '<h3 class="card__title">' + U.roll(p.titulo) + '</h3>' +
          '<div class="pills">' +
            '<span class="pill">' + esc(U.categoria(p.categoria).nome) + '</span>' +
            '<span class="pill pill--num">' + U.pad(i + 1) + '</span>' +
          '</div>' +
        '</div>' +
      '</a>';
  }

  SA.featured = (function () {
    var el = doc.getElementById('featured-projects');
    if (!el) return;
    var list = PROJETOS.filter(function (p) { return p.destaque; }).slice(0, 4);
    if (list.length < 4) list = PROJETOS.slice(0, 4);
    el.innerHTML = list.map(function (p, i) { return card(p, i); }).join('');
    Array.prototype.forEach.call(doc.querySelectorAll('[data-project-count]'), function (c) { c.textContent = U.pad(PROJETOS.length); });
    finish(el);
  })();

  /* ------------------------------------------------------------------------
     MARCAS DE MDF — home e materiais ([data-mdf-brands])
     ------------------------------------------------------------------------ */
  function brandsHTML() {
    return (window.MARCAS_MDF || []).map(function (m, i) {
      return '' +
        '<article class="brand-card" data-reveal="up" style="--d:' + (i * 120) + 'ms">' +
          '<div class="brand-card__top">' +
            '<span class="pill pill--num">' + U.pad(i + 1) + '</span>' +
            (m.descricao ? '<span class="pill">' + esc(m.descricao) + '</span>' : '') +
          '</div>' +
          '<h3 class="brand-card__name">' + esc(m.nome) + '</h3>' +
          '<div class="brand-card__list">' +
            '<span class="eyebrow">Alguns padrões</span>' +
            '<ul role="list">' + (m.padroes || []).map(function (pd) { return '<li>' + esc(pd) + '</li>'; }).join('') + '</ul>' +
          '</div>' +
        '</article>';
    }).join('');
  }
  SA.brands = (function () {
    Array.prototype.forEach.call(doc.querySelectorAll('[data-mdf-brands]'), function (el) {
      el.innerHTML = brandsHTML();
      SA.reveal.observe(el);
    });
  })();

  /* ------------------------------------------------------------------------
     CATÁLOGO + FILTROS — pages/projetos.html
     ------------------------------------------------------------------------ */
  SA.catalog = (function () {
    var grid = doc.getElementById('catalog-grid');
    var filtersEl = doc.getElementById('catalog-filters');
    if (!grid || !filtersEl) return;
    var countEl = doc.getElementById('catalog-count');
    var cats = window.CATEGORIAS || [];
    var current = U.param('categoria') || 'todos';
    if (current !== 'todos' && !cats.some(function (c) { return c.id === current; })) current = 'todos';

    function countFor(id) {
      return id === 'todos' ? PROJETOS.length : PROJETOS.filter(function (p) { return p.categoria === id; }).length;
    }

    filtersEl.innerHTML = [{ id: 'todos', nome: 'Todos' }].concat(cats).map(function (c) {
      var n = countFor(c.id);
      return '<li><button type="button" class="filter-btn" data-filter="' + esc(c.id) + '" aria-pressed="false"' +
        (n === 0 ? ' disabled' : '') + '>' + esc(c.nome) + '<sup>' + U.pad(n) + '</sup></button></li>';
    }).join('');

    function render() {
      var list = current === 'todos' ? PROJETOS : PROJETOS.filter(function (p) { return p.categoria === current; });
      Array.prototype.forEach.call(filtersEl.querySelectorAll('[data-filter]'), function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === current));
      });
      if (countEl) {
        countEl.textContent = U.pad(list.length);
      }
      if (!list.length) {
        grid.innerHTML = '<p class="catalog__empty" style="grid-column:1/-1">Ainda não há projetos publicados nesta categoria.</p>';
        return;
      }
      grid.innerHTML = list.map(function (p, i) {
        return card(p, i, { eager: i < 2, delay: Math.min(i, 6) * 70 });
      }).join('');
      finish(grid);
    }

    filtersEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (!b || b.disabled) return;
      current = b.getAttribute('data-filter');
      try {
        var url = new URL(window.location.href);
        if (current === 'todos') url.searchParams.delete('categoria');
        else url.searchParams.set('categoria', current);
        window.history.replaceState(null, '', url.toString());
      } catch (err) { /* file:// em alguns navegadores */ }
      render();
      if (grid.getBoundingClientRect().top < 0) window.scrollTo({ top: window.scrollY + grid.getBoundingClientRect().top - 180 });
    });

    render();
  })();

  /* ------------------------------------------------------------------------
     PROJETO INDIVIDUAL — pages/projeto.html?p=slug
     ------------------------------------------------------------------------ */
  SA.project = (function () {
    var rootEl = doc.getElementById('project-root');
    if (!rootEl) return;
    var slug = U.param('p');
    var idx = -1;
    for (var i = 0; i < PROJETOS.length; i++) if (PROJETOS[i].slug === slug) { idx = i; break; }

    if (idx === -1) {
      doc.title = 'Projeto não encontrado | S & A Móveis Planejados';
      var robots = doc.createElement('meta');
      robots.name = 'robots'; robots.content = 'noindex';
      doc.head.appendChild(robots);
      rootEl.innerHTML = '' +
        '<section class="page-head container">' +
          '<div class="page-head__crumb"><a class="pill" href="projetos.html">Projetos</a><span class="pill">Não encontrado</span></div>' +
          '<div class="page-head__row"><h1 class="page-head__title t-3xl">Projeto não encontrado.</h1>' +
          '<div class="page-head__intro"><p>O endereço pode ter mudado ou o projeto não está mais publicado.</p>' +
          '<p><a class="btn" href="projetos.html">Ver todos os projetos ' + U.arrow + '</a></p></div></div>' +
        '</section>';
      return;
    }

    var p = PROJETOS[idx];
    var cat = U.categoria(p.categoria);
    var prev = PROJETOS[(idx - 1 + PROJETOS.length) % PROJETOS.length];
    var next = PROJETOS[(idx + 1) % PROJETOS.length];
    var gallery = (p.galeria && p.galeria.length ? p.galeria : [p.capa]);
    var galleryRatios = [4 / 5, 3 / 4, 21 / 9, 1, 4 / 5];

    /* SEO por projeto */
    var title = p.titulo + ' | ' + cat.nome + ' | S & A Móveis Planejados';
    doc.title = title;
    var setMeta = function (sel, val) { var m = doc.querySelector(sel); if (m) m.setAttribute('content', val); };
    setMeta('meta[name="description"]', p.resumo + ' Projeto de ' + cat.nome.toLowerCase() + ' da S & A Móveis Planejados, Tangará da Serra, MT.');
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', p.resumo);
    var cover = U.image(p.capa.src, 16 / 9);
    setMeta('meta[property="og:image"]', cover.src);

    var spec = function (arr) {
      return '<ul role="list">' + (arr || []).map(function (t, n) {
        return '<li><span class="pill pill--num">' + U.pad(n + 1) + '</span><span>' + esc(t) + '</span></li>';
      }).join('') + '</ul>';
    };

    rootEl.innerHTML = '' +
      '<section class="project-head container">' +
        '<div class="page-head__crumb"><a class="pill" href="projetos.html">Projetos</a>' +
          '<a class="pill" href="projetos.html?categoria=' + esc(cat.id) + '">' + esc(cat.nome) + '</a>' +
          '<span class="pill pill--num">' + U.pad(idx + 1) + ' / ' + U.pad(PROJETOS.length) + '</span>' +
          '</div>' +
        '<h1 class="t-3xl" data-reveal="up">' + esc(p.titulo) + '</h1>' +
        '<div class="project-head__meta">' +
          '<p class="t-lg" data-reveal="up" style="--d:100ms">' + esc(p.resumo) + '</p>' +
          '<div class="pills">' +
            '<span class="pill">' + esc(cat.nome) + '</span>' +
            (p.local ? '<span class="pill">' + esc(p.local) + '</span>' : '') +
          '</div>' +
        '</div>' +
      '</section>' +

      '<div class="project-cover">' +
        '<button type="button" class="gallery-btn" data-lightbox-index="0" aria-label="Ampliar imagem: ' + esc(p.capa.alt) + '">' +
          '<div class="media"' + prov(p.provisorio, 'imagem') + '>' +
            U.imgTag(p.capa, { ratio: 16 / 9, eager: true, sizes: '100vw' }) +
          '</div>' +
          '<span class="zoom-hint pill">Ampliar</span>' +
        '</button>' +
      '</div>' +

      '<section class="container">' +
        '<div class="project-body">' +
          '<h2 class="project-body__lead t-xl" data-reveal="up">Sobre o projeto</h2>' +
          '<div class="project-body__text prose"' + prov(p.provisorio, 'texto') + '>' +
            (p.descricao || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="project-gallery container" aria-label="Galeria de imagens">' +
        '<div class="cards">' +
          gallery.map(function (img, n) {
            return '<button type="button" class="gallery-btn" data-lightbox-index="' + (n + (gallery === p.galeria ? 1 : 0)) + '" aria-label="Ampliar imagem: ' + esc(img.alt) + '">' +
              '<div class="media" data-reveal="media"' + prov(p.provisorio, 'imagem') + '>' + U.imgTag(img, { ratio: 4 / 5, sizes: '(max-width: 640px) 100vw, 50vw' }) + '</div>' +
              '<span class="zoom-hint pill">Ampliar</span>' +
            '</button>';
          }).join('') +
        '</div>' +
      '</section>' +

      '<section class="section" data-theme="light">' +
        '<div class="container">' +
          '<div class="specs">' +
            '<div class="spec-card"><span class="eyebrow">Materiais e acabamentos</span>' + spec(p.materiais) + '</div>' +
            '<div class="spec-card"><span class="eyebrow">Detalhes</span>' + spec(p.detalhes) + '</div>' +
          '</div>' +
          '<div class="project-actions">' +
            '<a class="btn btn--lg" href="contato.html?ambiente=' + esc(p.categoria) + '&amp;projeto=' + esc(p.slug) + '#formulario">Solicitar orçamento ' + U.arrow + '</a>' +
            '<a class="btn btn--lg btn--ghost" data-whatsapp data-whatsapp-msg="' + esc('Olá! Vi o projeto "' + p.titulo + '" no site da S & A e gostaria de conversar sobre algo parecido.') + '" href="contato.html#formulario">WhatsApp ' + U.arrow + '</a>' +
          '</div>' +
          '<nav class="pager" aria-label="Outros projetos" style="margin-top:clamp(4rem,2rem + 5vw,8rem)">' +
            '<a href="' + esc(projectUrl(prev)) + '" rel="prev"><span class="eyebrow">← Anterior</span><span class="pager__title">' + esc(prev.titulo) + '</span></a>' +
            '<a href="' + esc(projectUrl(next)) + '" rel="next"><span class="eyebrow">Próximo →</span><span class="pager__title">' + esc(next.titulo) + '</span></a>' +
          '</nav>' +
        '</div>' +
      '</section>';

    /* Lista para o lightbox: capa + galeria (sem duplicar a capa) */
    var lbList = [p.capa].concat(gallery === p.galeria ? p.galeria : []);
    var seen = {};
    var lbUnique = [];
    var map = [];
    lbList.forEach(function (img, n) {
      if (seen[img.src] === undefined) { seen[img.src] = lbUnique.length; lbUnique.push(img); }
      map[n] = seen[img.src];
    });

    rootEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lightbox-index]');
      if (!b) return;
      SA.lightbox.open(lbUnique, map[+b.getAttribute('data-lightbox-index')] || 0, b);
    });

    /* Dados estruturados do projeto */
    var ld = doc.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: p.titulo,
      description: p.resumo,
      genre: cat.nome,
      image: gallery.map(function (g) { return U.image(g.src).src; }),
      creator: { '@type': 'Organization', name: (window.SITE || {}).nome || 'S & A Móveis Planejados' }
    });
    doc.head.appendChild(ld);

    finish(rootEl);
  })();

  /* ------------------------------------------------------------------------
     MATERIAIS — pages/materiais.html (marcas de MDF e exemplos de padrões)
     ------------------------------------------------------------------------ */
  SA.materials = (function () {
    var rootEl = doc.getElementById('materials-root');
    if (!rootEl) return;
    rootEl.innerHTML = '<div class="brand-cards">' + brandsHTML() + '</div>';
    finish(rootEl);
  })();

  /* ------------------------------------------------------------------------
     LIGHTBOX
     ------------------------------------------------------------------------ */
  SA.lightbox = (function () {
    var dlg, img, counter, caption, list = [], index = 0, opener = null, touchX = null;

    function build() {
      dlg = doc.createElement('dialog');
      dlg.className = 'lightbox';
      dlg.setAttribute('aria-label', 'Visualização ampliada');
      dlg.innerHTML = '' +
        '<div class="lightbox__bar">' +
          '<span class="pill" style="background:rgba(243,236,225,.1);color:inherit" data-lb-counter></span>' +
          '<button type="button" class="lightbox__btn" data-lb-close>Fechar <span aria-hidden="true">×</span></button>' +
        '</div>' +
        '<div class="lightbox__stage"><img class="lightbox__img" alt="" data-lb-img></div>' +
        '<div class="lightbox__foot">' +
          '<span class="lightbox__caption" data-lb-caption></span>' +
          '<div class="lightbox__nav">' +
            '<button type="button" class="lightbox__btn" data-lb-prev aria-label="Imagem anterior">← Anterior</button>' +
            '<button type="button" class="lightbox__btn" data-lb-next aria-label="Próxima imagem">Próxima →</button>' +
          '</div>' +
        '</div>';
      doc.body.appendChild(dlg);
      img = dlg.querySelector('[data-lb-img]');
      counter = dlg.querySelector('[data-lb-counter]');
      caption = dlg.querySelector('[data-lb-caption]');

      dlg.querySelector('[data-lb-close]').addEventListener('click', close);
      dlg.querySelector('[data-lb-prev]').addEventListener('click', function () { go(-1); });
      dlg.querySelector('[data-lb-next]').addEventListener('click', function () { go(1); });
      dlg.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') go(-1);
        if (e.key === 'ArrowRight') go(1);
      });
      dlg.addEventListener('close', function () {
        doc.body.style.overflow = '';
        if (opener) opener.focus();
      });
      dlg.addEventListener('click', function (e) {
        if (e.target.classList.contains('lightbox__stage')) close();
      });
      var stage = dlg.querySelector('.lightbox__stage');
      stage.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
      stage.addEventListener('touchend', function (e) {
        if (touchX === null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX = null;
      });
    }

    function show() {
      var item = list[index];
      var data = U.image(item.src);
      img.classList.add('is-loading');
      img.onload = function () { img.classList.remove('is-loading'); };
      img.src = data.large;
      img.alt = item.alt || '';
      counter.textContent = U.pad(index + 1) + ' / ' + U.pad(list.length);
      caption.textContent = item.alt || '';
      var single = list.length < 2;
      dlg.querySelector('[data-lb-prev]').hidden = single;
      dlg.querySelector('[data-lb-next]').hidden = single;
      /* pré-carrega a próxima */
      if (!single) { var pre = new Image(); pre.src = U.image(list[(index + 1) % list.length].src).large; }
    }

    function go(d) { if (list.length < 2) return; index = (index + d + list.length) % list.length; show(); }

    function open(items, start, from) {
      if (!dlg) build();
      list = items; index = start || 0; opener = from || null;
      show();
      doc.body.style.overflow = 'hidden';
      if (typeof dlg.showModal === 'function') dlg.showModal();
      else dlg.setAttribute('open', '');
      dlg.querySelector('[data-lb-close]').focus();
    }

    function close() {
      if (typeof dlg.close === 'function') dlg.close();
      else { dlg.removeAttribute('open'); doc.body.style.overflow = ''; }
    }

    return { open: open, close: close };
  })();

  /* Lightbox genérico para qualquer página: <button data-zoom="unsplash:id" data-zoom-alt="..."> */
  doc.addEventListener('click', function (e) {
    var b = e.target.closest('[data-zoom]');
    if (!b) return;
    var group = b.getAttribute('data-zoom-group');
    var btns = group ? doc.querySelectorAll('[data-zoom-group="' + group + '"]') : [b];
    var items = Array.prototype.map.call(btns, function (x) { return { src: x.getAttribute('data-zoom'), alt: x.getAttribute('data-zoom-alt') || '' }; });
    SA.lightbox.open(items, Array.prototype.indexOf.call(btns, b), b);
  });
})();
