# Learn Blockchain - Master Bitcoin in 30 Days

A mobile-first educational website designed to teach blockchain and Bitcoin fundamentals to complete beginners with zero technical background.

**🚀 Live Website: [https://blockchain-learning-app.vercel.app](https://blockchain-learning-app.vercel.app)**

## Features

- **30-Day Learning Journey**: Bite-sized lessons (5-10 minutes each) covering blockchain and Bitcoin basics
- **Mobile-First Design**: Optimized for phone usage (iOS and Android)
- **Progressive Learning**: Concepts build on each other, starting from basic money concepts to advanced Bitcoin topics
- **Searchable Glossary**: Quick reference for 25+ blockchain and crypto terms with examples
- **Comprehensive FAQ**: 24 common questions answered in plain language
- **No Login Required**: Learn at your own pace without creating an account

## Course Structure

### Module 1: Understanding Money (Days 1-5)
- What is money and how it evolved
- Digital money basics
- Problems with traditional systems
- The double-spending problem

### Module 2: Blockchain Fundamentals (Days 6-12)
- Ledgers and distributed systems
- How blockchain works
- Consensus mechanisms
- Real-world applications

### Module 3: Bitcoin Basics (Days 13-20)
- What is Bitcoin
- Wallets and addresses
- Public and private keys
- Sending and receiving Bitcoin
- Transaction fees

### Module 4: How Bitcoin Actually Works (Days 21-26)
- Mining explained
- Bitcoin's limited supply
- Value and volatility
- Privacy and anonymity

### Module 5: Practical Knowledge & Safety (Days 27-30)
- Common myths debunked
- Security best practices
- Getting started safely
- Future outlook

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown files with frontmatter
- **Markdown Parsing**: gray-matter + react-markdown

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Live Demo

Visit the live website: **[https://blockchain-learning-app.vercel.app](https://blockchain-learning-app.vercel.app)**

For local development, open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
blockchain-learning-app/
├── app/                    # Next.js app router pages
│   ├── lessons/[slug]/    # Dynamic lesson pages
│   ├── glossary/          # Glossary page
│   ├── faq/              # FAQ page
│   └── page.tsx          # Home page
├── content/               # Content files
│   ├── lessons/          # Markdown lesson files (day-01.md to day-30.md)
│   ├── glossary/         # Glossary terms JSON
│   └── faq/             # FAQ questions JSON
├── lib/                  # Utility functions
│   └── lessons.ts       # Lesson parsing utilities
└── public/              # Static assets
```

## Adding New Lessons

1. Create a new markdown file in `content/lessons/` (e.g., `day-06.md`)
2. Add frontmatter with lesson metadata:

```markdown
---
day: 6
title: "Your Lesson Title"
module: "Module Name"
duration: "5 min read"
---

# Lesson Content Here

Your lesson content in markdown format...
```

3. The lesson will automatically appear on the home page and be accessible via navigation

## Customization

### Styling
- Modify Tailwind classes in component files
- Update `tailwind.config.ts` for theme customization
- Edit `app/globals.css` for global styles

### Content
- Edit lesson files in `content/lessons/`
- Update glossary terms in `content/glossary/terms.json`
- Modify FAQ in `content/faq/questions.json`

## Mobile Optimization

The app is designed with mobile-first principles:
- Responsive layouts that adapt to screen size
- Large, touch-friendly buttons and links
- Readable font sizes (18px base for lesson content)
- Minimal scrolling per screen
- Progressive Web App (PWA) support via manifest.json

## Educational Philosophy

This course follows these principles:
- **Plain Language**: No jargon without explanation
- **Analogies**: Complex concepts explained through everyday examples
- **Progressive Complexity**: Start simple, gradually introduce technical terms
- **Practical Focus**: Real-world examples and use cases
- **Honest and Balanced**: Addresses both benefits and risks

## Target Audience

- Complete beginners with zero technical knowledge
- People curious about blockchain and Bitcoin
- Those who want to understand crypto before investing
- Anyone intimidated by technical cryptocurrency resources

## Disclaimer

This website is for educational purposes only. It does not constitute financial advice. Cryptocurrency investments carry significant risks. Always do your own research and consult with qualified professionals before making investment decisions.
