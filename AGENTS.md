# AGENTS.md

This repository is configured for AI coding agents (including Codex) to work safely with the existing Next.js + Payload CMS architecture.

## 1. Project Context

- Project: CR-Culture (Chiang Rai Cultural Council website)
- Stack: Next.js 16, React 19, Payload CMS 3, MongoDB, Tailwind CSS
- Main runtime:
  - Frontend + API: `src/app/`
  - Payload collections: `src/collections/`
  - Data access helpers: `src/lib/`

## 2. First Read (Low Token Path)

Before making non-trivial changes, read files in this order:

1. `STATUS.md`
2. `docs/README.md`
3. `docs/01_Project_Core/Documentation_Workflow.md`
4. `docs/03_Database/Schema.md` (only when touching CMS/data)
5. Related feature spec in `docs/02_Features/`

## 3. Local Setup

### Prerequisites

- Node.js >= 20
- npm >= 10
- Docker Desktop (for MongoDB and parity stack)

### Commands

```bash
npm install
npm run dev
```

Optional Docker stack:

```bash
docker compose up -d
```

## 4. Safe Change Rules

- Keep edits minimal and scoped to the requested task.
- Do not rename collections or schema fields unless explicitly requested.
- Preserve existing slugs and relationship mapping behavior.
- For seed/import work, prefer idempotent create-or-update logic.
- Do not commit generated runtime artifacts (`.next/`, logs, temporary html/json outputs).

## 5. Ponytail Minimalism Layer

This repository uses Ponytail-style instruction fallback for Codex and other agents. The full Ponytail plugin can add lifecycle hooks and mode commands, but the repo-level rules below are always active through this file.

Before writing code, stop at the first rung that holds:

1. Does this need to be built at all? If not, skip it.
2. Does it already exist in this codebase? Reuse the local helper, pattern, or component.
3. Does the standard library already do it? Use that.
4. Does the native platform already cover it? Use that.
5. Does an already-installed dependency solve it? Use that.
6. Can this be one line without losing clarity or safety? Make it one line.
7. Only then, write the minimum code that works.

Ponytail mode is efficient, not careless:

- Read the touched flow before choosing the small change.
- Fix shared root causes instead of patching only the visible symptom.
- Prefer deletion, reuse, and boring code over new abstractions.
- Do not cut validation at trust boundaries, data-loss handling, security, accessibility, or requested verification.
- For non-trivial logic, leave one runnable check behind.
- Use a `ponytail:` comment only for an intentional simplification with a known ceiling and upgrade path.

## 6. Verification Checklist

Run these after code edits:

```bash
npm run lint
npm run typecheck
npm run build
```

For seed/data changes, also verify:

```bash
curl -s http://localhost:3000/api/seed
curl -s http://localhost:3000/api/health
```

Then manually check impacted public pages (especially `/heritage`, `/activities`, `/news`, `/districts`).

## 7. Working With Existing Agent System

This repo also contains a legacy `.agent/` system with GEMINI-oriented docs.

- Codex should treat `.agent/` as reference only.
- Canonical current status is maintained in `STATUS.md` and `docs/`.
- If docs conflict, prioritize:
  1. Explicit user request
  2. Current code behavior
  3. `STATUS.md` and canonical docs under `docs/`

## 8. Obsidian Integration

- Obsidian is the canonical documentation surface for this repo via `docs/` and `.obsidian/`.
- Ponytail is active as instruction fallback through this `AGENTS.md`; full plugin hooks require installing the Ponytail Codex plugin in the Codex UI and trusting its hooks.

## 9. Language and Content

- User-facing copy can be Thai.
- Keep code identifiers and technical comments in English.
- Respect existing tone and terminology used in current pages/content.

## 10. Loop Engineering Protocol

To ensure development speed, safety, and codebase stability, both human developers and AI agents must follow the Loop Engineering Protocol:

### 10.1 The Inner Loop (Local Feedback Loop)
- **Small Iterations:** Write incremental code. Avoid large, untraceable modifications.
- **Fast Feedback:** Run `npm run typecheck` or verify the dev server (`npm run dev`) frequently to catch compilation/syntax issues immediately.

### 10.2 The Verification Loop (Pre-commit / Pre-handoff)
- **Local Quality Gates:** Before concluding any task, always execute:
  1. `npm run lint` (Lint check)
  2. `npm run typecheck` (TypeScript validation)
  3. `npm run build` (Next.js production build validation)
- **Automated Audits:** If making UI, database, or security changes, execute the corresponding audit scripts:
  - Run the priority checklist: `python .agent/scripts/checklist.py .`

### 10.3 The Documentation Loop (Traceability)
- **Unified Status:** Summarize changes in `STATUS.md` under the "Recent Work" section.
- **Decisions:** Log key architectural choices in `docs/05_Meeting_Notes/Decision_Log.md`.
