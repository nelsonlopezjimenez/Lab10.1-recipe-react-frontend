const NavBar = ({ onToggleForm, onShowForm, onHideForm, showForm }) => {
  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">🍳 Recipe Manager</span>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleForm}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                showForm 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-primary-700 hover:bg-primary-800'
              }`}
            >
              {showForm ? 'Hide Form' : 'Add Recipe'}
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