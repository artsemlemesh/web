import WebService from '../../helpers/WebService'

export const getBundleList = () => {
  return new Promise((resolve, reject) => {
    WebService.getBundleList()
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

export const getBundleDetail = (id) => {
  return new Promise((resolve, reject) => {
    WebService.getBundleDetail(id)
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

export const createNewBundle = (title, tags, description, seller_price) => {
  return new Promise((resolve, reject) => {
    WebService.createNewBundle(title, tags, description, seller_price)
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

export const updateBundle = (id, item) => {
  return new Promise((resolve, reject) => {
    WebService.updateBundle(id, item)
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

export const publishBundle = (id) => {
  return new Promise((resolve, reject) => {
    WebService.publishBundle(id)
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

export const deleteBundle = (pk) => {
  return new Promise((resolve, reject) => {
    WebService.deleteBundle(pk)
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

export const addItem = (id, item) => {
  return new Promise((resolve, reject) => {
    WebService.addItem(id, item)
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

export const updateItem = (listingId, id, item) => {
  return new Promise((resolve, reject) => {
    WebService.updateItem(listingId, id, item)
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

export const deleteItem = (listingId, id) => {
  return new Promise((resolve, reject) => {
    WebService.deleteItem(listingId, id)
      .then((response) => {
        if (response.statusCode === 204) {
          resolve(response.body)
        } else {
          reject(new Error(response.body))
        }
      })
      .catch(reject)
  })
}
