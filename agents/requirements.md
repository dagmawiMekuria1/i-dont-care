# AfterBots — Project Requirements & Context

## Project Overview
AfterBots is a bold, visually striking static website for testing and demonstrating bot interactions.
It serves as a playground and dashboard for simulated bot behaviors — no real backend, no real bots.
Everything is client-side simulation designed to look and feel impressive.

## Target Users
- Developers exploring bot interaction patterns
- Designers wanting to see bold UI in action
- Anyone curious about the project ("testing afterbots")

## Core Features

### 1. Landing Page (index.html)
- **Purpose:** First impression. Bold hero, clear value proposition, navigation to other pages.
- **Requirements:**
  - Animated hero with large gradient text displaying "AFTERBOTS"
  - Subtitle: "Testing the future, now." or similar bold tagline
  - Two CTA buttons: primary (Launch Playground) and secondary (View Dashboard)
  - Three feature cards with inline SVG icons, bold titles, and short descriptions
  - Animated number counters (bots tested, uptime %, etc.) — values are hardcoded
  - Consistent navigation bar and footer

### 2. Dashboard (dashboard.html)
- **Purpose:** Display simulated bot statuses, activity, and statistics.
- **Requirements:**
  - Sidebar with filter controls (All / Online / Idle / Error radio buttons)
  - Sort dropdown (by name, status, activity)
  - Grid/list view toggle
  - Bot status cards showing: bot name, status badge (colored), last active timestamp, message count
  - Minimum 6 pre-defined bot entries in a JS data array
  - CSS-only bar chart showing "messages per day" (7 bars for 7 days)
  - CSS-only donut chart showing status distribution
  - Activity log: scrollable list of timestamped events
  - All filter/sort/view interactions update the UI in real-time without page reload
  - Filters and view preference saved to localStorage

### 3. Playground (playground.html)
- **Purpose:** Interactive bot chat simulation sandbox.
- **Requirements:**
  - Chat message area with alternating user/bot message bubbles
  - Bot messages have a bot icon, user messages align right
  - Text input field + send button (also Enter key to send)
  - Typing indicator (animated dots) appears before bot responds
  - Preset scenario buttons at top: "Greeting", "Error Handling", "Random", "Philosophy"
  - Each preset loads a different conversation context/personality
  - Right sidebar: bot configuration panel
    - Bot name text input
    - Response speed slider
    - Persona dropdown (Friendly, Formal, Chaotic, Poetic)
  - Clear conversation button
  - Export conversation as .txt file (download via Blob)
  - Conversation persists in localStorage between page visits
  - Minimum 30 varied bot response templates across all personas

### 4. About Page (about.html)
- **Purpose:** Project information and context.
- **Requirements:**
  - Bold typographic headline
  - Project description paragraphs
  - Visual timeline showing "project milestones" (fictional, for demo purposes)
  - Technology badges (HTML, CSS, JS, GitHub Pages)
  - Credits/attribution section
  - Link back to playground CTA

## Cross-Cutting Requirements
- **Theme toggle:** Dark (default) and Light mode, persisted in localStorage
- **Responsive:** Fully usable from 375px (mobile) to 1440px+ (desktop)
- **Performance:** No external resources. Instant load. No FOUC (flash of unstyled content) — dark bg set early.
- **Accessibility:** Keyboard navigable, ARIA labels on custom controls, sufficient color contrast
- **Navigation:** Consistent top nav on all pages, current page highlighted
- **Footer:** Consistent footer with copyright year (JS-generated) and project name

## Non-Requirements
- No real backend or API
- No user authentication
- No database
- No real bot AI — all responses are template-based
- No analytics or tracking
- No cookie consent (no cookies used, only localStorage)

## Success Criteria
- All 4 pages render correctly with no console errors
- Zero external network requests (verified in DevTools)
- Theme toggle works and persists
- Dashboard filters work in real-time
- Playground chat produces convincing simulated bot responses
- Site is fully navigable by keyboard
- Responsive from mobile to desktop
- Deploys to GitHub Pages with zero configuration beyond enabling Pages