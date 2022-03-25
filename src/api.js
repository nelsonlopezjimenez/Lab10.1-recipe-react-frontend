const APIURL = '/api/recipes/';

const checkResponse = (response) => {
  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      return response.json().then(data => {
        let err = { errorMessage: data.message };
        throw err;
      })
    } else {
      let err = { errorMessage: 'Please try again later, server is not responding' };
      throw err;
    }
  }
  else {
    return response.json();
  }
};


export async function getRecipes() {
  return fetch(APIURL)
    .then(response => checkResponse(response));
    // .then(response => {
    //   if (response.ok) {
    //     return response.json();
    //   }
    //   else {
    //     if (!response.ok) {
    //       if (response.status >= 400 && response.status < 500) {
    //         return response.json().then(data => {
    //           let err = { errorMessage: data.message };
    //           throw err;
    //         })
    //       }
    //       else {
    //         let err = { errorMessage: 'Please try again later, server is not responding' };
    //         throw err;
    //       }
    //     }
    //   }
    // })
  }

  export async function createRecipe(recipe) {
    return fetch(APIURL, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(recipe)
      })
      .then(response => checkResponse(response));
      // .then(resp => {
      //   if (!resp.ok) {
      //     if (resp.status >= 400 && resp.status < 500) {
      //       return resp.json().then(data => {
      //         let err = { errorMessage: data.message };
      //         throw err;
      //       })
      //     } else {
      //       let err = { errorMessage: 'Please try again later, server is not responding' };
      //       throw err;
      //     }
      //   }
      //   return resp.json();
      // })
  }
  
  export async function removeRecipe(id) {
    const deleteURL = APIURL + id;

    return fetch(deleteURL, {
        method: 'delete'
      })
      .then(response => checkResponse(response));
      // .then(resp => {
      //   if (!resp.ok) {
      //     if (resp.status >= 400 && resp.status < 500) {
      //       return resp.json().then(data => {
      //         let err = { errorMessage: data.message };
      //         throw err;
      //       })
      //     } else {
      //       let err = { errorMessage: 'Please try again later, server is not responding' };
      //       throw err;
      //     }
      //   }
      //   return resp.json();
      // })
  }
  