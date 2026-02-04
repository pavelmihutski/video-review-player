# Video Review Player

A production-ready video review application built with React. The project uses MSW (Mock Service Worker) for backend emulation and React Compiler to automatically optimize components, eliminating the need for manual memoization.

**Live Demo:** https://pavelmihutski.github.io/video-review-player

## Additional Features

- **Active Comment Tracking** - Auto-highlights and scrolls to the current comment during playback
- **Toast messages** - Highlight state of user actions

## Tech Stack

**Core:** React 19, TypeScript, Vite, Styled Components  
**State:** Zustand, TanStack Query  
**Video:** HLS.js, HTML5 Video API  
**Validation:** Zod  
**Testing:** Vitest, Testing Library, Playwright, MSW

## Getting Started

### Prerequisites

- **Node.js** - v18.0.0 or higher
- **pnpm** - v8.0.0 or higher (recommended)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/pavelmihutski/video-review-player.git
cd video-review-player
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
# or
yarn install
```

### Development

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run preview      # Preview production build
```

### Testing

#### Unit & Integration Tests

```bash
npm run test              # Run unit tests with Vitest
npm run test:coverage     # Run tests with coverage
npm run test:ui           # Open Vitest UI
```

#### E2E Tests

```bash
npm run test:e2e          # Run E2E tests (headless)
npm run test:e2e:ui       # Run E2E tests with Playwright UI
```

### Deploy

```bash
npm run deploy      # Deploy to GitHub Pages
```

## Project Structure

```
src/
├── api/              # API layer (endpoints, mocks, schemas)
├── app/              # Application layer
│   ├── features/     # Feature modules (comments, video-player, header)
│   └── pages/        # Page components
├── data/             # Data layer (comments, player state)
├── components/       # Shared components
└── hooks/            # Shared hooks
e2e/                  # End to end tests

```

## Scripts

| Command                 | Description                      |
| ----------------------- | -------------------------------- |
| `npm run dev`           | Start development server         |
| `npm run build`         | Build for production             |
| `npm run test`          | Run unit tests                   |
| `npm run test:coverage` | Run tests with coverage          |
| `npm run test:e2e`      | Run E2E tests (headless)         |
| `npm run test:e2e:ui`   | Run E2E tests with Playwright UI |
| `npm run lint`          | Check linting                    |
| `npm run lint:fix`      | Fix linting errors               |
| `npm run prettier:fix`  | Format code                      |
| `npm run deploy`        | Deploy to GitHub Pages           |
