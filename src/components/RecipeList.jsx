import RecipeCard from './RecipeCard';

/**
 * A "list" component's whole job is to turn an array into a grid of cards —
 * it owns no state and makes no decisions about what edit/delete mean; it
 * just relays `onEdit`/`onDelete` straight through to each `RecipeCard`
 * (which is itself just relaying clicks further up to `App`). This chain —
 * App → RecipeList → RecipeCard — is "prop drilling": passing a value down
 * through several layers that don't use it themselves, only forward it.
 * It's perfectly fine at this depth; if it grew to 5+ layers, that'd be a
 * sign to reach for React Context (or a state library) instead.
 *
 * `key={recipe._id || recipe.id}` — using the database-assigned id (rather
 * than the array index, as RecipeCard does for its short-lived ingredient
 * list) is the RIGHT call here: this array can be reordered, filtered, or
 * have items removed at any moment, and a stable id keeps React's matching
 * correct across all of those changes.
 *
 * Tailwind's responsive grid: `grid-cols-1` (one column by default, i.e.
 * mobile) → `md:grid-cols-2` (two columns at the "medium" breakpoint and up)
 * → `lg:grid-cols-3` (three columns at "large" and up). No media-query CSS
 * required — the breakpoint is baked into the utility class name itself.
 */
const RecipeList = ({ recipes, onEdit, onDelete }) => {
  return (
    <div className="w-full max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id || recipe.id}
            recipe={recipe}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;