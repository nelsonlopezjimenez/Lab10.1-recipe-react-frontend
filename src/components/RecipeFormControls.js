const RecipeFormControls = ({ handleReset, handleSubmit }) => {
  return (
    <div className="form-controls">
      <button 
        className="form-controls-add form-button"
        onClick={() => handleSubmit()}
      >
        Add Recipe 
      </button>

      <button 
        className="form-controls-reset form-button"
        onClick={() => handleReset()}
      >
        Reset
      </button>
      
    </div>
  );
};

export default RecipeFormControls;