const express = require('express');
const db = require('./db');
const { SUBJECTS, MCQ, VF, OPEN, SUMMARIES } = require('./content');
const { correctOpenAnswer, isConfigured } = require('./openai');
const { correctLocally } = require('./corrector');

const router = express.Router();

// ---------- Saúde da aplicação ----------
router.get('/health', (req, res) => {
  res.json({
    ok: true,
    ia: isConfigured() ? 'configurada' : 'modo-local (sem OPENAI_API_KEY)',
    questoes: { multiplaEscolha: MCQ.length, verdadeiroFalso: VF.length, abertas: OPEN.length },
    resumos: SUMMARIES.length,
  });
});

// ---------- Conteúdo (questões + resumos + assuntos) ----------
router.get('/content', (req, res) => {
  const type = req.query.type; // 'mcq' | 'vf' | 'open' | 'summaries'
  if (type === 'mcq') return res.json({ items: MCQ.map(stripAnswer), subjects: SUBJECTS });
  if (type === 'vf') return res.json({ items: VF.map(stripAnswer), subjects: SUBJECTS });
  if (type === 'open') return res.json({ items: OPEN.map(o => ({ id: o.id, subject: o.subject, difficulty: o.difficulty, prompt: o.prompt })), subjects: SUBJECTS });
  if (type === 'summaries') return res.json({ items: SUMMARIES, subjects: SUBJECTS });
  res.json({ subjects: SUBJECTS, counts: { mcq: MCQ.length, vf: VF.length, open: OPEN.length, summaries: SUMMARIES.length } });
});

function stripAnswer(q) {
  if (q.options) return { id: q.id, subject: q.subject, difficulty: q.difficulty, question: q.question, options: q.options };
  return { id: q.id, subject: q.subject, statement: q.statement };
}

// Resposta de múltipla escolha ou V/F: valida e registra
router.post('/answer', (req, res) => {
  const { type, questionId, chosen } = req.body || {};
  if (!['mcq', 'vf'].includes(type)) return res.status(400).json({ error: 'Tipo inválido.' });
  if (!questionId || chosen === undefined || chosen === null) {
    return res.status(400).json({ error: 'Envie questionId e chosen.' });
  }

  const bank = type === 'mcq' ? MCQ : VF;
  const q = bank.find(x => x.id === questionId);
  if (!q) return res.status(404).json({ error: 'Questão não encontrada.' });

  const correct = type === 'mcq'
    ? chosen === q.answer
    : String(chosen) === String(q.isTrue);

  db.recordAnswer({
    type, questionId, subject: q.subject, chosen: String(chosen),
    correct, correctAnswer: type === 'mcq' ? q.answer : q.isTrue,
  });

  res.json({
    correct,
    correctAnswer: type === 'mcq' ? q.answer : q.isTrue,
    explanation: q.explanation,
    stats: db.getStats(),
  });
});

// Correção de questão aberta: tenta IA, faz fallback local
router.post('/open/correct', async (req, res) => {
  const { questionId, answer } = req.body || {};
  if (!questionId || !answer || !String(answer).trim()) {
    return res.status(400).json({ error: 'Envie questionId e answer.' });
  }
  if (String(answer).length > 8000) {
    return res.status(400).json({ error: 'Resposta muito longa (máx. 8000 caracteres).' });
  }

  const q = OPEN.find(x => x.id === questionId);
  if (!q) return res.status(404).json({ error: 'Questão não encontrada.' });

  let result;
  try {
    result = await correctOpenAnswer(q, String(answer));
  } catch (err) {
    console.warn('[open/correct] IA indisponível, usando corretor local:', err.message);
    result = correctLocally(q, String(answer));
  }

  db.recordOpenGrade({ questionId, subject: q.subject, verdict: result.verdict, score: result.score, source: result.source });
  res.json({ ...result, stats: db.getStats() });
});

// ---------- Estatísticas ----------
router.get('/stats', (req, res) => res.json(db.getStats()));

module.exports = router;
