/**
 * Configuração central da aplicação.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

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

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const runningOnNetlify =
  process.env.NETLIFY === 'true' ||
  process.env.NETLIFY === '1' ||
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);

const DATA_DIR = runningOnNetlify
  ? path.join(os.tmpdir(), 'estudo-daora-data')
  : path.join(ROOT_DIR, 'data');

module.exports = {
  ROOT_DIR,
  PUBLIC_DIR: path.join(ROOT_DIR, 'public'),
  DATA_DIR,
  PORT: Number(process.env.PORT) || 3000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4o-mini'
};
