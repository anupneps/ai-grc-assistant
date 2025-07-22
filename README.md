# GRC Copilot MVP

This project is a compliance automation platform for consultants, built with Next.js, MongoDB, and server actions. It enables AI-driven policy generation, document management, and regulatory knowledge base features.

## Current Progress

- **Project initialized** with Next.js (App Router, TypeScript, TailwindCSS)
- **MongoDB connection utility** (`lib/mongodb.ts`)
- **Zod-based models** for:
  - Client
  - Document
  - Draft
  - AISession
  - KnowledgeBase
  - AuditLog
  - User (with roles, associated clients, and metadata)
- **Server actions** for:
  - Client CRUD (`app/actions/clientActions.ts`)
  - User signup/signin (`app/actions/userActions.ts`)
- **Environment setup:** `.env.local` for MongoDB URI (add manually)
- **Linter fixes** for Zod schemas
- **.gitignore** updated to exclude sensitive and local files
- **todo.txt** tracks next steps

## Next Steps

See `todo.txt` for the current roadmap, including:
- Server actions for documents, drafts, chat history, knowledge base, and audit logs
- Frontend component scaffolding
- Chat-driven workflow and canvas editor
- Basic UI for signup/signin

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the project root:

```
MONGODB_URI=mongodb://localhost:27017/grc-copilot-mvp
```

## License

MIT
