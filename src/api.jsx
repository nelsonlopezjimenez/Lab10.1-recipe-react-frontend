// const APIURL = '/api/v1/recipes/';
const APIURL = 'http://localhost:3999/api/v1/recipe';

// headers: {
//   "Access-Control-Allow-Origin": "*",
//   "Content-Type": "application/json", //this line solved cors
// },
export async function getRecipes() {

  return fetch(APIURL, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json", //this line solved cors
    },
  }
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        if (!response.ok) {
          if (response.status >= 400 && response.status < 500) {
            return response.json().then(data => {
              let err = { errorMessage: data.message };
              throw err;
            })
          }
          else {
            let err = { errorMessage: 'Please try again later, server is not responding' };
            throw err;
          }
        }
      }
    })
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
// app.use(cors({
//   origin: ["https://www.mywebsite.ca", "http://localhost:3000"], // Allow requests from this origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
//   exposedHeaders: ['Authorization'], // Headers that clients are allowed to access
//   credentials: true, // Allow sending cookies along with requests
//   maxAge: 86400, // Cache preflight request for 1 day (in seconds)
// }));
