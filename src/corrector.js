/**
 * Corretor LOCAL de questões abertas (fallback quando a OpenAI não está
 * configurada ou falha). Faz análise por cobertura de conceitos-chave
 * (keywords) definidos a partir do conteúdo do PDF.
 * Não substitui a IA — garante que a aplicação nunca fique sem correção.
 */
function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function correctLocally(question, userAnswer) {
  const answer = normalize(userAnswer);
  const words = answer.split(/\W+/).filter(w => w.length > 2);

  const found = [];
  const missing = [];
  for (const kw of question.keywords) {
    const k = normalize(kw);
    const hit = answer.includes(k) || words.some(w => w.startsWith(k.slice(0, Math.max(4, k.length - 2))));
    (hit ? found : missing).push(kw);
  }

  const coverage = found.length / question.keywords.length;
  const minLength = 40; // respostas triviais não pontuam bem
  const lengthFactor = Math.min(1, userAnswer.trim().length / (minLength * 3));
  const score = Math.round(Math.min(1, coverage * 0.7 + lengthFactor * 0.3) * 100) / 100;

  let verdict;
  if (score >= 0.75 && coverage >= 0.7) verdict = 'correta';
  else if (score >= 0.4) verdict = 'parcialmente correta';
  else verdict = 'incorreta';

  const hits = found.length
    ? [`Você mencionou: ${found.join(', ')}.`]
    : ['Nenhum dos conceitos centrais esperados foi identificado.'];
  const misses = missing.length
    ? [`Pontos que faltaram mencionar: ${missing.join(', ')}.`]
    : [];

  const explanation =
    `Resposta esperada segundo o material: ${question.modelAnswer}\n\n` +
    (verdict === 'correta'
      ? 'Excelente! Sua resposta cobre os principais conceitos do conteúdo estudado.'
      : verdict === 'parcialmente correta'
        ? 'Sua resposta demonstra entendimento parcial do assunto. Revise os pontos que faltaram acima e compare com a resposta esperada.'
        : 'Sua resposta não reflete o conteúdo do material. Estude o resumo do assunto e tente novamente.');

  return { verdict, score, hits, misses, explanation, source: 'corretor-local' };
}

module.exports = { correctLocally };
