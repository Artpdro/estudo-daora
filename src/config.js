/**
 * Configuração central da aplicação.
 *
 * Carrega o arquivo .env (na raiz do projeto) manualmente, sem depender
 * de pacotes externos como "dotenv" (que não está no package.json).
 * Se as variáveis já existirem em process.env (ex.: definidas pelo próprio
 * sistema/host), elas têm prioridade sobre o que está no .env.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const ENV_FILE = path.join(ROOT_DIR, '.env');

function loadEnvFile() {
  if (!fs.existsSync(ENV_FILE)) return;

  const raw = fs.readFileSync(ENV_FILE, 'utf8');
  for (const rawLine of raw.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    // Remove aspas envolventes, se houver (ex.: OPENAI_MODEL="gpt-6-luna")
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile();

module.exports = {
  ROOT_DIR,
  PUBLIC_DIR: path.join(ROOT_DIR, 'public'),
  DATA_DIR: path.join(ROOT_DIR, 'data'),
  PORT: Number(process.env.PORT) || 3000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-6-luna',
};
