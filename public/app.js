/* ============================================================
   ULTRA HYPER MEGA AJUDA DO SEU AMIGO ARTHURZINHO — Frontend
   SPA com hash routing: Início | MCQ | Abertas | V/F | Resumos | Progresso
   ============================================================ */

const $app = document.getElementById('app');
const $nav = document.getElementById('nav');
const state = {
  content: null,   // {subjects, ...}
  questions: { mcq: [], vf: [], open: [] },
  summaries: [],
  current: null,   // questão atual da sessão
  stats: null,
};

const SUBJECT_ICONS = { normas: '📜', kelsen: '🧠', guastini: '⚖️', desacato: '🗣️', adi6457: '🎖️' };

/* ---------------- Utilidades ---------------- */
const api = {
  async get(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Falha ao carregar dados.');
    return res.json();
  },
  async post(path, body) {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Erro inesperado.');
    return data;
  },
};

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const subjectName = (id) => state.content?.subjects?.find(s => s.id === id)?.name || id;
const subjectColor = (id) => state.content?.subjects?.find(s => s.id === id)?.color || '#a78bfa';

function tag(subjectId, difficulty) {
  let html = `<span class="tag" style="background:${subjectColor(subjectId)}22;color:${subjectColor(subjectId)};border:1px solid ${subjectColor(subjectId)}55">${esc(subjectName(subjectId))}</span>`;
  if (difficulty) html += ` <span class="tag tag-diff">${difficulty}</span>`;
  return html;
}

function updateStats(s) { if (s) state.stats = s; }

