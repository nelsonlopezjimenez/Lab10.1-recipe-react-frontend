/**
 * A "dumb"/presentational component: it receives everything it needs as
 * props — including the click handlers themselves (`onToggleForm`, etc.) —
 * and has no state or logic of its own (besides deciding which CSS classes
 * to apply). All the real decisions ("what does showing the form actually
 * mean?") live in `App`, which owns the `showForm` state. This separation
 * means `NavBar` could be dropped into a different app, or have its handlers
 * wired to completely different behavior, without changing a single line in
 * here.
 */
const NavBar = ({ onToggleForm, onShowForm, onHideForm, showForm }) => {
  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">🍳 Recipe Manager</span>
          </div>

          {/*
            DYNAMIC TAILWIND CLASSES via a template literal + ternary: the
            base utility classes (`px-4 py-2 rounded-lg...`) always apply,
            while a small ternary picks ONE extra pair of utilities based on
            `showForm` — red "stop" colors when the form is open (button now
            means "hide"), the app's primary brand color when it's closed
            (button means "show"). The button's accessible LABEL changes too
            (see the text inside), so color isn't the only signal — useful
            for users who can't distinguish the colors.
          */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleForm}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                showForm
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-primary-700 hover:bg-primary-800"
              }`}
            >
              {showForm ? "Hide Form" : "Add Recipe"}
            </button>

            {showForm && (
              <>
                <button
                  onClick={onShowForm}
                  className="px-3 py-2 text-sm bg-primary-700 hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Show
                </button>
                <button
                  onClick={onHideForm}
                  className="px-3 py-2 text-sm bg-primary-700 hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Hide
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
