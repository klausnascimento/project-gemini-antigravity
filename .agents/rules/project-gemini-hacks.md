---
trigger: always_on
---

- Sempre usar TypeScript com strict mode
- Nunca usar any sem justificativa
- Usar Next.js com App Router
- Priorizar Server Components
- Usar "use client" apenas quando necessário
- Usar exclusivamente Tailwind CSS
- Nunca usar CSS inline ou CSS Modules
- Usar clsx e tailwind-merge para classes dinâmicas
- Nomear componentes em inglês
- Escrever comentários em português brasileiro
- Código deve ser limpo, tipado e organizado
- Usar Prisma ORM
- Nunca acessar banco no client
- Validar dados com Zod
- Sanitizar HTML com DOMPurify ou sanitize-html
- Nunca expor dados sensíveis no client
- Nunca confiar em dados do client
- Validar input em TODAS as rotas
- Usar rate limit nas APIs
- Implementar autenticação (JWT ou NextAuth)
- Logs de auditoria para ações críticas
- Controllers (route.ts) → entrada da requisição
- Services → regra de negócio
- Prisma → acesso ao banco
- DTOs → validação com Zod
- Criar testes unitários (Vitest ou Jest)
- Criar testes de integração para APIs
- Garantir cobertura mínima de código
- Usar Conventional Commits:
  - feat:
  - fix:
  - refactor:
  - chore:
  - docs:
- Usar cache com React Query ou fetch cache
- Evitar re-render desnecessário
- Lazy loading quando necessário
- Otimizar queries do Prisma
- Todo projeto deve conter README.md com:
  - Setup
  - Stack
  - Scripts
  - Arquitetura
- Seguir organização:
/app
/components
/lib
/services
/types
/prisma
/utils