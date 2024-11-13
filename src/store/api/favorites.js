import WebService from '../../helpers/WebService'




export const addFavorite = (productID, credentials) => {
    return new Promise((resolve, reject) => {
      WebService.addFavorite(productID, credentials)
        .then((response) => {
          if (response.statusCode === 201) {
            // Successfully added the favorite
            resolve(response.body);
          } else if (response.statusCode === 400) {
            // Item already exists as favorite
            resolve(response.body);
          } else {
            reject(new Error(response.body));
          }
        })
        .catch(reject);
    });
  };
  
  export const deleteFavorite = (productID, credentials) => {
    return new Promise((resolve, reject) => {
      WebService.deleteFavorite(productID, credentials)
        .then((response) => {
          if (response.statusCode === 204 || response.statusCode === 200) {
            // Successfully deleted the favorite
            resolve(response.body);
          } else if (response.statusCode === 404) {
            // Item was already deleted or not found
            resolve(response.body);
          } else {
            reject(new Error(response.body));
          }
        })
        .catch(reject); 
    });
  };