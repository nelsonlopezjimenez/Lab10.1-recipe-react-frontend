// const APIURL = '/api/v1/recipes/';
const APIURL = 'http://10.0.0.104:3999/api/v1/recipe/';
// const APIURL = '/api/v1/recipe'; // when using a proxy in frontend package.json file

export const getAllRecipes = async () => {
  let result = null;
  let error = null;
  try{
    let data = await fetch(APIURL);
    console.log(data.status)
    result = await data.json();
    return result;
  } catch (error){
    console.log(error);
  }
}


export const createRecipe =  ( async (recipe) => {
  try {
    let data = await fetch(APIURL, {
      method: 'post', headers: new Headers({'Content-type': 'aplication/json',}), 
      body: JSON.stringify(recipe),
    })
    let result = data.json();
    return result;
  } catch (error){
    console.log(error);
  }
})



export const removeRecipe = ( async (id) => {
  try {
    let data = await fetch(APIURL + id, { method: 'delete'})
    let result = await data.json();
    console.log(result)
    return result;
  } catch (error){
    console.log(error)
  }
})

export const getOneRecipe = ( async (id) => {
  try {
    let data = await fetch(APIURL + id, { method: 'get'})
    let result = await data.json();
    return result;
  } catch (error){
    console.log(error)
  }
})

