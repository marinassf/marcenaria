/* ==========================================================================
   S & A — FORMULÁRIO DE ORÇAMENTO
   --------------------------------------------------------------------------
   - Validação dos campos com mensagens claras (em português)
   - Anexos de imagens de referência (prévia, limite de quantidade e tamanho)
   - Pré-preenchimento a partir da URL (?ambiente=cozinhas&projeto=slug)
   - Envio para SITE.formEndpoint (config.js) via fetch + FormData
   - SEM endpoint configurado: não simula sucesso. Informa que o envio online
     não está ativo e oferece WhatsApp / e-mail com os dados já escritos.
   ========================================================================== */
(function () {
  'use strict';

  var form = document.getElementById('quote-form');
  if (!form) return;

  var SA = window.SA;
  var SITE = window.SITE || {};
  var U = SA.utils;
  var status = document.getElementById('form-status');
  var submitBtn = form.querySelector('[type="submit"]');
  var fileInput = form.querySelector('#f-anexos');
  var fileList = document.getElementById('file-list');
  var dropzone = form.querySelector('.dropzone');
  var files = [];
  var MAX_FILES = SITE.anexosMaxArquivos || 5;
  var MAX_MB = SITE.anexosMaxMB || 8;
  var ACCEPT = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'image/avif'];

  /* ---------- Opções de ambiente a partir das categorias ---------- */
  var select = form.querySelector('#f-ambiente');
  if (select && window.CATEGORIAS) {
    window.CATEGORIAS.forEach(function (c) {
      var o = document.createElement('option');
      o.value = c.id; o.textContent = c.nome;
      select.appendChild(o);
    });
    var o2 = document.createElement('option');
    o2.value = 'outro'; o2.textContent = 'Outro / mais de um ambiente';
    select.appendChild(o2);
    var pre = U.param('ambiente');
    if (pre && select.querySelector('option[value="' + pre.replace(/"/g, '') + '"]')) select.value = pre;
  }

  /* Projeto de referência vindo da página do projeto */
  var refSlug = U.param('projeto');
  var refField = form.querySelector('#f-referencia');
  if (refSlug && refField && window.PROJETOS) {
    var proj = window.PROJETOS.filter(function (p) { return p.slug === refSlug; })[0];
    if (proj) {
      refField.value = proj.titulo;
      var desc = form.querySelector('#f-descricao');
      if (desc && !desc.value) desc.placeholder = 'Vi o projeto "' + proj.titulo + '" e gostaria de algo parecido para…';
    }
  }

  /* ---------- Máscara simples de telefone (BR) ---------- */
  var tel = form.querySelector('#f-telefone');
  if (tel) {
    tel.addEventListener('input', function () {
      var d = tel.value.replace(/\D/g, '').slice(0, 11);
      var out = d;
      if (d.length > 10) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
      else if (d.length > 6) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
      else if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
      else if (d.length) out = '(' + d;
      tel.value = out;
    });
  }

  /* ---------- Validação ---------- */
  var rules = {
    nome: function (v) { return v.trim().length >= 2 ? '' : 'Informe seu nome.'; },
    telefone: function (v) {
      var d = v.replace(/\D/g, '');
      return d.length >= 10 && d.length <= 11 ? '' : 'Informe um telefone com DDD. Ex.: (65) 99999-9999';
    },
    email: function (v) {
      if (!v.trim()) return 'Informe seu e-mail.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Verifique o e-mail informado.';
    },
    ambiente: function (v) { return v ? '' : 'Selecione o tipo de ambiente.'; },
    descricao: function (v) { return v.trim().length >= 10 ? '' : 'Conte um pouco sobre o projeto (mínimo de 10 caracteres).'; },
    consentimento: function (v, el) { return el.checked ? '' : 'É preciso concordar para enviarmos a resposta.'; }
  };

  function fieldOf(el) { return el.closest('.field'); }

  function setError(el, msg) {
    var f = fieldOf(el);
    if (!f) return;
    var out = f.querySelector('.field__error');
    f.classList.toggle('has-error', !!msg);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (out) out.textContent = msg || '';
  }

  function validateEl(el) {
    var rule = rules[el.name];
    if (!rule) return '';
    var msg = rule(el.value || '', el);
    setError(el, msg);
    return msg;
  }

  Array.prototype.forEach.call(form.elements, function (el) {
    if (!rules[el.name]) return;
    el.addEventListener('blur', function () { if (el.value || el.type === 'checkbox') validateEl(el); });
    el.addEventListener('input', function () { if (fieldOf(el) && fieldOf(el).classList.contains('has-error')) validateEl(el); });
    el.addEventListener('change', function () { if (el.type === 'checkbox' || el.tagName === 'SELECT') validateEl(el); });
  });

  /* ---------- Anexos ---------- */
  function fmtSize(b) { return b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.round(b / 1024) + ' KB'; }

  function renderFiles() {
    if (!fileList) return;
    fileList.innerHTML = '';
    files.forEach(function (file, i) {
      var li = document.createElement('li');
      var thumb = document.createElement('img');
      thumb.alt = '';
      try { thumb.src = URL.createObjectURL(file); thumb.onload = function () { URL.revokeObjectURL(thumb.src); }; } catch (e) { /* noop */ }
      var name = document.createElement('span');
      name.textContent = file.name + ' · ' + fmtSize(file.size);
      var rm = document.createElement('button');
      rm.type = 'button';
      rm.textContent = 'Remover';
      rm.setAttribute('aria-label', 'Remover ' + file.name);
      rm.addEventListener('click', function () { files.splice(i, 1); renderFiles(); });
      li.appendChild(thumb); li.appendChild(name); li.appendChild(rm);
      fileList.appendChild(li);
    });
  }

  function addFiles(list) {
    var errors = [];
    Array.prototype.forEach.call(list, function (file) {
      if (files.length >= MAX_FILES) { errors.push('Limite de ' + MAX_FILES + ' imagens.'); return; }
      var okType = ACCEPT.indexOf(file.type) !== -1 || /\.(jpe?g|png|webp|heic|heif|avif)$/i.test(file.name);
      if (!okType) { errors.push(file.name + ': formato não aceito (use JPG, PNG, WEBP ou HEIC).'); return; }
      if (file.size > MAX_MB * 1048576) { errors.push(file.name + ': maior que ' + MAX_MB + ' MB.'); return; }
      files.push(file);
    });
    renderFiles();
    setError(fileInput, errors.filter(function (v, i, a) { return a.indexOf(v) === i; }).join(' '));
  }

  if (fileInput) {
    fileInput.addEventListener('change', function () { addFiles(fileInput.files); fileInput.value = ''; });
    ['dragenter', 'dragover'].forEach(function (t) {
      dropzone.addEventListener(t, function (e) { e.preventDefault(); dropzone.classList.add('is-over'); });
    });
    ['dragleave', 'drop'].forEach(function (t) {
      dropzone.addEventListener(t, function (e) { e.preventDefault(); dropzone.classList.remove('is-over'); });
    });
    dropzone.addEventListener('drop', function (e) { if (e.dataTransfer) addFiles(e.dataTransfer.files); });
  }

  /* ---------- Mensagens de status ---------- */
  function showStatus(kind, title, html) {
    status.hidden = false;
    status.className = 'form-status form-status--' + kind;
    status.innerHTML = '<p class="form-status__title">' + U.esc(title) + '</p>' + html;
    status.focus();
  }

  function summary(data) {
    var amb = select && select.selectedOptions[0] ? select.selectedOptions[0].textContent : data.get('ambiente');
    var lines = [
      'Olá! Gostaria de solicitar um orçamento pelo site da S & A.',
      '',
      'Nome: ' + data.get('nome'),
      'Telefone: ' + data.get('telefone'),
      'E-mail: ' + data.get('email'),
      'Ambiente: ' + amb
    ];
    if (data.get('referencia')) lines.push('Projeto de referência: ' + data.get('referencia'));
    if (data.get('dimensoes')) lines.push('Dimensões aproximadas: ' + data.get('dimensoes'));
    lines.push('', 'Projeto: ' + data.get('descricao'));
    if (files.length) lines.push('', '(Tenho ' + files.length + ' imagem(ns) de referência para enviar.)');
    return lines.join('\n');
  }

  function fallbackActions(text) {
    var parts = [];
    var wa = U.whatsappUrl(text);
    if (wa) parts.push('<a class="btn" href="' + U.esc(wa) + '" target="_blank" rel="noopener">Enviar pelo WhatsApp ' + U.arrow + '</a>');
    if (SITE.email) {
      parts.push('<a class="btn btn--ghost" href="mailto:' + U.esc(SITE.email) + '?subject=' + encodeURIComponent('Orçamento pelo site S & A') + '&body=' + encodeURIComponent(text) + '">Enviar por e-mail ' + U.arrow + '</a>');
    }
    return parts.length ? '<div class="form-status__actions">' + parts.join('') + '</div>' : '';
  }

  /* ---------- Envio ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstInvalid = null;
    Array.prototype.forEach.call(form.elements, function (el) {
      if (rules[el.name] && validateEl(el) && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) {
      showStatus('error', 'Revise os campos destacados.', '<p>Alguns campos obrigatórios estão vazios ou incompletos.</p>');
      firstInvalid.focus();
      return;
    }

    /* honeypot anti-spam */
    if (form.querySelector('[name="_site"]') && form.querySelector('[name="_site"]').value) return;

    var data = new FormData(form);
    data.delete('anexos');
    files.forEach(function (f) { data.append('anexos', f, f.name); });
    data.append('_assunto', 'Novo pedido de orçamento pelo site S & A');

    var text = summary(data);

    if (!SITE.formEndpoint) {
      var alt = fallbackActions(text);
      showStatus('error', 'O envio pelo site ainda não está ativo.',
        '<p>Seu pedido <strong>não foi enviado</strong>. Enquanto o formulário online não é configurado, ' +
        (alt ? 'você pode enviar as mesmas informações por um dos canais abaixo. O texto já vai preenchido.' : 'entre em contato diretamente com a S & A pelos canais desta página.') + '</p>' +
        (files.length && alt ? '<p>As imagens de referência precisam ser anexadas manualmente na conversa.</p>' : '') + alt);
      return;
    }

    submitBtn.classList.add('is-loading');
    submitBtn.setAttribute('aria-busy', 'true');
    status.hidden = true;

    fetch(SITE.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        files = [];
        renderFiles();
        showStatus('success', 'Pedido enviado. Obrigado!', '<p>Recebemos suas informações e retornaremos pelo telefone ou e-mail informado.</p>');
      })
      .catch(function () {
        showStatus('error', 'Não foi possível enviar agora.',
          '<p>Houve uma falha de conexão ou no serviço de envio. Seus dados continuam no formulário. Tente novamente em instantes ou use outro canal.</p>' + fallbackActions(text));
      })
      .then(function () {
        submitBtn.classList.remove('is-loading');
        submitBtn.removeAttribute('aria-busy');
      });
  });
})();
