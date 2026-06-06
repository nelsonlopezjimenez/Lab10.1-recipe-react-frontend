/**
 * The third "render state" alongside `RecipeList` (success) and
 * `LoadingSpinner` (pending) — together they cover the three things that can
 * be true about an async request at any moment: it's loading, it failed, or
 * it succeeded. `App` picks exactly one based on `loading`/`error`/`recipes`
 * from `useRecipes` (see the `{loading && ...}` / `{error && ...}` /
 * `{!loading && !error && ...}` block in `App.jsx`'s `return`).
 *
 * `onRetry` is OPTIONAL — `{onRetry && <button>...}` only renders the button
 * when a retry function was actually provided, so this same component could
 * be reused for an error that has no sensible "try again" (e.g. "recipe not
 * found"). `App` wires it to `refreshRecipes` from the hook, letting the user
 * re-run the failed fetch without reloading the whole page.
 */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-red-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;