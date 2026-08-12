# AfterBots — Style Guide & Coding Conventions

## General Principles
- This is a **zero-dependency, no-build static site**. No npm. No bundlers. No frameworks.
- Every file must work when opened directly in a browser or served by any static file server.
- All paths must be **relative** (e.g., `assets/css/variables.css`, never `/assets/css/variables.css`).
- **No external requests**: no CDN links, no Google Fonts, no remote images, no fetch() to APIs.

## HTML Conventions
- Use **semantic HTML5** elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- Every page must include `<!DOCTYPE html>`, `<html lang="en">`, proper `<meta charset>` and `<meta viewport>`.
- CSS files are linked in `<head>` in this order: reset.css → variables.css → layout.css → components.css → pages.css.
- JS files are loaded at the end of `<body>` with `defer` attribute or placed before `</body>`.
- Load order: storage.js → components.js → app.js → page-specific JS.
- Use `data-*` attributes for JS hooks (e.g., `data-action="toggle-theme"`, `data-bot-id="3"`). Never select by CSS class for behavior.
- IDs are for unique landmarks and JS targets. Classes are for styling only.
- Use descriptive `aria-label` and `role` attributes on interactive custom elements.

## CSS Conventions
- All design tokens live in `variables.css` as CSS custom properties on `:root`.
- Use **BEM-like naming**: `.card`, `.card__header`, `.card__body`, `.card--highlighted`.
- Utility classes are prefixed: `.u-text-center`, `.u-mt-4`, `.u-hidden`.
- Never use `!important` unless overriding third-party styles (there are none, so never).
- Use `rem` for font-sizes and spacing. Use `px` only for borders and fine details (1px, 2px).
- Media queries use mobile-first: base styles are mobile, `@media (min-width: 768px)` for tablet+.
- Keep specificity low. Prefer single class selectors. No nesting beyond 2 levels.
- Transitions: use `var(--transition-fast)` (0.15s) for micro-interactions, `var(--transition-base)` (0.3s) for layout changes.
- Colors always reference CSS custom properties, never raw hex in component/page CSS.

## JavaScript Conventions
- **No frameworks, no libraries.** Vanilla JS only. ES2020 features are fine (optional chaining, nullish coalescing, etc.).
- Use `const` by default, `let` when reassignment is needed, never `var`.
- Functions: prefer `const myFunc = () => {}` for module-level, regular `function` for hoisted utilities.
- Use **IIFE or object module pattern** to avoid global scope pollution:
  ```javascript
  const Dashboard = (() => {
    // private state
    let filters = {};
    // public API
    const init = () => { ... };
    return { init };
  })();
  ```
- DOM queries: use `document.querySelector` / `querySelectorAll`. Cache DOM references at module init.
- Event delegation: attach listeners to parent containers, not individual items.
- Prefix storage keys with `afterbots_` via the storage.js wrapper. Never call localStorage directly.
- Console.log is acceptable for the playground's bot simulation output. Remove debug logs from production paths.

## File Naming
- HTML: lowercase, hyphenated (e.g., `index.html`, `dashboard.html`).
- CSS/JS: lowercase, descriptive (e.g., `components.css`, `playground.js`).
- No file should exceed ~400 lines. Split if it grows beyond that.

## Comments
- Every JS module starts with a block comment: file name, purpose, dependencies.
- CSS files start with a table of contents comment listing all sections.
- Complex logic gets inline comments explaining WHY, not WHAT.

## Accessibility
- All interactive elements must be keyboard accessible (focusable, Enter/Space to activate).
- Color contrast must meet WCAG AA (4.5:1 for normal text, 3:1 for large text).
- Focus styles: visible `outline` or custom focus ring using box-shadow. Never `outline: none` without replacement.
- Screen reader text: use `.u-sr-only` class for visually hidden but accessible text.