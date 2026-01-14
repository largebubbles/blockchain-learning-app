# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A mobile-first educational Next.js website teaching blockchain and Bitcoin fundamentals to complete beginners through a 30-day lesson plan. The site uses markdown-based content with frontmatter for lessons and JSON files for glossary/FAQ sections.

Live: https://blockchain-learning-app.vercel.app

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run linter
npm run lint
```

## Technology Stack

- **Next.js 14** (App Router) - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **gray-matter** - Frontmatter parsing for markdown
- **react-markdown** - Markdown rendering
- Path alias: `@/*` maps to project root

## Architecture

### Content Management System
The app uses a file-based CMS approach:

- **Lessons**: Markdown files in `content/lessons/` named `day-XX.md` (01-30)
- **Glossary**: JSON array in `content/glossary/terms.json`
- **FAQ**: JSON array in `content/faq/questions.json`

### Lesson File Format
Each lesson markdown file requires frontmatter:
```markdown
---
day: 1
title: "Lesson Title"
module: "Module Name"
duration: "5 min read"
---

# Lesson content here...
```

### Core Utilities (`lib/lessons.ts`)
- `getAllLessons()` - Returns sorted array of all lesson metadata
- `getLessonBySlug(slug)` - Fetches lesson by filename slug (e.g., "day-01")
- `getLessonByDay(day)` - Fetches lesson by day number (1-30)
- `getModules()` - Returns unique module names

### Routing Structure
- `/` - Home page with lesson list
- `/lessons/[slug]` - Dynamic lesson pages (day-01, day-02, etc.)
- `/glossary` - Glossary terms page
- `/faq` - FAQ page

### Theme System
- Custom dark/light theme implementation using localStorage
- Inline script in `app/layout.tsx` prevents flash of unstyled content
- Theme state managed via `ThemeProvider` in `app/providers.tsx`
- Toggle component: `app/components/ThemeToggle.tsx`

## Key Design Principles

- **Mobile-first**: All components optimized for phone screens first
- **Educational tone**: Plain language, no unexplained jargon
- **Progressive learning**: Lessons build on previous concepts (Day 1 → Day 30)
- **No authentication**: Public access, no login required

## Content Guidelines

When adding or modifying lessons:
1. Keep reading time to 5-10 minutes
2. Use analogies and real-world examples
3. Define technical terms before using them
4. Maintain consistent module structure across days
5. Ensure lessons are numbered sequentially in frontmatter

## Component Patterns

- Server Components by default (Next.js App Router)
- Client Components (`'use client'`) only for interactivity (theme toggle, navigation)
- Markdown rendered client-side via `react-markdown`
- Lesson data fetched server-side using `lib/lessons.ts` utilities
