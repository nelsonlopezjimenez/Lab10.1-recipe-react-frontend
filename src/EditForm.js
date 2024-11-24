// from https://www.google.com/search?q=react+how+to+repopulate+a+form+action+PUT&rlz=1C1RXQR_enUS1136US1136&oq=react+how+to+repopulate+a+form+action+PUT&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgkIAhAhGAoYoAEyCQgDECEYChigATIJCAQQIRgKGKABMgkIBRAhGAoYoAEyBwgGECEYqwIyBwgHECEYqwIyBwgIECEYjwLSAQk3MDA0M2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as apiCalls from './api.js';

const APIURL = 'http://localhost:3999/api/v1/recipe/';

function EditForm(props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  console.log(props.oneRecipe._id)
  let tmp = props.oneRecipe._id || '67420b51f16882dc43aa237a' 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await apiCalls.getOneRecipe(tmp);
    //   const response = await fetch(`${APIURL}${props.oneRecipe._id}`);
    //   const data = await response.json();
      reset(response);
      setIsLoading(false);
    };

    fetchData();
  }, [tmp, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await fetch(`${APIURL}${tmp}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // Optionally handle success, e.g., redirect or update UI
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };
  let inputs = null;
  return (
    <>
    <div className="recipe-form-container flex flex-col sm:w-1/2 sm:mx-60 bg-gray-200">

      <form className='recipe-form border-8 border-gray-600 rounded-lg flex flex-col flex-start px-6 m-0' onSubmit={handleSubmit(onSubmit)} >
        {isLoading && <div>Loading...</div>}

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
            {...register('title')}
            size={40}
            autoComplete="off"
             placeholder="title" required />
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
          {...register('instructions')}
           required />
        {inputs}
        <button
          type="button"
        //   onClick={handleNewIngredient}
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
            {...register('img')}
            size={36}
            autoComplete='off'
            required />
        </div>
        <div className='flex flex-row justify-between p-4 '>
          <button
            className="buttons text-white bg-gray-600 p-l-0 px-4 py-2 mx-4 rounded border-6 border-white"
            type="submit"

            onClick={() => console.log('cancel button clicked')}
          >
            Cancel
          </button>
          <button
            className="buttons text-white bg-gray-600 p-l-0 px-4 py-2 mx-4 rounded border-6 border-white"
            type="submit"

            
          >
            Save
          </button>
        </div>
      </form>

    </div>
  </>
  )

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {isLoading && <div>Loading...</div>}
//       <input type="text" {...register('name')} />
//       {/* ... other form fields */}
//       <button type="submit">Update</button>
//     </form>
//   );
}
export default EditForm;