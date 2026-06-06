# Changelog

## [Docs] Teaching annotations — `teaching/annotated-walkthrough` — 2026-06-06

### What this is

A teaching pass over the working frontend, on its own branch
(`teaching/annotated-walkthrough` — the backend repo has a matching branch
of the same name). The app's behavior is **unchanged**; what changed is how
legible it is to someone learning React, REST clients, and Tailwind for the
first time. Every file below got either a substantial header comment, or
several inline comments at the exact lines where a concept first appears —
the idea being that a student reading top-to-bottom encounters the
explanation right where their eye already is, not in a separate document
they have to context-switch to.

For the cross-cutting analysis that ties this repo to the backend (REST,
routing on both sides of the stack, `localStorage` vs. files vs. database,
`async`/`await`, `try`/`catch`, components, Tailwind utility classes, and a
security/auth "why and how" section), see `ANALYSIS.md` at the root of the
backend repo (`Lab10.1-recipe-api`) — also on its `teaching/annotated-
walkthrough` branch.

### Files annotated (no functional changes unless noted)

| File | What the comments cover |
|---|---|
| `src/api.js` | The "API service layer" pattern — one module that owns every `fetch` call so components never talk to the network directly; `import.meta.env.VITE_*` environment variables; the `getImageUrl` try/catch-as-control-flow idiom (see `ANALYSIS.md` §6 for why this is a *different* use of `try`/`catch` than the ones in the hook or in `App.jsx`); the generic `apiRequest` wrapper and how each CRUD function is just a thin, named call into it. |
| `src/hooks/useRecipes.js` | What makes a function a *custom hook* (the `use` prefix convention and the rules that come with it); `useState`/`useEffect`/`useCallback` working together; **optimistic updates** (`addRecipe`/`updateRecipe`/`removeRecipe` update local state immediately, rather than waiting on a second round trip to re-fetch); and the immutable update patterns (`[...prev, x]`, `.map`, `.filter`) that make those updates safe. |
| `src/App.jsx` | A header block on **composition** — what `App` deliberately does *not* know how to do, and hands off to focused children instead; an inline note contrasting *why* `handleSaveRecipe`'s `try`/`catch` exists for a different reason than the hook's (protecting the user's unsaved form input on failure, rather than turning the error into list-level UI state); and an explanation of the `{condition && <Thing />}` conditional-rendering idiom used throughout the `return`. |
| `src/components/RecipeCard.jsx` | A presentational-component header block; the `FALLBACK_IMG` inline-SVG `data:` URI and *why* it's safer than a remote placeholder URL (see the `[Fix]` entry below — this is the artifact of that fix, now explained in place); `handleImageError`'s `e.target.onerror = null` line and the infinite-error-loop it prevents; a guided line-by-line reading of one long Tailwind `className` string; the list-rendering/`key` prop explanation at the ingredients `.map`; and a "lifting state up" explanation at the Edit/Delete buttons (`onEdit`/`onDelete` are *reported upward*, not handled locally). |
| `src/components/RecipeForm.jsx` | A deep-dive header block on **controlled components**, with an ASCII diagram of the one-directional `state → render → onChange → setState` data loop; why the `useEffect` re-syncs `formData` whenever the `recipe` prop changes (i.e., whenever the user clicks Edit on a *different* card); the computed-property `[name]: value` trick that lets one `handleInputChange` serve every field; the immutable array-update pattern in `handleIngredientChange`; and *why* `handleSubmit` does its own synchronous validation here, before ever reaching the async API call one level up in `App.jsx`. |
| `src/components/NavBar.jsx` | A presentational/"dumb" component header block (handlers arrive as props; `NavBar` makes no real decisions); and an explanation of the dynamic-Tailwind-classes-via-template-literal-and-ternary pattern on the toggle button (`showForm ? 'bg-red-500 ...' : 'bg-primary-700 ...'`) — including the note that the button's accessible *label* changes too, so color isn't the only signal. |
| `src/components/RecipeList.jsx` | What makes this a "container that maps an array to children" rather than a presentational component in its own right; *why* `key={recipe._id || recipe.id}` (a stable, server-assigned id) is the right call here — in contrast to the array-index keys used for the short-lived, never-reordered ingredient list inside `RecipeCard` — plus a short note on "prop drilling" (`onEdit`/`onDelete` passing through this layer untouched) and when it'd be worth reaching for Context instead; and a breakdown of the responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`). |
| `src/components/LoadingSpinner.jsx` | The smallest possible presentational component — no props, no state — and how it fits into the "loading / error / success" trio of render states alongside `ErrorMessage` and `RecipeList`; plus a one-line note on how `animate-spin` + `rounded-full` + `border-b-2` produce the spinner with zero custom CSS. |
| `src/components/ErrorMessage.jsx` | The third render state, and why `onRetry` is *optional* (`{onRetry && <button>...}`) — making the same component reusable for errors that don't have a sensible "try again" action; and how `App` wires it to `refreshRecipes` from the hook. |
| `src/index.css` | A from-scratch explainer of Tailwind's **utility-first** philosophy (and how it differs from writing named classes and rules separately); `@import "tailwindcss"`; `@theme {}` as v4's CSS-first design-token configuration (and how one `--color-primary-500` variable becomes an entire family of utilities — `bg-primary-500`, `hover:bg-primary-600`, etc.); `@layer base` vs. `@layer components`; and `@apply` as the bridge between "utilities in markup" and "named classes in CSS" — with a pointer to compare `.card` here against `RecipeCard`'s longhand `className` to see the same visual result reached two different ways. |
| `src/App.css` | A note explaining this file is **dead code** — the default Vite/React template stylesheet, never imported by anything (`main.jsx` only imports `index.css`), with class names that appear nowhere in this app's JSX. Left in place, annotated, as a deliberate point of contrast: "this is what hand-written CSS with manual `@keyframes` looks like — and here's how you'd confirm a file like this is safe to delete." |

### A note on what *wasn't* changed

No component's rendered output, props, state shape, or event-handling logic
changed — these commits are comments-only (plus the `App.css` note, which
documents but doesn't remove dead code, so a class discussing "how do I know
this is safe to delete?" still has the artifact to look at). The two visible
behavioral fixes referenced above (`FALLBACK_IMG`, `getImageUrl`) were
already made — and already documented — in the `[Fix]` entries below; this
pass only adds the *why*, in place, for a learner encountering that code for
the first time.

---

## [Fix] TailwindCSS v4 Configuration — 2026-06-05

### Problem

The app rendered without any TailwindCSS styles applied. Four root causes were identified:

---

### 1. Missing `postcss.config.js`

**Finding:** The file was referenced in `CONFIGURATION.MD` but never created in the project root.

**Why it broke things:** Without `postcss.config.js`, PostCSS never runs the Tailwind plugin, so none of the `@tailwind` directives in `index.css` are processed and no utility classes are emitted.

**Note:** Even if this file had been created using the v3 syntax from `CONFIGURATION.MD` (`tailwindcss: {}`), it still would not have worked — see issue #2.

---

### 2. Tailwind v4 installed with Tailwind v3 configuration (root cause)

**Finding:** `package.json` declared `tailwindcss: ^4.3.0` (v4), but the entire setup was written for v3:
- `src/index.css` used `@tailwind base; @tailwind components; @tailwind utilities;` — directives removed in v4.
- `CONFIGURATION.MD`'s `postcss.config.js` used `tailwindcss: {}` as a PostCSS plugin — the v4 PostCSS plugin moved to a separate `@tailwindcss/postcss` package.
- `@tailwindcss/vite`, the required Vite integration for v4, was never installed.

**Why it broke things:** Tailwind v4 no longer recognises the `@tailwind` directives and no longer ships a PostCSS plugin in the main `tailwindcss` package. The CSS was effectively a no-op.

**Solution:**
- Installed `@tailwindcss/vite` (`npm install -D @tailwindcss/vite`).
- Added the plugin to `vite.config.js` — this is the recommended integration for Vite + Tailwind v4 and replaces the PostCSS approach entirely.
- Replaced `@tailwind` directives in `src/index.css` with `@import "tailwindcss"` (v4 syntax).
- Moved custom theme colors from `tailwind.config.js` into a `@theme {}` block in `src/index.css` (v4 CSS-first configuration).
- Removed the now-redundant manual `line-clamp-*` utility definitions — they are built into Tailwind v4.

---

### 3. Wrong `content` paths in `tailwind.config.js`

**Finding:** The `content` array was `["./src/**/*.{html,js,jsx}"]`.

**Why it broke things:** Two issues:
- `./index.html` was missing — Tailwind never scanned the app's HTML entry point for class names, so any utility used only there would be purged in production builds.
- `.ts` and `.tsx` extensions were absent — future TypeScript files would also be missed.

**Solution:** Updated to `["./index.html", "./src/**/*.{js,jsx,ts,tsx}"]` to match the correct paths shown in `CONFIGURATION.MD`.

---

### 4. Stale `output.css` linked directly in `index.html`

**Finding:** `index.html` contained `<link href="./src/output.css" rel="stylesheet">`. This file was a one-time artifact generated by the standalone Tailwind CLI (`tailwindcss -i ... -o ./src/output.css`).

**Why it broke things:** Two problems with this approach:
- `main.jsx` already imports `./index.css`, which Vite processes through its plugin pipeline. Having a second static CSS link creates a duplicated/conflicting stylesheet that is not rebuilt on change.
- The `output.css` snapshot was frozen at the time it was generated and would go stale as components changed.

**Solution:** Removed the `<link>` tag from `index.html`. Vite handles all CSS automatically through the `main.jsx` import chain.

---

### Files Changed

| File | Change |
|---|---|
| `vite.config.js` | Added `@tailwindcss/vite` plugin; added `server.port`, `server.open`, `build.outDir` |
| `src/index.css` | Replaced `@tailwind` directives with `@import "tailwindcss"`; added `@theme {}` for custom colors |
| `tailwind.config.js` | Fixed `content` paths |
| `index.html` | Removed stale `output.css` link |
| `package.json` / `package-lock.json` | Added `@tailwindcss/vite` as a dev dependency |

---

## [Fix] CONFIGURATION.MD Outdated Reference — 2026-06-05

### Problem

`CONFIGURATION.MD` was provided as course reference material showing what each config file should contain. Two of its sections described Tailwind v3 patterns that are incompatible with the v4 setup now in place, making it actively misleading.

---

### 5. `CONFIGURATION.MD` — `postcss.config.js` section (v3 only)

**Finding:** The file showed a `postcss.config.js` with `tailwindcss: {}` as a PostCSS plugin and implied it should be created.

**Why it was wrong:** This is Tailwind v3 syntax. In Tailwind v4 the PostCSS plugin was extracted into a separate `@tailwindcss/postcss` package, and for Vite projects the recommended approach is `@tailwindcss/vite` which bypasses PostCSS entirely. Following the reference as written and creating that file would have had no effect (or caused a conflict).

**Solution:** Replaced the code block with a note explaining why `postcss.config.js` is not used and what replaced it.

---

### 6. `CONFIGURATION.MD` — `vite.config.js` section (missing Tailwind plugin)

**Finding:** The `vite.config.js` snippet did not include the `@tailwindcss/vite` import or plugin call.

**Why it was wrong:** Without `tailwindcss()` in the Vite plugins array, Tailwind never processes the CSS — even with `@import "tailwindcss"` in `index.css`. This was the single most impactful missing piece.

**Solution:** Updated the snippet to include `import tailwindcss from '@tailwindcss/vite'` and `tailwindcss()` in the plugins array, matching the actual working `vite.config.js`.

---

### Files Changed

| File | Change |
|---|---|
| `CONFIGURATION.MD` | Replaced stale `postcss.config.js` block with a v4 compatibility note; updated `vite.config.js` snippet to include `@tailwindcss/vite` |
