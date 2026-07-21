# FSD-2 Interactive Learning Hub

A polished monochrome Next.js interactive learning platform for **FSD-2 (MongoDB, Express, Node.js)** featuring study notes, MCQs with real exam data, and a full MongoDB IDE-style playground.

## Features

- **Study Notes** — 8 topic pages covering MongoDB Commands, CRUD, Aggregation, Regex, Indexing, Mongoose, Schema Validation, and Express + MongoDB connectivity
- **MCQ Practice** — Chapter 9 (MongoDB) with 42 MCQs + 13 descriptive questions and Chapter 10 (Mongoose) with 11 MCQs + 29 descriptive questions from LJU exam banks. Dual-mode: Interactive quiz and Solution Book with expandable code solutions.
- **MongoDB Playground** — A Compass-like IDE with in-memory mock engine supporting all major mongosh commands: CRUD, aggregation (9 stages), indexes, explain, seed datasets, autocomplete, query builder, and learning mode.
- **Dashboard** — Progress tracking with stats cards, feature grid, and topic navigation.
- **Search** — Cmd+K quick search across all pages.
- **Responsive** — Mobile-friendly with sidebar overlay and adaptive layout.

## Tech Stack

- **Next.js 16** with TypeScript and Turbopack
- **Tailwind CSS v4** with `@tailwindcss/postcss`
- **Pure monochrome theme** — black, white, and grays only
- Fully static-generated (17 routes)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

All routes are statically generated.

## Lint

```bash
npx eslint src
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── mcq/
│   │   ├── page.tsx           # MCQ listing
│   │   ├── ch9/page.tsx       # Chapter 9: MongoDB
│   │   └── ch10/page.tsx      # Chapter 10: Mongoose
│   ├── notes/                 # 8 study note pages
│   └── playground/page.tsx    # MongoDB IDE
├── components/
│   ├── PlaygroundShell.tsx    # Full MongoDB playground IDE
│   ├── MongoShell.tsx         # Alternative MongoDB shell
│   ├── Sidebar.tsx            # Navigation sidebar
│   ├── SearchBar.tsx          # Cmd+K search
│   └── CodeBlock.tsx          # Syntax highlighted code
├── data/
│   ├── mcq-ch9.ts             # Chapter 9 MCQ + descriptive data
│   ├── mcq-ch10.ts            # Chapter 10 MCQ + descriptive data
│   └── notes.ts               # Notes content
└── lib/
    ├── mockdb.ts              # In-memory MongoDB engine
    ├── shellHelp.ts           # Interactive help entries
    ├── autocomplete.ts        # Context-aware autocomplete
    ├── learningEngine.ts      # Per-command learning tips
    ├── shellTypes.ts          # Shared type definitions
    └── sampleData.ts          # Seed datasets
```
