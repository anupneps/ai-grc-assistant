# GRC Copilot MVP (Compli-EU)

This project is a compliance automation platform designed for consultants focusing on cybersecurity, focusing on Governance, Risk, and Compliance (GRC) in the European Union. It leverages AI to assist with policy generation, document management, and regulatory knowledge, while always keeping a human expert in the loop for verification.

## Key Features

- **AI-Driven Policy Drafting:** Generate, revise, and review compliance policies tailored to client needs.
- **Document Management:** Organize and manage compliance documents and drafts.
- **Regulatory Knowledge Base:** Stay updated with EU regulations like GDPR, NIS2, and more.
- **Consultant-Focused Workflow:** AI acts as an assistant, not a replacement—human expertise is always required for final decisions.
- **Chat-Driven Interface:** Interact with the AI for drafting, gap analysis, and regulatory Q&A.
- **Client & Project Management:** Manage multiple clients and their compliance needs.
- **Audit Logging:** Track actions for compliance and accountability.

## Tech Stack

- **Frontend:** Next.js (App Router, TypeScript, TailwindCSS)
- **Backend:** Server Actions (API routes), MongoDB (with Zod-based models for validation)
- **Authentication:** User roles and client associations
- **AI Integration:** For chat, policy drafting, gap analysis, and regulatory Q&A

## Philosophy

Unlike generic AI chatbots, this platform is tailored for compliance consulting, ensuring that all AI-generated recommendations are reviewed and approved by human experts. The system is designed to empower consultants, not replace them.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file in the project root with your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/grc-copilot-mvp
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
