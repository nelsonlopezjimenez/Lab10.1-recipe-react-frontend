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
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
          type="text"
          name={`ingredient-${i}`}
          value={ing}
          size={40}
          autoComplete="off"
          placeholder=" Ingredient"
          onChange={handleChangeIng} required/>
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
        <form className='recipe-form border-8 border-gray-600 rounded-lg flex flex-col flex-start px-6 m-0' onSubmit={onSave} >
          {/* <form className='recipe-form' onClick={(e)=> handleAlert(e)}> */}
          {/* <form className='recipe-form' onSubmit={() => alert()}> */}
          {/* <div>
            <label htmlFor="title1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title 1</label>
            <input type="text" id="title1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            key='title1' name='title1' value={oneRecipe.title}  autoComplete="off" onChange={handleChange} placeholder="title" required />
        </div> */}
          <div className='recipe-form-line '>
            <label htmlFor='recipe-title-input'>Title</label>
            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
              id='recipe-title-input'
              key='title'
              name='title'
              type='text'
              value={oneRecipe.title}
              size={40}
              autoComplete="off"
              onChange={handleChange} placeholder="title" required  />
          </div>
          <label
            htmlFor='recipe-instructions-input block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            style={{ marginTop: '5px' }}
          >
            Instructions
          </label>
          <textarea className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
            key='instructions'
            id='recipe-instructions-input'
            type='Instructions'
            name='instructions'
            rows='8'
            cols='50'
            autoComplete='off'
            value={oneRecipe.instructions}
            onChange={handleChange} required/>
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
            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              id='recipe-img-input'
              type='text'
              placeholder=''
              name='img'
              value={oneRecipe.img}
              size={36}
              autoComplete='off'
              onChange={handleChange} required/>
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