# Project Gemini Antigravity (Habit Tracker Dashboard)

Projeto voltado para gerenciamento dinâmico de produtividade (como o painel de Hábitos) com alta resposta na renderização e aderência estrita a boas práticas modernas de UI/UX, utilizando abordagens robustas de persistência local e cache.

## 🚀 Setup

1. **Instale as dependências base:**
   ```bash
   npm install
   ```

2. **Geração do Banco de Dados (Prisma + SQLite):**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação operante em [http://localhost:3000](http://localhost:3000) (Use `/habits` para acessar as rotas construídas do dashboard).

## 🛠 Stack

- **Core & Roteamento:** Next.js 16 (App Router), React 19, TypeScript rigoroso.
- **Estilização:** Exclusivo com Tailwind CSS v4 (Design System focado, sem CSS Modules). Dinamismo tratado via `tailwind-merge` + `clsx`.
- **Estado e Memória:** Patterns visuais isolados, Next.js Hydration Bypass e Zustand (`/app/store`).
- **Persistência de Dados Base:** Prisma ORM com adapter *Better-SQLite3*.
- **Pacotes Essenciais Adicionais:** Lucide React para iconografia clean.

## 📜 Scripts

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local Next.js em ambiente de testes. |
| `npm run build` | Limpa e compila o projeto globalmente focando cache para a Vercel/Node Prod. |
| `npm run prisma:studio` | Interface visual para validar entradas das tabelas geridas pelo banco de dados. |

## 🏛 Arquitetura

O ecossistema é mantido modular para prever escalabilidade:

- **`/app`**: Orquestrador das rotas do framework. Componentes interligados por uma fonte única de verdade definida em `lib/routes.ts`.
- **`/components`**: Instâncias de UI desacopladas (isolamento das views e actions, como os formulários de tracker).
- **`/hooks`**: Controladores auxiliares do Client (ex: `useLocalStorage` construído para abstrair APIs da web de forma segura do Server Side Render).
- **`/types`**: Repositório de centralização base das tipagens do ecossistema.
- **`/utils`**: Motor matemático invisível. Funções puras baseadas na regra de negócio (como algoritimo calculador de *Streak/Sequência* de dias) testáveis independentementes.
- **`/lib`**: Componentes e adaptadores globais primários da infra.
