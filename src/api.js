const APIURL = '/api/recipes/';

export async function getRecipes() {
  return fetch(APIURL)
    .then(resp => {
      if (!resp.ok) {
        if (resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = { errorMessage: data.message };
            throw err;
          })
        } else {
          let err = { errorMessage: 'Please try again later, server is not responding' };
          throw err;
        }
      } else {
        console.log("getRecipes: everything is fine");
        //shows the promise 
        return resp.json();
      }
      //console.log("getRecipes resp: ", resp.json())
      
    });
}

export async function createRecipe(recipe) {
  return fetch(APIURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(recipe)
  })
    .then(resp => {
      if (!resp.ok) {
        if (resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = { errorMessage: data.message };
            throw err;
          })
        } else {
          let err = { errorMessage: 'Please try again later, server is not responding' };
          throw err;
        }
      }
      return resp.json();
    })
}

export async function removeRecipe(id) {
  const deleteURL = APIURL + id;
  return fetch(deleteURL, {
    method: 'delete'
  })
    .then(resp => {
      if (!resp.ok) {
        if (resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = { errorMessage: data.message };
            throw err;
          })
        } else {
          let err = { errorMessage: 'Please try again later, server is not responding' };
          throw err;
        }
      }
      return resp.json();
    })
}
