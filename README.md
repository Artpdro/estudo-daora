# ULTRA HYPER MEGA AJUDA DO SEU AMIGO ARTHURZINHO

Plataforma de estudos interativa construída **a partir do conteúdo do `guia_estudos_GQ.pdf`**
(Teoria/Filosofia do Direito — JUR1060/JUR1063: Tipos de Normas, Kelsen, Guastini, Caso do Desacato e ADI 6457).

## ✨ Funcionalidades

| Módulo | Descrição |
|---|---|
| 🏠 Início | Página inicial com mascote, descrição e painel de estatísticas ao vivo |
| 🔤 Múltipla Escolha | Questões com 4 alternativas, correção imediata e explicação didática |
| ✍️ Questões Abertas | Dissertativas corrigidas pela OpenAI (`gpt-6-luna`, configurável) com acertos, erros e omissões |
| ⚖️ Verdadeiro ou Falso | Afirmativas com feedback explicativo instantâneo |
| 📚 Resumos | 5 assuntos identificados no PDF, com **resumo rápido** e **resumo detalhado** |
| 📈 Progresso | Anel de progresso, acertos/erros, aproveitamento e desempenho por assunto |

## 🚀 Como rodar

```bash
cd arthurzinho-estudos
npm install
cp .env.example .env        # edite com sua OPENAI_API_KEY
npm start
# abra http://localhost:3000
```

> Sem `OPENAI_API_KEY` a aplicação **continua funcionando inteira** — as questões abertas
> são corrigidas pelo corretor local (análise de cobertura dos conceitos-chave do PDF).

## 🔐 Segurança

- A chave da OpenAI **nunca vai ao frontend**: só o backend (`src/openai.js`) a utiliza.
- Modelo configurável por variável de ambiente: `OPENAI_MODEL=gpt-6-luna`.
- Entrada validada em todas as rotas; falha na IA gera fallback local (app nunca cai).
- Senha/segredos nunca versionados — `.env` está fora do código.

## 🗂 Arquitetura

```
arthurzinho-estudos/
├── server.js            # Servidor Express (API + frontend estático)
├── .env.example         # Modelo de variáveis de ambiente
├── package.json
├── src/
│   ├── config.js        # Carrega .env de forma segura
│   ├── db.js            # Banco de dados embutido (schema: answers, open_grades)
│   ├── content.js       # Conteúdo extraído do PDF: questões, V/F, abertas, resumos
│   ├── openai.js        # Integração OpenAI (server-side apenas)
│   ├── corrector.js     # Corretor local de fallback para questões abertas
│   └── routes.js        # Rotas da API (/api/*)
├── public/
│   ├── index.html       # SPA (hash routing)
│   ├── styles.css       # Design moderno, responsivo
│   ├── app.js           # Lógica do frontend
│   └── assets/image.png # Mascote do Arthurzinho 🕶️
└── data/db.json         # Banco (criado em runtime)
```

## 🔌 API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/health` | Status + modo de IA |
| GET | `/api/content?type=mcq\|vf\|open\|summaries` | Conteúdo por tipo |
| POST | `/api/answer` | Registra resposta MCQ/V-F e retorna correção + explicação |
| POST | `/api/open/correct` | Corrige questão aberta (IA com fallback local) |
| GET | `/api/stats` | Estatísticas do usuário |

## 📚 Fidelidade ao PDF

Todo enunciado, alternativa, afirmativa e resumo foi extraído do guia. As explicações
das correções citam o conteúdo original (arts. de lei, teses do STF, classificações
de Bobbio/Kelsen/Guastini). Nenhuma informação externa foi inventada.
