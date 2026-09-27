/**
 * ULTRA HYPER MEGA AJUDA DO SEU AMIGO ARTHURZINHO
 * Servidor principal — Express (backend + frontend estático).
 *
 * Segurança:
 *  - A chave da OpenAI NUNCA é enviada ao frontend (fica só neste processo).
 *  - Validação de entrada em todas as rotas.
 *  - Fallback local: uma falha na IA não derruba a aplicação.
 */
const path = require('path');
const express = require('express');
const config = require('./src/config');
const routes = require('./src/routes');

const app = express();
app.use(express.json({ limit: '200kb' }));

// API
app.use('/api', routes);

// Frontend estático
app.use(express.static(config.PUBLIC_DIR));

// Fallback para SPA (qualquer rota não-API serve o index.html)
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(config.PUBLIC_DIR, 'index.html'));
});

// Tratamento centralizado de erros
app.use((err, req, res, next) => {
  console.error('[erro]', err.message);
  res.status(500).json({ error: 'Ops! Algo deu errado. Tente novamente.' });
});

if (require.main === module) {
  app.listen(config.PORT, () => {
    console.log('');
    console.log('  ULTRA HYPER MEGA AJUDA DO SEU AMIGO ARTHURZINHO');
    console.log(`  Servidor rodando em: http://localhost:${config.PORT}` );
    console.log(`  Modelo de IA: ${config.OPENAI_MODEL}`);
    console.log(
      `  OpenAI: ${
        config.OPENAI_API_KEY
          ? 'configurada'
          : 'NÃO configurada — correção local ativa'
      }`
    );
    console.log('');
  });
}

module.exports = app;

