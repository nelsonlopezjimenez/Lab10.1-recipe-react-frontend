import { getImageUrl } from '../api';

/**
 * ============================================================================
 *  RECIPE CARD — a small, focused presentational component
 * ============================================================================
 * This component knows how to render ONE recipe and nothing else. It doesn't
 * fetch data, doesn't know what a "list" is, and doesn't decide what happens
 * on edit/delete — it just displays `recipe` and calls `onEdit` / `onDelete`
 * (functions handed down from `App` via `RecipeList`) when the user clicks.
 * Small, single-purpose components like this are easy to read in one sitting,
 * easy to reuse, and easy to test in isolation.
 * ============================================================================
 */

// An inline SVG `data:` URI — a complete image encoded directly in the URL
// string, requiring zero network requests. Perfect for a fallback that must
// always be available, even (especially!) when the network is the problem.
const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3Ctext x='150' y='95' font-family='system-ui' font-size='13' fill='%239ca3af' text-anchor='middle'%3E%F0%9F%93%B7%3C/text%3E%3Ctext x='150' y='115' font-family='system-ui' font-size='13' fill='%239ca3af' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
  // PROPS DESTRUCTURING, twice over: the function parameter pulls `recipe`,
  // `onEdit`, `onDelete` out of the props object React passes in, and this
  // line pulls the individual fields out of `recipe` itself — with a default
  // (`= []`) for `ingredients` in case a recipe was saved without any.
  // This is idiomatic React: name exactly the values you'll use, right where
  // you'll use them, instead of writing `recipe.title`, `recipe.img`, etc.
  // throughout the JSX below.
  const { _id, title, img, ingredients = [], instructions } = recipe;

  /**
   * The `<img>` element's `onError` event fires when the browser fails to
   * load whatever `src` currently points to — wrong URL, offline server,
   * blocked request, anything. `e.target` is the actual <img> DOM node, so
   * we can reach in and swap its `src` to our guaranteed-to-work fallback.
   *
   * `e.target.onerror = null` BEFORE changing `src` is the crucial line: if
   * we skipped it and the fallback image somehow also failed, `onError`
   * would fire again, set the same `src` again, fail again... an infinite
   * loop of failed requests. Clearing the handler first means "give this one
   * swap a try, and if THAT fails too, just give up silently."
   */
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMG;
  };

  /**
   * ── Reading Tailwind's "utility classes" ──────────────────────────────
   * Tailwind doesn't give you pre-built components (no `.card`, `.button`
   * baked in) — instead it gives you small, single-purpose CSS classes that
   * each do ONE thing, which you compose directly in your markup:
   *
   *     bg-white        → background-color: white
   *     rounded-xl      → border-radius: 0.75rem
   *     shadow-lg       → a preset box-shadow
   *     overflow-hidden → overflow: hidden
   *     hover:shadow-xl → a BIGGER shadow, but only `:hover` (the `hover:`
   *                       prefix is a "variant" — same idea applies to
   *                       `focus:`, `md:`, `lg:`, `disabled:`...)
   *     transition-shadow duration-300 → animate shadow changes over 300ms
   *
   * Read a long `className` string left-to-right as a list of tiny,
   * independent style declarations rather than one mysterious blob — once
   * you know ~20 of these prefixes/scales, you can usually guess the rest.
   * (`.btn-primary`, `.card`, etc. in index.css show the OPPOSITE approach:
   * bundling utilities into a reusable class with `@apply` — useful once a
   * combination repeats often enough to be worth naming.)
   */
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={getImageUrl(img) || FALLBACK_IMG}
          alt={title}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Ingredients */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">
            Ingredients ({ingredients.length})
          </h4>
          {/*
            RENDERING LISTS: `.map` turns each array item into a JSX element.
            React requires a unique `key` prop on each item so it can match
            elements across re-renders (and avoid re-creating/re-ordering DOM
            nodes unnecessarily). Array `index` works here because this list
            is never reordered or filtered client-side — but prefer a stable
            id (like `recipe._id`) whenever the array CAN change shape, or
            React can mis-match items and produce subtle UI bugs.
          */}
          <ul className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
            {ingredients.slice(0, 5).map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span className="line-clamp-1">{ingredient}</span>
              </li>
            ))}
            {ingredients.length > 5 && (
              <li className="text-gray-400 italic">
                +{ingredients.length - 5} more ingredients...
              </li>
            )}
          </ul>
        </div>

        {/* Instructions Preview */}
        {instructions && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Instructions
            </h4>
            <p className="text-sm text-gray-600 line-clamp-3">
              {instructions}
            </p>
          </div>
        )}

        {/*
          ACTIONS — "lifting state up" in action. This card doesn't decide
          what editing or deleting MEANS (that logic, and the state it
          touches, lives in App.jsx); it just reports "the user clicked edit
          on THIS recipe" by calling the `onEdit`/`onDelete` callbacks it was
          handed as props, passing along the data the parent will need. Wrapping
          them in arrow functions (`() => onEdit(recipe)`) lets us pass `recipe`
          along WITHOUT calling `onEdit` immediately during render — only
          when the click actually happens.
        */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(recipe)}
            className="flex items-center px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors font-semibold"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>

          <button
            onClick={() => onDelete(_id)}
            className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-semibold"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;