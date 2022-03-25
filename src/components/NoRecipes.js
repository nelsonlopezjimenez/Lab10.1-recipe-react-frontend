import { BsArrowUpRight } from "react-icons/bs";
import { GiHotDog } from "react-icons/gi";

const NoRecipes = () => {
  return (
    <div className="no-recipes">
      <span>
        Sorry, there aren't any stored recipes. Add one with button in the top right.
      </span>
      <div className="icon-wrapper">
        <GiHotDog />
        <BsArrowUpRight />
      </div>
    </div>
  );
};

export default NoRecipes;