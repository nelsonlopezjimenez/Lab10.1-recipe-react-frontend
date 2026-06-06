/**
 * The smallest possible presentational component: no props, no state, just a
 * fixed chunk of UI for one specific moment — "data is in flight". `App`
 * decides WHEN to show it (`{loading && <LoadingSpinner />}`); this component
 * only decides WHAT it looks like. Splitting "when" from "what" like this is
 * what makes each piece easy to reason about (and to swap out later — e.g.
 * for a skeleton-screen loader — without touching `App` at all).
 *
 * The animation itself is pure Tailwind: `animate-spin` applies a built-in
 * keyframe rotation, `rounded-full` + `border-b-2` turn a plain square `div`
 * into a ring with one highlighted edge — the classic "spinner" look, with
 * zero custom CSS or JS.
 */
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      <p className="mt-4 text-gray-600">Loading recipes...</p>
    </div>
  );
};

export default LoadingSpinner;