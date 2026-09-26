/**
 * Camada de persistência (banco de dados embutido).
 *
 * Estratégia: armazenamento JSON transacional em disco (data/db.json),
 * com schema organizado por "tabelas" lógicas (answers, open_grades).
 *
 * Por que JSON e não SQLite/Postgres?
 *  - Zero dependências nativas: funciona em qualquer ambiente com Node 18+.
 *  - A API de acesso é idêntica à de um banco relacional, então a troca futura
 *    por SQLite/Postgres é trivial (basta reimplementar este módulo).
 *
 * Schema:
 *   answers      -> { id, type ('mcq'|'vf'), questionId, subject, chosen, correct, correctAnswer, ts }
 *   open_grades  -> { id, questionId, subject, verdict, score, source, ts }
 */
const fs = require('fs');
const path = require('path');
const { DATA_DIR } = require('./config');

const DB_FILE = path.join(DATA_DIR, 'db.json');

class Database {
  constructor() {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DB_FILE)) this._write({ answers: [], open_grades: [] });
  }

  _read() {
    try {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch (err) {
      console.error('[db] Erro ao ler banco, recriando:', err.message);
      return { answers: [], open_grades: [] };
    }
  }

  _write(data) {
    const tmp = DB_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
    fs.renameSync(tmp, DB_FILE); // escrita atômica
  }

  recordAnswer({ type, questionId, subject, chosen, correct, correctAnswer }) {
    const db = this._read();
    db.answers.push({
      id: db.answers.length + 1,
      type, questionId, subject, chosen, correct, correctAnswer,
      ts: new Date().toISOString(),
    });
    this._write(db);
  }

  recordOpenGrade({ questionId, subject, verdict, score, source }) {
    const db = this._read();
    db.open_grades.push({
      id: db.open_grades.length + 1,
      questionId, subject, verdict, score, source,
      ts: new Date().toISOString(),
    });
    this._write(db);
  }

  getStats() {
    const db = this._read();
    const answered = db.answers.length;
    const correctCount = db.answers.filter(a => a.correct).length;
    const wrong = answered - correctCount;
    const openAnswered = db.open_grades.length;
    const openGood = db.open_grades.filter(g => g.score >= 0.6).length;
    const pct = answered ? Math.round((correctCount / answered) * 100) : 0;

    const perSubject = {};
    for (const a of db.answers) {
      perSubject[a.subject] = perSubject[a.subject] || { answered: 0, correct: 0 };
      perSubject[a.subject].answered++;
      if (a.correct) perSubject[a.subject].correct++;
    }
    for (const g of db.open_grades) {
      perSubject[g.subject] = perSubject[g.subject] || { answered: 0, correct: 0, open: 0 };
      perSubject[g.subject].open = (perSubject[g.subject].open || 0) + 1;
    }
    const subjects = Object.entries(perSubject).map(([id, s]) => ({
      id,
      answered: (s.answered || 0) + (s.open || 0),
      correct: s.correct || 0,
      pct: s.answered ? Math.round((s.correct / s.answered) * 100) : 0,
    }));

    return { answered, correct: correctCount, wrong, pct, openAnswered, openGood, subjects };
  }
}

module.exports = new Database();
