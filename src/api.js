/**
 * ============================================================================
 *  API SERVICE LAYER — the ONE place that knows how to talk to the backend
 * ============================================================================
 * Every function a component needs to fetch or change server data lives here,
 * instead of being scattered across components as ad-hoc `fetch()` calls.
 * That separation pays off in concrete ways:
 *
 *   • Components stay focused on UI — "what does this look like, how does the
 *     user interact with it" — instead of "how do I format this HTTP request".
 *   • There's exactly one spot to change if the API's base URL, auth headers,
 *     or error-handling strategy ever needs to change.
 *   • This file can be tested, swapped, or mocked independently of any
 *     component (e.g. point it at a fake in-memory API while writing tests).
 *
 * Compare this to the routes on the server (routes/routes-recipe.js in the
 * backend repo) — notice the 1-to-1 mapping between REST endpoints and the
 * exported functions below: get all / get one / create / update / delete.
 * Once you recognize the CRUD ↔ HTTP-verb pattern, an API like this one is
 * almost self-documenting.
 * ============================================================================
 */

// `import.meta.env.VITE_*` is how Vite exposes environment variables to the
// browser (only variables prefixed with VITE_ are exposed — this prevents
// accidentally shipping server secrets to the client). Falling back to a
// hardcoded localhost URL means the app still works out-of-the-box in
// development without requiring a `.env` file, while still allowing the URL
// to be overridden for staging/production builds without touching the code.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3999/api/v1/recipe';

// `new URL(...)` is a built-in browser/Node API for parsing URLs into their
// pieces (origin, pathname, search params...). `.origin` is just the
// "scheme://host:port" portion — e.g. "http://localhost:3999" — which is
// exactly the part we need below to redirect image requests to the backend.
const API_ORIGIN = new URL(API_BASE_URL).origin;

/**
 * Resolves whatever is stored in a recipe's `img` field into a URL that the
 * BACKEND (not some other host) will actually respond to.
 *
 * Why this is needed: the seed data's `img` values are full URLs pointing at
 * a *different* local server that may not be running. Rather than edit every
 * record in the database, we keep the original path and simply swap the
 * origin to our own backend (which now serves those same image files via
 * `express.static('public')` — see index.js in the API repo):
 *
 *     http://old-server:3000/spaghetti.jpg  →  http://localhost:3999/spaghetti.jpg
 *                            └────┬────┘                       └────┬────┘
 *                            same pathname                  origin swapped
 *
 * The try/catch handles two shapes of input gracefully:
 *   - a full URL            → `new URL(img)` succeeds, we keep its pathname
 *   - a bare filename/path  → `new URL(img)` THROWS (it isn't a valid URL by
 *                             itself), so we fall back to treating it as a
 *                             path relative to the backend's origin.
 * This is a good real-world example of try/catch used for CONTROL FLOW on
 * "expected" failure (parsing something that may or may not be a full URL),
 * not just for catastrophic errors.
 */
export const getImageUrl = (img) => {
  if (!img) return null;
  try {
    return `${API_ORIGIN}${new URL(img).pathname}`;
  } catch {
    return `${API_ORIGIN}/${img.replace(/^\/+/, '')}`;
  }
};

/**
 * A small wrapper around the browser's built-in `fetch`, shared by every
 * function below. Centralizing it here means:
 *   - every request automatically gets the right headers
 *   - every request is checked for HTTP-level failure (`response.ok`) —
 *     fetch() famously does NOT reject its promise on a 404 or 500, only on
 *     network failure, so this check is what turns "got a response, but it
 *     was an error" into something `try/catch` can actually catch
 *   - failures are logged in one place before being re-thrown for the
 *     caller (here, the `useRecipes` hook) to handle in a UI-appropriate way
 *
 * `async`/`await` again: `fetch` and `response.json()` both return Promises
 * (the network and JSON-parsing both take time). `await` lets us write the
 * sequence — send request, wait for response, wait for the body to be
 * parsed — as plain top-to-bottom statements.
 */
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // re-throw so the calling code (useRecipes) can react too
  }
};

// ── CRUD functions, one per REST endpoint ──────────────────────────────────
// Notice each one just describes WHAT request to make (URL + HTTP method +
// body); `apiRequest` handles HOW to make it. This thin-wrapper style keeps
// the mapping between "frontend action" and "backend endpoint" easy to scan.

// GET /api/v1/recipe → read ALL recipes
export const getAllRecipes = async () => {
  return apiRequest(API_BASE_URL);
};

// GET /api/v1/recipe/:id → read ONE recipe
export const getRecipeById = async (id) => {
  return apiRequest(`${API_BASE_URL}/${id}`);
};

// POST /api/v1/recipe → create a recipe
// `JSON.stringify` converts the JS object into the JSON text format HTTP
// bodies are sent as; the backend's `express.json()` middleware reverses
// this on arrival, turning it back into `req.body`.
export const createRecipe = async (recipe) => {
  return apiRequest(API_BASE_URL, {
    method: 'POST',
    body: JSON.stringify(recipe),
  });
};

// PUT /api/v1/recipe/:id → update a recipe
export const updateRecipe = async (id, recipe) => {
  return apiRequest(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(recipe),
  });
};

// DELETE /api/v1/recipe/:id → delete a recipe
export const deleteRecipe = async (id) => {
  return apiRequest(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};
