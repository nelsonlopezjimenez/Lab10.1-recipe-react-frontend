import { useState } from 'react';
import './Form.css'

function Form(props) {
  const [oneRecipe, setOneRecipe] = useState({
    title: '',
    instructions: '',
    ingredients: [''],
    img: ''
  })
  const handleChangeIng = (event) => {
    const index = Number(event.target.name.split('-')[1]);
    const ingredients = oneRecipe.ingredients.map((ingr, i) => (
      i === index ? event.target.value : ingr
    ))
    setOneRecipe((prevItem) => {
      return { ...prevItem, ingredients }
    })
  }
  const handleChange = (event) => {
    setOneRecipe((prevItem) => {
      return { ...prevItem, [event.target.name]: event.target.value }
    })
  }

  let inputs = oneRecipe.ingredients.map((ing, i) => (
    <div
      className="recipe-form-line"
      key={`ingredient-${i}`}
    >
      <label>{i + 1}.
        <input
          type="text"
          name={`ingredient-${i}`}
          value={ing}
          size={45}
          autoComplete="off"
          placeholder=" Ingredient"
          onChange={handleChangeIng} />
      </label>
    </div>
  ));
  const handleNewIngredient = (event) => {
    setOneRecipe(prevItem => {
      return { ...prevItem, ingredients: [...prevItem.ingredients, ""] }
    })
  }

  const handleAlert = (event) => {
    console.log(oneRecipe)
    // alert(event.target.title)
  }
  const onSave = (event) => {
    event.preventDefault();
    console.log(oneRecipe);
    props.onSave({ ...oneRecipe })
    setOneRecipe({
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    })
  }
  return (
    <>
      <div className="recipe-form-container">
        <form className='recipe-form' onSubmit={onSave} >
          {/* <form className='recipe-form' onClick={(e)=> handleAlert(e)}> */}
          {/* <form className='recipe-form' onSubmit={() => alert()}> */}
          <button
            type="button"
            className="close-button"
          // onClick={onClose}
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
              value={oneRecipe.title}
              size={42}
              autoComplete="off"
              onChange={handleChange} />
          </div>
          <label
            htmlFor='recipe-instructions-input'
            style={{ marginTop: '5px' }}
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
            value={oneRecipe.instructions}
            onChange={handleChange} />
          {inputs}
          <button
            type="button"
            onClick={handleNewIngredient}
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
              value={oneRecipe.img}
              size={36}
              autoComplete='off'
              onChange={handleChange} />
          </div>
          <button
            type="submit"
            className="buttons"
            style={{ alignSelf: 'flex-end', marginRight: 0 }}
          >
            SAVE
          </button>
          <button onClick={e => handleAlert(e)}>ALERT</button>
        </form>
      </div>
    </>
  )
}
export default Form;