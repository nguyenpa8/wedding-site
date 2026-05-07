# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite wedding website for Linh Mến (bride) and Anh Nguyên (groom), with a wedding date of May 24, 2026. The site features sections for hero imagery, music, video, countdown timer, gallery, location information, and a guestbook.

## Development Commands

```bash
# Start dev server with HMR (Hot Module Reloading)
npm run dev

# Build for production
npm run build

# Run ESLint checks
npm run lint

# Preview production build locally
npm run preview
```

**Dev server** runs on `http://localhost:5173` by default with fast HMR enabled.

## Architecture

### Project Structure

```
src/
├── App.jsx              # Main app component (entry point for page layout)
├── main.jsx             # React DOM root, mounts App
├── App.css              # Styling for main layout sections
├── index.css            # Global styles (Tailwind imports)
├── components/          # Reusable UI components
│   ├── Hero.jsx         # Hero section with couple images
│   ├── Countdown.jsx    # Wedding date countdown timer
│   ├── MusicPlayer.jsx  # Audio player for background music
│   ├── VideoSection.jsx # Embedded YouTube video
│   ├── Gallery.jsx      # Photo gallery
│   ├── InfoLocation.jsx # Wedding venue information & maps
│   └── Guestbook.jsx    # Guestbook or RSVP section
└── data/
    └── weddingData.js   # Centralized wedding data (couple names, dates, locations, etc.)
```

### Data Flow

All wedding content (couple names, dates, locations, gallery) is **centralized in `src/data/weddingData.js`**. Components import and use this data:

```javascript
import { weddingData } from '../data/weddingData.js'
```

Update `weddingData` to manage all content without touching component logic.

### Styling

- **Tailwind CSS** via `@tailwindcss/vite` plugin for utility-first styling
- **CSS Modules/Global CSS**: Component-specific styles in `src/components/*.css` or inline Tailwind classes
- `src/App.css` contains layout styles for main page sections (#center, #next-steps, etc.)
- `src/index.css` imports Tailwind directives and global resets

## Key Configuration Files

- **vite.config.js**: Registers React and Tailwind CSS plugins
- **eslint.config.js**: Flat ESLint config with React Hooks and React Refresh rules
- **package.json**: Dependencies include React 19, Vite 8, Tailwind CSS 4, and dev tools

## Common Tasks

### Adding/Updating Wedding Information
Edit `src/data/weddingData.js` and components will automatically reflect the changes:
- Couple names: `weddingData.couple`
- Wedding date: `weddingData.weddingDate`
- Locations: `weddingData.locations`
- Gallery images: `weddingData.gallery`

### Creating a New Component
1. Create a file in `src/components/YourComponent.jsx`
2. Import needed data from `src/data/weddingData.js`
3. Use Tailwind classes for styling (or create `.css` file if needed)
4. Import and add to `App.jsx`

### Running ESLint
```bash
npm run lint
```

Covers React Hooks rules and React Refresh issues. Fix with editor auto-fix when possible.

## Notes

- React version uses Hooks (no class components)
- **No TypeScript** currently; consider adding if type safety is needed
- HMR works seamlessly during `npm run dev`—changes reflect instantly
- The React Compiler is not enabled (see README.md for details)

## Development Rules
### Component Design

- Keep components small and focused
- Prefer reusable components
- Keep files under 150-200 lines when possible
- Do not create unnecessary abstractions
### Styling
- Use TailwindCSS only
- Avoid inline styles
- Prefer clean and elegant UI
- Mobile-first responsive design
- Avoid excessive animations
### Editing Rules
- Do not modify unrelated files
- Only change files relevant to the current task
- Preserve existing architecture
- Avoid unnecessary refactors
### Data Flow
- Use weddingData.js as the single source of truth
- Avoid hardcoded content inside components
### Code Style
- Use functional React components
- Use clear naming
- Keep logic simple
- Avoid overengineering
### Workflow
- Build one section at a time
- Finish structure before polishing
- Prefer incremental updates over large rewrites