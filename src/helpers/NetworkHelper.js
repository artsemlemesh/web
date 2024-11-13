import axios from 'axios'
import { getItem } from './storage'
class NetworkHelper {
  static DEFAULT_CONTENT_TYPE = 'application/json; charset=UTF-8;'

  static requestPost(url, params, content_type = this.DEFAULT_CONTENT_TYPE) {
    return NetworkHelper.requestHttp('POST', url, params, content_type)
  }

  static requestGet(url, content_type = this.DEFAULT_CONTENT_TYPE) {
    return NetworkHelper.requestHttp('GET', url, content_type)
  }

  static requestPut(url, params, content_type = this.DEFAULT_CONTENT_TYPE) {
    return NetworkHelper.requestHttp('PUT', url, params, content_type)
  }

  static requestPatch(url, params, content_type = this.DEFAULT_CONTENT_TYPE) {
    return NetworkHelper.requestHttp('PATCH', url, params, content_type)
  }

  static requestDelete(url, params, content_type = this.DEFAULT_CONTENT_TYPE) {
    return NetworkHelper.requestHttp('DELETE', url, params, content_type)
  }

  static requestHttp(method, url, params, content_type) {
    return new Promise((resolve, reject) => {
      const token = getItem('token')

      var options = {
        method,
        url,
        headers: {
          Accept: 'application/json',
          'Content-Type': `${content_type};`,
        },
      }
      if (params) {
        options.data = params
      }
      if (token) {
        options.headers.Authorization = 'Token ' + token
      }

      axios(options)
        .then((response) => {
          resolve({ statusCode: response.status, body: response.data })
        })
        .catch((error) => {
          if (error.response !== undefined) {
            resolve({
              statusCode: error.response.status,
              body: error.response.data,
            })
          } else {
            reject(new Error('Check Your Connection'))
          }
        })
    })
  }
}

export default NetworkHelper
