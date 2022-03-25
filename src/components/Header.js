import { useEffect, useState } from "react";

const Header = ({ formIsToggled, setFormIsToggled }) => {
  const [ isScrolled, setIsScrolled ] = useState(window.scrollY > 0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      (window.scrollY > 0) !== isScrolled && setIsScrolled(window.scrollY > 0);
    });
  }, []);
  
  const handleClick = (e) => {
    e.preventDefault();
    setFormIsToggled(!formIsToggled);
    document.getElementById("recipe-title-input").focus();
  };
  
  return (
    <header className={`${isScrolled ? "scrolled" : ""}`}>
      <h1>
        <span className="logo-my">My</span> 
        <span className="logo-recipes">Recipes</span>
      </h1>

      <button 
        id="add-recipe"
        onClick={e => handleClick(e)}
      >
        {formIsToggled ? "Cancel" : "Add Recipe"}
      </button>
    </header>
  );
};

export default Header;