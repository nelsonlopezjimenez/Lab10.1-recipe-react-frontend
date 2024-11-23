// const APIURL = '/api/v1/recipes/';
let APIURL = 'http://10.0.0.104:3999/api/v1/recipe/';
APIURL = 'http://192.168.0.105:3999/api/v1/recipe/';
APIURL = 'http://localhost:3999/api/v1/recipe/';
// const APIURL = '/api/v1/recipe'; // when using a proxy in frontend package.json file

export async function getAllData() {
  try {
    const data = await fetch(APIURL);
    if (!data.ok) {
      throw new Error(`Response status: ${data.status}`);
    }
    const result = await data.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export const getAllRecipes = async () => {
  let result = null;
  // let error = null; //is assigned a value but never used
  try{
    let data = await fetch(APIURL);
    console.log(data.status)
    result = await data.json();
    return result;
  } catch (error){
    console.log(error);
  }
}

export const createRecipeX = async newItem => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const data = await fetch(APIURL, {
    method: "post",
    body: JSON.stringify(newItem),
    headers: myHeaders,
  });
  const result = await data.json()
  console.log(result)
}
export const createRecipe =  ( async (recipe) => {
  console.log(recipe);
  console.log(JSON.stringify(recipe));
  try {
    let data = await fetch(APIURL, {
      method: 'post', headers: {"Content-Type":"application/json"},
      body: JSON.stringify(recipe),
    })
    let result = await data.json();
    return result;
  } catch (error){
    console.log(error);
  }
})

export const onEdit = async id => {
  const data = await fetch(APIURL + id);
  const result = await data.json();
  return result;
}

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
export const putOneRecipe = ( async (recipe) => {
  console.log(`Api frontend: `, recipe)
  console.log(`Api frontend: `, JSON.stringify(recipe))
  try {
    let data = await fetch(APIURL + recipe._id, { method: 'PUT', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(recipe)
      // body: JSON.stringify({instructions:recipe.instructions})
  
  })
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

