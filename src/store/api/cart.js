import WebService from '../../helpers/WebService'

export const getCart = () => {
  return new Promise((resolve, reject) => {
    WebService.getCart()
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else {
          reject(new Error(response.body))
        }
      })
      .catch(reject)
  })
}

export const addToCart = (item) => {
  return new Promise((resolve, reject) => {
    WebService.addToCart(item)
      .then((response) => {
        if (response.statusCode === 201) {
          resolve(response.body)
        } else if (response.statusCode === 400) {
          // Item already exists
          resolve(response.body)
        } else {
          reject(new Error(response.body))
        }
      })
      .catch(reject)
  })
}

export const deleteFromCart = (itemID) => {
  return new Promise((resolve, reject) => {
    WebService.deleteFromCart(itemID)
      .then((response) => {
        if (response.statusCode === 204) {
          resolve(response.body)
        } else if (response.statusCode === 404) {
          // Item already deleted
          resolve(response.body)
        } else {
          reject(new Error(response.body))
        }
      })
      .catch(reject)
  })
}

export const cartCheckout = (cartData) => {
  return new Promise((resolve, reject) => {
    WebService.cartCheckout(cartData)
      .then((response) => {
        if (response.statusCode === 200 || response.statusCode === 201) {
          resolve(response.body)
        } else {
          reject(new Error(response.body))
        }
      })
      .catch(reject)
  })
}
