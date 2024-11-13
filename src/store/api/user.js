import WebService from '../../helpers/WebService'

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    WebService.signIn(email, password)
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else {
          reject(response.body)
        }
      })
      .catch(reject)
  })
}

export const validateOTP = ({ email, code }) => {
  return new Promise((resolve, reject) => {
    WebService.validateOTP(email, code)
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else {
          reject(response.body)
        }
      })
      .catch(reject)
  })
}

export const forgot = (email) => {
  return new Promise((resolve, reject) => {
    WebService.forgotPass(email)
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else {
          reject(response.body)
        }
      })
      .catch(reject)
  })
}

export const resetPassword = (new_password, confirm_password, uid, token) => {
  return new Promise((resolve, reject) => {
    WebService.resetPassword(new_password, confirm_password, uid, token)
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else {
          reject(response.body)
        }
      })
      .catch(reject)
  })
}

export const socialLogin = (provider, accessToken) => {
  return new Promise((resolve, reject) => {
    WebService.socialSignIn(provider, accessToken)
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else {
          reject(response.body.phone)
        }
      })
      .catch(reject)
  })
}

export const socialGoogleTap = (credential) => {
  return new Promise((resolve, reject) => {
    WebService.socialGoogleTap(credential)
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else {
          reject(response.body.phone)
        }
      })
      .catch(reject)
  })
}

export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    WebService.getUserProfile()
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

export const verifyUser = (uid, token) => {
  return new Promise((resolve, reject) => {
    WebService.verifyUser(uid, token)
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else {
          reject(response.body.phone)
        }
      })
      .catch(reject)
  })
}

export const socialApple = (params) => {
  return new Promise((resolve, reject) => {
    WebService.socialApple(params)
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else {
          reject(response.body.phone)
        }
      })
      .catch(reject)
  })
}

export const signUp = (data) => {
  return new Promise((resolve, reject) => {
    WebService.signUp(data)
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else if (response.statusCode === 201) {
          resolve(response.body)
        } else {
          reject(response.body)
        }
      })
      .catch(reject)
  })
}

export const connectStripe = (data) => {
  return new Promise((resolve, reject) => {
    WebService.connectStripe(data)
      .then((response) => {
        if (response.statusCode === 201) {
          resolve(response.body)
        } else {
          reject(response.body)
        }
      })
      .catch(reject)
  })
}

export const disconnectStripe = () => {
  return new Promise((resolve, reject) => {
    WebService.disconnectStripe()
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else {
          reject(response.body)
        }
      })
      .catch(reject)
  })
}

export const updateProfile = (item) => {
  return new Promise((resolve, reject) => {
    WebService.updateProfile(item)
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

export const resendEmail = (email) => {
  return new Promise((resolve, reject) => {
    WebService.resendEmail(email)
      .then((response) => {
        if (response.statusCode === 200) {
          resolve(response.body)
        } else {
          reject(response.body)
        }
      })
      .catch(reject)
  })
}

export const deleteProfile = () => {
  return new Promise((resolve, reject) => {
    WebService.deleteProfile()
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
