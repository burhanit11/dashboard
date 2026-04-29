# Logica Dashboard

A pixel-structured, responsive dashboard UI built with React, Tailwind CSS v4, and Zustand.

## Quick Start

```bash
# Install dependencies
npm install

# Start the mock API server (port 3001)
npm run api

# In a separate terminal, start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the dashboard.

> **Important**: Both the API server (`npm run api`) and the Vite dev server (`npm run dev`) must be running simultaneously.

---

## Component Structure

```
src/
├── api/
│   └── index.js              # API service layer (fetch wrapper)
├── store/
│   └── useStore.js           # Zustand global state store
├── components/
│   ├── Sidebar.jsx           # Left navigation with active state
│   ├── Header.jsx            # Top bar: logo, greeting, points, avatar
│   ├── XPProgress.jsx        # Animated XP progress bar section
│   ├── ProjectList.jsx       # Scrollable project cards (from API)
│   ├── Leaderboard.jsx       # Ranked user leaderboard (from API)
│   ├── EditorPanel.jsx       # Selected project details + note submission
│   ├── LoadingSpinner.jsx    # Reusable loading indicator
│   └── ErrorMessage.jsx      # Reusable error state with retry
├── App.jsx                   # Root layout with lazy loading
├── index.css                 # Tailwind imports + custom animations
└── main.jsx                  # React entry point
```

### Component Details

| Component | Description |
|-----------|-------------|
| **Sidebar** | Blue gradient navigation. Tracks active menu item via Zustand. Collapsible on mobile with hamburger toggle. Hover animations on nav items. |
| **Header** | Displays user name, avatar, and points badge from API. Responsive layout with mobile hamburger menu. |
| **XPProgress** | Shows XP progress between min/max values. Animated progress bar fills on mount. Floating doctor character animations. |
| **ProjectList** | Fetches `/projects` from API. Renders scrollable cards with staggered slide-in animations. Click to select a project (highlighted state). |
| **Leaderboard** | Fetches `/leaderboard` from API. Ranked users with crown badge for #1. Staggered slide-in-right animations on load. Hover scale effects. |
| **EditorPanel** | Shows selected project details. Textarea to write notes. POSTs to `/notes` endpoint. Shows success/error feedback. |
| **LoadingSpinner** | Configurable size (`sm`/`md`/`lg`) spinning border animation. |
| **ErrorMessage** | Displays error text with optional retry button. |

---

## State Management

**Zustand** is used for global state management. All state lives in a single store (`src/store/useStore.js`):

### State Slices

| Slice | Fields | Actions |
|-------|--------|---------|
| **User** | `user`, `userLoading`, `userError` | `fetchUser()` |
| **Projects** | `projects`, `projectsLoading`, `projectsError`, `selectedProject` | `fetchProjects()`, `selectProject(project)` |
| **Leaderboard** | `leaderboard`, `leaderboardLoading`, `leaderboardError` | `fetchLeaderboard()` |
| **Notes** | `noteSubmitting`, `noteSuccess`, `noteError` | `submitNote(note)` |
| **UI** | `activeMenu`, `sidebarOpen` | `setActiveMenu(name)`, `toggleSidebar()` |

### Why Zustand?

- Minimal boilerplate — no providers, reducers, or action creators
- Granular subscriptions via selectors prevent unnecessary re-renders
- Built-in async support — no middleware needed for API calls
- Small bundle size (~1KB)

---

## API Integration

### Mock Server

Uses **json-server** (v0.17) serving `db.json` on port 3001.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user` | Current user profile (name, avatar, XP, points) |
| GET | `/projects` | List of all projects/tests |
| GET | `/leaderboard` | Ranked users with scores |
| POST | `/notes` | Submit a note for a project |

### API Layer (`src/api/index.js`)

A thin `request()` wrapper that:
- Prepends the base URL
- Sets JSON content-type headers
- Throws on non-OK responses with status info
- Returns parsed JSON

Each Zustand action handles its own loading/error/success states.

---

## Animations & UX

| Animation | Where | Type |
|-----------|-------|------|
| **Progress bar fill** | XPProgress | CSS transition on mount (1s ease-out) |
| **Floating characters** | XPProgress | Infinite CSS `float` keyframe |
| **Card slide-in** | ProjectList | Staggered `slideInUp` with delay per card |
| **Leaderboard slide-in** | Leaderboard | Staggered `slideInRight` with delay per row |
| **Hover lift** | ProjectList cards | `translateY(-2px)` + shadow increase |
| **Hover scale** | Leaderboard items | `scale(1.02)` on hover |
| **Active nav glow** | Sidebar | `scale(1.02)` + shadow on active item |
| **Nav hover slide** | Sidebar | `translateX(4px)` on hover |
| **Success feedback** | EditorPanel | `fadeInScale` animation on note save |
| **Points badge** | Header | `fadeInScale` entrance animation |
| **Loading spinner** | Global | CSS `spin` animation |
| **Selected indicator** | ProjectList | Pulsing blue dot (`animate-pulse`) |

---

## Responsiveness

- **Desktop (>=1024px)**: Full sidebar + 2-column main layout (projects + leaderboard side by side)
- **Tablet/Mobile (<1024px)**: Sidebar collapses to overlay with hamburger toggle; main content stacks vertically; leaderboard goes full width below projects
- Padding, font sizes, and image sizes scale with `sm:` breakpoint utilities

---

## Performance Optimizations

| Technique | Implementation |
|-----------|----------------|
| **Lazy Loading** | `ProjectList`, `Leaderboard`, and `EditorPanel` are loaded via `React.lazy()` with `Suspense` fallback |
| **Memoization** | All major components wrapped with `React.memo()` to prevent unnecessary re-renders |
| **Granular Selectors** | Zustand selectors pick only needed state fields, avoiding full-store subscriptions |
| **Code Splitting** | Vite automatically splits lazy-loaded components into separate chunks |

---

## Tech Stack

- **React 19** — UI library
- **Vite 8** — Build tool and dev server
- **Tailwind CSS v4** — Utility-first CSS (via `@tailwindcss/vite`)
- **Zustand** — Lightweight state management
- **json-server** — Mock REST API
- **react-icons** — Icon library
