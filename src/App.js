import React, { Component, useState } from 'react';

import './style/style.scss';

import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";

const defaultRecipesArray = [
  {
    id: 0,
    title: "Spaghetti",
    instructions: "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
    ingredients: ["pasta", "8 cups water", "1 box spaghetti"],
    img: "img/spaghetti.jpg"
  },
  {
    id: 1,
    title: "Milkshake",
    instructions: "Combine ice cream and milk.  Blend until creamy",
    ingredients: ["2 Scoops Ice cream", "8 ounces milk"],
    img: "img/milkshake.jpg"
  },
  {
    id: 2,
    title: "Avocado Toast",
    instructions: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
    ingredients: ["2 slices of bread", "1 avocado", "1 tablespoon olive oil", "1 pinch of salt", "pepper"],
    img: "img/avocado_toast.jpg"
  },  
  {
    id: 3,
    title: "Puttanesca",
    instructions: "Drain tomatoes and crush with fork or hands. Add to skillet, with some salt and pepper. Raise heat to medium-high and cook, stirring occasionally, until tomatoes break down and mixture becomes saucy, about 10 minutes. Stir in olives, capers and red pepper flakes, and continue to simmer.",
    ingredients: ["3 tablespoons olive oil", "3 cloves garlic", "3 anchovy fillets", "28-ounce can whole plum tomatoes", ".5 cup pitted black olives", "2 tablespoons capers", "Red pepper flakes"],
    img: "img/puttanesca.jpg"
  },
  {
    id: 4,
    title: "Frittata",
    instructions: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
    ingredients: ["2 slices of bread", "1 avocado", "1 tablespoon olive oil", "1 pinch of salt", "pepper"],
    img: "img/frittata.webp"
  },
  {
    id: 5,
    title: "Moules Frites",
    instructions: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
    ingredients: ["2 slices of bread", "1 avocado", "1 tablespoon olive oil", "1 pinch of salt", "pepper"],
    img: "img/moulesfrites.jpg"
  }
];


const App = ({ props }) => {
  const [ formIsToggled, setFormIsToggled ]   = useState(false);
  const [ recipes, setRecipes ]               = useState(defaultRecipesArray);

  const handleSave = recipe => {
    setRecipes([...recipes, { ...recipe, id: recipes.length}]);
  }

  return (
    <div className="App">
      <Header 
        formIsToggled={formIsToggled}
        setFormIsToggled={setFormIsToggled}
      />

      <RecipeForm
        isToggled={formIsToggled}
        setIsToggled={setFormIsToggled}
      />

      <RecipeList
        formIsToggled={formIsToggled}
        setFormIsToggled={setFormIsToggled}
        recipes={recipes}
      />

      <Footer 
        formIsToggled={formIsToggled}
      />
    </div>
  );
};


class Form extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      instructions: "",
      ingredients: [''],
      img: ''
    };
    
    //this.handleChange = this.handleChange.bind(this);
    this.handleNewIngredient = this.handleNewIngredient.bind(this);
    this.handleChangeIng = this.handleChangeIng.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // handleChange(e) {
  //   console.log(e.target.value);
  //   this.setState({[e.target.name]: e.target.value});
  // }

     // Pay ATTENTION: arrow functions DO NOT HAVE their own "this" : no need to bind
  handleChangeTitle= (e) => {
    console.log(e.target.value);
    this.setState({title: e.target.value})
  }
  handleChangeIns = (e) => {
    console.log(e.target.value);
    this.setState({instructions: e.target.value})
  }
  handleChangeImg = (e) => {
    console.log(e.target.value);
    this.setState({img: e.target.value})
  }
  
  handleNewIngredient(e) {
    const {ingredients} = this.state;
    this.setState({ingredients: [...ingredients, '']});
  }
  
  handleChangeIng(e) {
    const index = Number(e.target.name.split('-')[1]);
    const ingredients = this.state.ingredients.map((ing, i) => (
      i === index ? e.target.value : ing
    ));
    this.setState({ingredients});
  }

  // EXERCISE 3: handleReset call must set state to its initial state as 
  //             when the constructor of class Form is called (look above)
  //            You should use this.setState( {.....})
  handleReset = (e) => {
    e.preventDefault();
    alert(`Are you sure you want to reset?`)
   {/*Modify it here EXERCISE 3 */}
}

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave({...this.state});
    this.setState({
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    })
  }
  
  render() {
    const {title, instructions, img, ingredients} = this.state;
    let inputs = ingredients.map((ing, i) => (
      <div
        className="recipe-form-line"
        key={`ingredient-${i}`}
      >
        <label>{i+1}.
          <input
            type="text"
            name={`ingredient-${i}`}
            value={ing}
            size={45}
            autoComplete="off"
            placeholder=" Ingredient"
            onChange={this.handleChangeIng} />
        </label>
      </div>
    ));
    
    return (
      <div className="recipe-form-container">
        <form className='recipe-form' onSubmit={this.handleSubmit}>
          <button
            type="button"
            className="close-button"
            onClick={this.handleReset}
          >
            X
          </button>
          <div className='recipe-form-line'>
            <label htmlFor='recipe-title-input'>Title</label>
            <input
              id='recipe-title-input'
              key='title'
              name='title'
              type='text'
              value={title}
              size={42}
              autoComplete="off"
              onChange={this.handleChangeTitle}/>
          </div>
          <label
            htmlFor='recipe-instructions-input'
            style={{marginTop: '5px'}}
          >
            Instructions
          </label>
          <textarea
            key='instructions'
            id='recipe-instructions-input'
            type='Instructions'
            name='instructions'
            rows='8'
            cols='50'
            autoComplete='off'
            value={instructions}
            onChange={this.handleChangeIns}/>
          {inputs}
          <button
            type="button"
            onClick={this.handleNewIngredient}
            className="buttons"
          >
            +
          </button>
          <div className='recipe-form-line'>
            <label htmlFor='recipe-img-input'>Image Url</label>
            <input
              id='recipe-img-input'
              type='text'
              placeholder=''
              name='img'
              value={img}
              size={36}
              autoComplete='off'
              onChange={this.handleChangeImg} />
          </div>
          <button
            type="submit"
            className="buttons"
            style={{alignSelf: 'flex-end', marginRight: 0}}
          >
            SAVE
          </button>
        </form>
      </div>
    )
  }
}


export default App;
