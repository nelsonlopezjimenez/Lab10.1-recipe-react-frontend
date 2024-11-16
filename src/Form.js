import { useState } from 'react';
// import './Form.css'

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
          size={40}
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
    // alert(event.target)
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
      <div className="recipe-form-container flex flex-col sm:w-1/2 sm:mx-60">
        <ul className='flex justify-between'>
          <li className='  text-white bg-gray-600 p-l-0 px-4 py-2 mx-4  rounded' style={{ alignSelf: 'flex-start', marginRight: 18, marginBottom: 18 }} onClick={e => handleAlert(e)}>ALERT
          </li>
          <li
            type="button"
            className="close-button  text-white bg-gray-600 p-l-0 px-4 py-2 mx-4  rounded"
            style={{ alignSelf: 'flex-end', marginRight: 18, marginBottom: 18}}
          // onClick={onClose}
          >
            X
          </li>
        </ul>
        <form className='recipe-form border-8 border-gray-600 rounded flex flex-col flex-start px-6 m-0' onSubmit={onSave} >
          {/* <form className='recipe-form' onClick={(e)=> handleAlert(e)}> */}
          {/* <form className='recipe-form' onSubmit={() => alert()}> */}
          <div className='recipe-form-line'>
            <label htmlFor='recipe-title-input'>Title</label>
            <input
              id='recipe-title-input'
              key='title'
              name='title'
              type='text'
              value={oneRecipe.title}
              size={40}
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
            className="buttons  text-white bg-gray-600 p-l-0 px-4 py-2 mx-4  rounded" style={{ alignSelf: 'flex-end', marginRight: 18, marginBottom: 18 }}
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
            className="buttons text-white bg-gray-600 p-l-0 px-4 py-2 mx-4 rounded border-6 border-white"
            type="submit"
            style={{ alignSelf: 'flex-end', marginRight: 18, marginBottom: 18 }}
          >
            SAVE
          </button>
        </form>

      </div>
    </>
  )
}
export default Form;