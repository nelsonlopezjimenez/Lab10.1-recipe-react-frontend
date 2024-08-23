// const APIURL = '/api/v1/recipes/';
const APIURL = 'http://localhost:3999/api/v1/recipe';
// const APIURL = '/api/v1/recipe';

export const getAllRecipes = async () => {
  let data = await fetch(APIURL);
  let result = await data.json();
  return result;
}

// export async function getRecipes() {

//   return fetch(APIURL)
//     .then(response => {
//       if (response.ok) {
//         console.log(response)
//         return response.json().then(data => data);
//       }
//       else {
//         if (!response.ok) {
//           if (response.status >= 400 && response.status < 500) {
//             return response.json().then(data => {
//               let err = { errorMessage: data.message };
//               throw err;
//             })
//           }
//           else {
//             let err = { errorMessage: 'Please try again later, server is not responding' };
//             throw err;
//           }
//         }
//       }
//     })
//   }

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

// export async function removeRecipe(id) {
//   const deleteURL = APIURL + id;
//   return fetch(deleteURL, {
//     method: 'delete'
//   })
//     .then(resp => {
//       if (!resp.ok) {
//         if (resp.status >= 400 && resp.status < 500) {
//           return resp.json().then(data => {
//             let err = { errorMessage: data.message };
//             throw err;
//           })
//         } else {
//           let err = { errorMessage: 'Please try again later, server is not responding' };
//           throw err;
//         }
//       }
//       return resp.json();
//     })
//
