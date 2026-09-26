/**
 * Integração com a OpenAI — chamadas feitas SOMENTE no backend.
 * O modelo é configurável via OPENAI_MODEL (padrão: gpt-6-luna).
 * Se a chave não estiver configurada ou a API falhar, o sistema
 * faz fallback para o corretor local (src/corrector.js).
 */
const { OPENAI_API_KEY, OPENAI_MODEL } = require('./config');
const { PDF_CONTEXT } = require('./content');

const API_URL = 'https://api.openai.com/v1/chat/completions';

function isConfigured() {
  return Boolean(OPENAI_API_KEY && OPENAI_API_KEY.startsWith('sk-') && OPENAI_API_KEY.length > 20);
}

/**
 * Corrige uma questão aberta usando o modelo configurado.
 * @returns {Promise<{verdict, score, hits, misses, explanation, source}>}
 */
async function correctOpenAnswer(question, userAnswer) {
  if (!isConfigured()) {
    throw new Error('OpenAI não configurada (OPENAI_API_KEY ausente).');
  }

  const systemPrompt = `Você é um corretor de questões discursivas de Teoria/Filosofia do Direito.
Use EXCLUSIVAMENTE o conteúdo do material abaixo como referência. Não invente informações.

MATERIAL DE REFERÊNCIA (PDF do curso):
${PDF_CONTEXT}

Avalie a resposta do aluno considerando:
1. Se está correta, parcialmente correta ou incorreta;
2. Quais informações importantes foram mencionadas (lista "hits");
3. Quais informações importantes faltaram (lista "misses");
4. Se há erro conceitual (explique);
5. Uma explicação didática e clara do resultado, citando o conteúdo correto do material.

Responda APENAS com um JSON válido neste formato exato:
{"verdict":"correta|parcialmente correta|incorreta","score":0.0,"hits":["..."],"misses":["..."],"explanation":"..."}
- score: número entre 0 e 1 (1 = resposta perfeita segundo o material).
- Seja rigoroso, mas justo: respostas genéricas que não reflitam o material devem ter score baixo.`;

  const userPrompt = `QUESTÃO: ${question.prompt}\nRESPOSTA ESPERADA (segundo o material): ${question.modelAnswer}\nRESPOSTA DO ALUNO: ${userAnswer}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.2,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`OpenAI respondeu ${res.status}: ${body.slice(0, 300)}`);
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content || '';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Resposta da IA não continha JSON válido.');

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      verdict: parsed.verdict || 'indefinido',
      score: Math.max(0, Math.min(1, Number(parsed.score) || 0)),
      hits: Array.isArray(parsed.hits) ? parsed.hits : [],
      misses: Array.isArray(parsed.misses) ? parsed.misses : [],
      explanation: String(parsed.explanation || '').trim(),
      source: `ia:${OPENAI_MODEL}`,
    };
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = { correctOpenAnswer, isConfigured };
