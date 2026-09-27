const serverless = require('serverless-http' );
const app = require('../../server');

const handler = serverless(app);

exports.handler = (event, context) => {
  let currentPath = event.path || '/';

  // Remove o prefixo interno da função, caso esteja presente
  currentPath = currentPath.replace(/^\/\.netlify\/functions\/api/, '');

  // O Express atual espera que as rotas comecem por /api
  if (!currentPath.startsWith('/api')) {
    currentPath = `/api${currentPath}`;
  }

  event.path = currentPath;

  return handler(event, context);
};
