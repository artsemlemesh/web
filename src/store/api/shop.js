import WebService from '../../helpers/WebService'

export const getListings = (url) => {
  return new Promise((resolve, reject) => {
    WebService.getShopListings(url)
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

export const getListingDetail = (id) => {
  return new Promise((resolve, reject) => {
    WebService.getListingDetail(id)
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

export const loadItemOptions = () => {
  return new Promise((resolve, reject) => {
    WebService.loadItemOptions()
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

export const getUrl = (url) => {
  return new Promise((resolve, reject) => {
    WebService.getUrl(url)
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

export const getBuyerOderList = () => {
  return new Promise((resolve, reject) => {
    WebService.getBuyerOderList()
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
