const APIURL = "/api/recipes/";

export async function getRecipes() {
  return fetch(APIURL).then((response) => {
    if (response.ok) {
      return response.json();
    }
    errorMessage(response);
  });
}

export async function createRecipe(recipe) {
  return fetch(APIURL, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(recipe),
  }).then((resp) => {
    errorMessage(resp);
    return resp.json();
  });
}

export async function removeRecipe(id) {
  const deleteURL = APIURL + id;
  return fetch(deleteURL, {
    method: "delete",
  }).then((resp) => {
    errorMessage(resp);
    return resp.json();
  });
}

//I believe this is how we would implement DRY code, by removing the
//duplicate code and placing it into a method that can then be called
function errorMessage(response) {
  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      return response.json().then((data) => {
        let err = { errorMessage: data.message };
        throw err;
      });
    } else {
      let err = {
        errorMessage: "Please try again later, server is not responding",
      };
      throw err;
    }
  }
}