function pickRandom(arr, notId) {
  const pool = arr.filter(q => q.id !== notId);
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ---------------- Router ---------------- */
const routes = {
  '': viewHome, 'mcq': viewMCQ, 'abertas': viewOpen, 'vf': viewVF,
  'resumos': viewSummaries, 'progresso': viewProgress,
};
let summarySubject = null;

function navigate() {
  const hash = location.hash.replace(/^#\/?/, '').split('/')[0];
  const param = location.hash.split('/')[2];
  const route = routes[hash] || viewHome;
  document.querySelectorAll('.nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.route === (hash || 'home'));
  });
  $nav.classList.remove('open');
  if (hash === 'resumos' && param) summarySubject = param;
  else summarySubject = null;
  route();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.addEventListener('hashchange', navigate);
document.getElementById('navToggle').addEventListener('click', () => $nav.classList.toggle('open'));

/* ---------------- Início ---------------- */
async function viewHome() {
  $app.innerHTML = `
  <div class="view">
    <section class="hero">
      <img class="hero-img" src="/assets/image.png" alt="Mascote do Arthurzinho — emoji descolado de óculos escuros" />
      <div>
        <h1 class="hero-title">ULTRA HYPER MEGA AJUDA<br/>DO SEU AMIGO <span class="hl">ARTHURZINHO</span></h1>
        <p class="hero-sub">
          A plataforma lê o <strong>guia de estudos do 1ºGQ</strong> (Teoria/Filosofia do Direito) e transforma o conteúdo em
          <strong>questões de múltipla escolha</strong>, <strong>questões abertas corrigidas por IA</strong>,
          <strong>verdadeiro ou falso</strong> e <strong>resumos organizados por assunto</strong>.
          Escolha uma modalidade, responda e entenda <strong>por quê</strong> acertou ou errou.
        </p>
        <div class="badges">
          <span class="badge" id="badgeMcq"></span>
          <span class="badge" id="badgeVf"></span>
          <span class="badge" id="badgeOpen"></span>
          <span class="badge" id="badgeIa">⚡ carregando...</span>
        </div>
      </div>
    </section>
    <div class="stats-grid" id="homeStats"><div class="card stat-card"><div class="stat-num">…</div></div></div>
    <div style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))">
      <a class="card stat-card" href="#/mcq" style="text-decoration:none;color:inherit">
        <div class="stat-num c-accent">🔤</div><div class="stat-label" style="margin-top:8px">Múltipla Escolha</div>
        <p style="color:var(--muted);font-size:.85rem;margin-top:6px">Questões objetivas com correção e explicação instantâneas.</p>
      </a>
      <a class="card stat-card" href="#/abertas" style="text-decoration:none;color:inherit">
        <div class="stat-num c-warn">✍️</div><div class="stat-label" style="margin-top:8px">Questões Abertas</div>
        <p style="color:var(--muted);font-size:.85rem;margin-top:6px">Escreva sua resposta e receba correção detalhada por IA.</p>
      </a>
      <a class="card stat-card" href="#/vf" style="text-decoration:none;color:inherit">
        <div class="stat-num c-good">⚖️</div><div class="stat-label" style="margin-top:8px">Verdadeiro ou Falso</div>
        <p style="color:var(--muted);font-size:.85rem;margin-top:6px">Afirmativas rápidas para fixar o conteúdo.</p>
      </a>
      <a class="card stat-card" href="#/resumos" style="text-decoration:none;color:inherit">
        <div class="stat-num" style="color:#f472b6">📚</div><div class="stat-label" style="margin-top:8px">Resumos</div>
        <p style="color:var(--muted);font-size:.85rem;margin-top:6px">Resumos rápidos e detalhados dos 5 assuntos do guia.</p>
      </a>
    </div>
  </div>`;
  try {
    const [health, stats] = await Promise.all([api.get('/api/health'), api.get('/api/stats')]);
    document.getElementById('badgeMcq').textContent = `🔤 ${health.questoes.multiplaEscolha} questões MCQ`;
    document.getElementById('badgeVf').textContent = `⚖️ ${health.questoes.verdadeiroFalso} questões V/F`;
    document.getElementById('badgeOpen').textContent = `✍️ ${health.questoes.abertas} questões abertas`;
    document.getElementById('badgeIa').textContent = health.ia === 'configurada' ? '🤖 IA ativa' : '🛡️ modo local';
    updateStats(stats);
    renderStatsGrid(document.getElementById('homeStats'), stats);
  } catch { document.getElementById('badgeIa').textContent = '⚠️ offline'; }
}

function renderStatsGrid(el, s) {
  el.innerHTML = `
    <div class="card stat-card"><div class="stat-num c-accent">${s.answered}</div><div class="stat-label">Respondidas</div></div>
    <div class="card stat-card"><div class="stat-num c-good">${s.correct}</div><div class="stat-label">Acertos</div></div>
    <div class="card stat-card"><div class="stat-num c-bad">${s.wrong}</div><div class="stat-label">Erros</div></div>
    <div class="card stat-card"><div class="stat-num c-warn">${s.pct}%</div><div class="stat-label">Aproveitamento</div></div>
    <div class="card stat-card"><div class="stat-num" style="color:#22d3ee">${s.openAnswered}</div><div class="stat-label">Abertas avaliadas</div></div>`;
}

/* ---------------- Múltipla Escolha ---------------- */
async function viewMCQ() {
  if (!state.questions.mcq.length) {
    const data = await api.get('/api/content?type=mcq');
    state.questions.mcq = data.items; state.content = data;
  }
  const q = pickRandom(state.questions.mcq, state.current?.id);
  state.current = q;
  $app.innerHTML = `
  <div class="view">
    <h2 class="section-title">🔤 Múltipla Escolha</h2>
    <p class="section-sub">Leia o enunciado e marque a única alternativa correta.</p>
    <div class="card" style="margin-top:18px" id="mcqCard">
      <div class="q-header">${tag(q.subject, q.difficulty)}</div>
      <p class="q-text">${esc(q.question)}</p>
      <div class="options" id="mcqOptions">
        ${q.options.map(o => `
          <label class="option" data-key="${o.key}">
            <span class="opt-key">${o.key}</span>
            <span>${esc(o.text)}</span>
          </label>`).join('')}
      </div>
      <div id="mcqFeedback"></div>
      <button class="btn big" id="mcqSubmit" style="margin-top:18px" disabled>Responder</button>
    </div>
  </div>`;

  let chosen = null;
  document.querySelectorAll('#mcqOptions .option').forEach(el => {
    el.addEventListener('click', () => {
      if (chosen && document.querySelector('.option.locked')) return;
      document.querySelectorAll('#mcqOptions .option').forEach(x => x.classList.remove('selected'));
      el.classList.add('selected');
      chosen = el.dataset.key;
      document.getElementById('mcqSubmit').disabled = false;
    });
  });

  document.getElementById('mcqSubmit').onclick = async () => {
    if (!chosen) return;
    const btn = document.getElementById('mcqSubmit');
    btn.disabled = true; btn.textContent = 'Corrigindo...';
    try {
      const res = await api.post('/api/answer', { type: 'mcq', questionId: q.id, chosen });
      updateStats(res.stats);
      document.querySelectorAll('#mcqOptions .option').forEach(el => {
        el.classList.add('locked');
        if (el.dataset.key === res.correctAnswer) el.classList.add('correct');
        else if (el.dataset.key === chosen) el.classList.add('wrong');
      });
      document.getElementById('mcqFeedback').innerHTML = feedbackMCQ(res, chosen, q);
      btn.textContent = 'Próxima questão →';
      btn.disabled = false;
      btn.onclick = viewMCQ;
      document.getElementById('mcqFeedback').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) {
      btn.disabled = false; btn.textContent = 'Responder';
      alert(e.message);
    }
  };
}

function feedbackMCQ(res, chosen, q) {
  if (res.correct) {
    return `<div class="feedback good">
      <div class="fb-title">✅ Você acertou!</div>
      <div class="fb-line">Resposta correta: <strong>Alternativa ${res.correctAnswer}</strong></div>
      <div class="fb-section"><h4 style="color:var(--accent-2)">Por quê?</h4><div class="fb-why">${esc(res.explanation)}</div></div>
    </div>`;
  }
  return `<div class="feedback bad">
    <div class="fb-title">❌ Você errou.</div>
    <div class="fb-line">Sua resposta: <strong>Alternativa ${esc(chosen)}</strong> · Resposta correta: <strong>Alternativa ${res.correctAnswer}</strong></div>
    <div class="fb-section"><h4 style="color:var(--accent-2)">Por que você errou?</h4><div class="fb-why">${esc(res.explanation)}</div></div>
  </div>`;
}

/* ---------------- Questões Abertas ---------------- */
async function viewOpen() {
  if (!state.questions.open.length) {
    const data = await api.get('/api/content?type=open');
    state.questions.open = data.items; state.content = data;
  }
  const q = pickRandom(state.questions.open, state.current?.id);
  state.current = q;
  $app.innerHTML = `
  <div class="view">
    <h2 class="section-title">✍️ Questões Abertas</h2>
    <p class="section-sub">Escreva com suas palavras — a IA corrige detalhadamente com base no PDF.</p>
    <div class="card" style="margin-top:18px">
      <div class="q-header">${tag(q.subject, q.difficulty)}</div>
      <p class="q-text">${esc(q.prompt)}</p>
      <textarea class="textarea" id="openAnswer" placeholder="Digite sua resposta aqui..."></textarea>
      <div class="char-count" id="charCount">0 caracteres</div>
      <button class="btn big" id="openSubmit" style="margin-top:12px">Enviar resposta</button>
      <div id="openFeedback"></div>
    </div>
  </div>`;

  const ta = document.getElementById('openAnswer');
  ta.addEventListener('input', () => {
    document.getElementById('charCount').textContent = `${ta.value.length} caracteres`;
  });

  document.getElementById('openSubmit').addEventListener('click', async () => {
    const answer = ta.value.trim();
    if (answer.length < 10) { alert('Escreva uma resposta um pouco mais desenvolvida antes de enviar.'); return; }
    const btn = document.getElementById('openSubmit');
    btn.disabled = true; btn.textContent = '🤖 Corrigindo com IA...';
    try {
      const res = await api.post('/api/open/correct', { questionId: q.id, answer });
      updateStats(res.stats);
      const cls = res.verdict === 'correta' ? 'good' : res.verdict === 'incorreta' ? 'bad' : 'partial';
      const emoji = cls === 'good' ? '✅' : cls === 'bad' ? '❌' : '🟡';
      document.getElementById('openFeedback').innerHTML = `
      <div class="feedback ${cls}">
        <div class="fb-title">${emoji} Resultado: ${esc(res.verdict)}</div>
        <div class="fb-line">Nota: <strong>${Math.round(res.score * 100)}%</strong> · Fonte: ${res.source.includes('ia') ? 'Inteligência Artificial' : 'Corretor local'}</div>
        ${res.hits?.length ? `<div class="fb-section good"><h4>O que você acertou</h4><ul>${res.hits.map(h => `<li>${esc(h)}</li>`).join('')}</ul></div>` : ''}
        ${res.misses?.length ? `<div class="fb-section bad"><h4>O que faltou</h4><ul>${res.misses.map(m => `<li>${esc(m)}</li>`).join('')}</ul></div>` : ''}
        <div class="fb-section"><h4 style="color:var(--accent-2)">Explicação</h4><div class="fb-why">${esc(res.explanation)}</div></div>
      </div>
      <button class="btn big" onclick="location.hash='#/abertas'" style="margin-top:16px">Próxima questão →</button>`;
      btn.remove();
      document.getElementById('openFeedback').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) {
      btn.disabled = false; btn.textContent = 'Enviar resposta';
      alert(e.message);
    }
  });
}

/* ---------------- Verdadeiro ou Falso ---------------- */
async function viewVF() {
  if (!state.questions.vf.length) {
    const data = await api.get('/api/content?type=vf');
    state.questions.vf = data.items; state.content = data;
  }
  const q = pickRandom(state.questions.vf, state.current?.id);
  state.current = q;
  $app.innerHTML = `
  <div class="view">
    <h2 class="section-title">⚖️ Verdadeiro ou Falso</h2>
    <p class="section-sub">Julgue a afirmativa com base no conteúdo do guia.</p>
    <div class="card" style="margin-top:18px">
      <div class="q-header">${tag(q.subject)}</div>
      <p class="q-text">${esc(q.statement)}</p>
      <div class="vf-actions">
        <button class="btn vf-true" id="btnTrue">✔ VERDADEIRO</button>
        <button class="btn vf-false" id="btnFalse">✘ FALSO</button>
      </div>
      <div id="vfFeedback"></div>
    </div>
  </div>`;

  async function answer(val) {
    document.getElementById('btnTrue').disabled = true;
    document.getElementById('btnFalse').disabled = true;
    try {
      const res = await api.post('/api/answer', { type: 'vf', questionId: q.id, chosen: val });
      updateStats(res.stats);
      const isTrue = res.correctAnswer === true || res.correctAnswer === 'true';
      const good = res.correct;
      document.getElementById('vfFeedback').innerHTML = `
      <div class="feedback ${good ? 'good' : 'bad'}">
        <div class="fb-title">${good ? '✅ Resposta correta!' : '❌ Resposta incorreta!'}</div>
        <div class="fb-line">A afirmativa é <strong>${isTrue ? 'VERDADEIRA' : 'FALSA'}</strong>.</div>
        <div class="fb-section"><h4 style="color:var(--accent-2)">Explicação</h4><div class="fb-why">${esc(res.explanation)}</div></div>
      </div>
      <button class="btn big" onclick="location.hash='#/vf'" style="margin-top:16px">Próxima afirmativa →</button>`;
      document.getElementById('vfFeedback').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) { alert(e.message); location.reload(); }
  }
  document.getElementById('btnTrue').addEventListener('click', () => answer(true));
  document.getElementById('btnFalse').addEventListener('click', () => answer(false));
}

/* ---------------- Resumos ---------------- */
async function viewSummaries() {
  if (!state.summaries.length) {
    const data = await api.get('/api/content?type=summaries');
    state.summaries = data.items; state.content = data;
  }
  if (summarySubject) return renderSummaryDetail(summarySubject);

  $app.innerHTML = `
  <div class="view">
    <h2 class="section-title">📚 Resumos por Assunto</h2>
    <p class="section-sub">Os 5 assuntos identificados automaticamente no guia de estudos. Clique para abrir o resumo.</p>
    <div class="subject-grid">
      ${state.content.subjects.map(s => `
        <div class="card subject-card" style="--sc-color:${s.color}" onclick="location.hash='#/resumos/${s.id}'">
          <div class="subject-icon">${SUBJECT_ICONS[s.id] || '📖'}</div>
          <div class="subject-name">${esc(s.name)}</div>
          <div class="subject-desc">${esc(s.short)} · baseado no guia_estudos_GQ.pdf</div>
        </div>`).join('')}
    </div>
  </div>`;
}

function renderSummaryDetail(subjectId) {
  const sum = state.summaries.find(s => s.subject === subjectId);
  const subj = state.content.subjects.find(s => s.id === subjectId);
  if (!sum) { location.hash = '#/resumos'; return; }
  $app.innerHTML = `
  <div class="view">
    <a class="back-link" href="#/resumos">← Voltar aos assuntos</a>
    <h2 class="section-title">${SUBJECT_ICONS[subjectId] || '📖'} ${esc(subj.name)}</h2>
    <div class="summary-tabs">
      <button class="summary-tab active" data-tab="quick">⚡ Resumo rápido</button>
      <button class="summary-tab" data-tab="detailed">📖 Resumo detalhado</button>
    </div>
    <div class="card summary-body" id="summaryBody"></div>
  </div>`;

  const body = document.getElementById('summaryBody');
  function render(tab) {
    if (tab === 'quick') {
      body.innerHTML = `<ul>${sum.quick.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
    } else {
      body.innerHTML = sum.detailed.map(d => `
        <h3>${esc(d.heading)}</h3>
        ${d.body.split('\n').filter(l => l.trim()).map(line =>
          line.startsWith('•') ? `<ul><li>${esc(line.replace(/^•\s*/, ''))}</li></ul>` : `<p>${esc(line)}</p>`
        ).join('')}`).join('');
    }
  }
  document.querySelectorAll('.summary-tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.summary-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      render(t.dataset.tab);
    });
  });
  render('quick');
}

/* ---------------- Progresso ---------------- */
async function viewProgress() {
  const s = await api.get('/api/stats');
  updateStats(s);
  const R = 74, CIRC = 2 * Math.PI * R;
  const offset = CIRC * (1 - s.pct / 100);
  $app.innerHTML = `
  <div class="view">
    <h2 class="section-title">📈 Seu Desempenho</h2>
    <p class="section-sub">Acompanhe sua evolução nos estudos do 1ºGQ.</p>

    <div class="card progress-hero">
      <div class="progress-ring-wrap">
        <svg class="progress-ring" width="170" height="170">
          <defs><linearGradient id="gradRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a78bfa"/><stop offset="100%" stop-color="#22d3ee"/>
          </linearGradient></defs>
          <circle class="ring-bg" cx="85" cy="85" r="${R}" fill="none" stroke-width="13"/>
          <circle class="ring-fg" cx="85" cy="85" r="${R}" fill="none" stroke-width="13"
            stroke-dasharray="${CIRC}" stroke-dashoffset="${offset}"/>
        </svg>
        <div class="ring-label"><div class="ring-pct">${s.pct}%</div><div class="ring-sub">ACERTOS</div></div>
      </div>
      <p style="color:var(--muted)">Desempenho geral em questões objetivas</p>
    </div>

    <div class="stats-grid">${''}
      <div class="card stat-card"><div class="stat-num c-accent">${s.answered}</div><div class="stat-label">Respondidas</div></div>
      <div class="card stat-card"><div class="stat-num c-good">${s.correct}</div><div class="stat-label">Acertos</div></div>
      <div class="card stat-card"><div class="stat-num c-bad">${s.wrong}</div><div class="stat-label">Erros</div></div>
      <div class="card stat-card"><div class="stat-num" style="color:#22d3ee">${s.openAnswered}</div><div class="stat-label">Abertas respondidas</div></div>
      <div class="card stat-card"><div class="stat-num c-warn">${s.openGood}</div><div class="stat-label">Abertas boas (≥60%)</div></div>
    </div>

    <div class="card" style="margin-top:8px">
      <h3 style="margin-bottom:18px">Desempenho por assunto</h3>
      <div id="subjectBars">
        ${state.content?.subjects ? state.content.subjects.map(sub => {
          const st = s.subjects.find(x => x.id === sub.id);
          const pct = st ? st.pct : 0;
          const answered = st ? st.answered : 0;
          return `
          <div class="bar-row">
            <div class="bar-head">
              <span class="bar-name">${SUBJECT_ICONS[sub.id] || ''} ${esc(sub.name)}</span>
              <span class="bar-pct">${answered ? pct + '% (' + answered + ' questões)' : 'ainda não estudado'}</span>
            </div>
            <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${sub.color}"></div></div>
          </div>`;
        }).join('') : '<p style="color:var(--muted)">Carregando...</p>'}
      </div>
      ${s.answered === 0 && s.openAnswered === 0 ? `
      <div class="empty-state">
        <span class="big-emoji">🚀</span>
        Você ainda não respondeu nenhuma questão. Bora começar!
        <div style="margin-top:16px"><a class="btn" href="#/mcq" style="text-decoration:none;display:inline-block">Começar agora</a></div>
      </div>` : ''}
    </div>
  </div>`;
}

/* ---------------- Boot ---------------- */
(async function init() {
  try {
    state.content = await api.get('/api/content');
    state.stats = await api.get('/api/stats');
  } catch { /* o servidor pode estar iniciando; as views carregam sob demanda */ }
  navigate();
})();