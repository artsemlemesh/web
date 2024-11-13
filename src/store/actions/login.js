/* eslint-disable @typescript-eslint/no-use-before-define */
import * as actionType from './constants'
import { handleServerError, handleServerSuccess } from './common'
import * as Services from '../api/index'
import { getItem, removeItem, setItem } from '../../helpers/storage'
import { addItemToCart } from '../actions/product'
import history from '../../history'
import { setAmplitudeUserId } from '../../utils/amplitude'
import Analytics from '../../utils/Analytics'
import logout from '../../components/Common/LogOut'
import { showToast } from './toast'

export const loginUser = (req) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionType.USER_LOGIN_LOADING,
      payload: { loading: true },
    })
    const { email, password } = req.data
    Services.signIn(email, password)
      .then((response) => {
        if (req.onSuccess) {
          req.onSuccess(response)
        }
        setItem('token', response.token)
        setAmplitudeUserId(email)
        // const localCartData = JSON.parse(getItem('localCartData'));
        let localCartData = getState().cart.localCart
        if (localCartData) {
          localCartData = JSON.parse(localCartData)
        }
        const token = getItem('token')
        if (token && localCartData && localCartData.length > 0) {
          localCartData.map((item, index) => {
            dispatch(
              addItemToCart({
                data: item,
                onSuccess: (res) => {
                  if (res && res.listing && localCartData.length - 1 === index) {
                    removeItem('localCartData')
                    history.back()
                  }
                },
                onFail: () => {},
              }),
            )
          })
        } else {
          let profileObj = {
            onSuccess: (resData) => {
              if (resData) {
                setItem('authdata', JSON.stringify(resData))
              }
            },
            onFail: () => {},
          }
          dispatch(getUserProfile(profileObj))
        }
        handleServerSuccess(
          actionType.USER_LOGIN_SUCCESS,
          actionType.LOADING_DATA,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        if (req.onFail) {
          req.onFail(err?.non_field_errors?.length > 0 ? err?.non_field_errors[0] : err.message)
        }
        handleServerError(actionType.USER_LOGIN_ERROR, actionType.LOADING_DATA, err, dispatch)
      })
  }
}

export const clearLogin = () => (dispatch) =>
  dispatch({ type: actionType.USER_LOGIN_CLEAR, payload: null })

export const logoutUser = () => {
  // Analytics.reset()
  return (dispatch) => {
    dispatch({ type: actionType.USER_LOGOUT, payload: null })
  }
}

export const updateProfile = (item) => {
  return (dispatch) => {
    dispatch({
      type: actionType.UPDATE_PROFILE_LOADING,
      payload: { loading: true },
    })
    Services.updateProfile(item)
      .then((response) => {
        dispatch({
          type: actionType.UPDATE_PROFILE_SUCCESS,
          payload: { data: response },
        })
      })
      .catch((err) => {
        dispatch({
          type: actionType.UPDATE_PROFILE_ERROR,
          payload: { data: err },
        })
      })
  }
}

export const socialLogin = (req) => {
  return (dispatch) => {
    dispatch({
      type: actionType.USER_LOGIN_LOADING,
      payload: { loading: true },
    })
    const { provider, token } = req.items
    Services.socialLogin(provider, token)
      .then((response) => {
        setItem('authdata', JSON.stringify(response))
        setItem('token', response.token)
        handleServerSuccess(
          actionType.USER_LOGIN_SUCCESS,
          actionType.LOADING_DATA,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        if (req.onFail) {
          req.onFail(err)
        }
        handleServerError(actionType.USER_LOGIN_ERROR, actionType.LOADING_DATA, err, dispatch)
      })
  }
}

export const socialGoogleTap = (req) => {
  return (dispatch) => {
    dispatch({
      type: actionType.USER_LOGIN_LOADING,
      payload: { loading: true },
    })
    const { credential } = req.items
    Services.socialGoogleTap(credential)
      .then((response) => {
        setItem('token', response.token)
        let profileObj = {
          onSuccess: (resData) => {
            if (resData) {
              setItem('authdata', JSON.stringify(resData))
              if (req.onSuccess) {
                req.onSuccess(response)
              }
            }
          },
          onFail: () => {},
        }
        dispatch(getUserProfile(profileObj))

        handleServerSuccess(
          actionType.USER_LOGIN_SUCCESS,
          actionType.LOADING_DATA,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        if (req.onFail) {
          req.onFail(err)
        }
        handleServerError(actionType.USER_LOGIN_ERROR, actionType.LOADING_DATA, err, dispatch)
      })
  }
}

export const getUserProfile = (req) => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_PROFILE_LOADING,
      payload: { loading: true },
    })
    Services.getUserProfile()
      .then((response) => {
        if (req.onSuccess) {
          req.onSuccess(response)
        }
        try {
          Analytics.identify(response.id, {
            email: response.email,
            first_name: response.first_name,
            last_name: response.last_name,
            phone: response.phone,
            adress_line1: response.adress_line1,
            adress_line2: response.adress_line2,
            city: response.city,
            state: response.state,
            postal_code: response.postal_code,
          })
        } catch (err) {
          console.log('error in identifying user', err)
        }
        handleServerSuccess(
          actionType.GET_PROFILE_SUCCESS,
          actionType.GET_PROFILE_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        if (req.onFail) {
          req.onFail(err)
        }
        handleServerError(
          actionType.GET_PROFILE_ERROR,
          actionType.GET_PROFILE_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const verifyUser = (req) => {
  return (dispatch) => {
    dispatch({
      type: actionType.USER_LOGIN_LOADING,
      payload: { loading: true },
    })
    const { uid, token } = req
    Services.verifyUser(uid, token)
      .then((response) => {
        setItem('token', response.token)
        setItem('authdata', JSON.stringify(response))
        if (req.onSuccess) {
          req.onSuccess(response)
        }
        handleServerSuccess(
          actionType.USER_LOGIN_SUCCESS,
          actionType.LOADING_DATA,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        if (req.onFail) {
          req.onFail(err)
        }
        handleServerError(actionType.USER_LOGIN_ERROR, actionType.LOADING_DATA, err, dispatch)
      })
  }
}

export const resendEmailVerifcation = (req) => {
  return (dispatch) => {
    dispatch({
      type: actionType.RESEND_EMAIL_LOADING,
      payload: { loading: true },
    })
    const { email } = req
    Services.resendEmail(email)
      .then((response) => {
        if (req.onSuccess) {
          req.onSuccess(response)
        }
        handleServerSuccess(
          actionType.RESEND_EMAIL_SUCCESS,
          actionType.LOADING_DATA,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        if (req.onFail) {
          req.onFail(err)
        }
        handleServerError(actionType.RESEND_EMAIL_FAILURE, actionType.LOADING_DATA, err, dispatch)
      })
  }
}

export const socialApple = (payload = {}) => {
  return (dispatch) => {
    dispatch({
      type: actionType.USER_LOGIN_LOADING,
      payload: { loading: true },
    })
    let params = {
      access_token: payload.token,
      first_name: payload.fname,
      last_name: payload.lname,
    }
    Services.socialApple(params)
      .then((response) => {
        setItem('token', response.token)
        setItem('authdata', response)
        if (payload.onSuccess) {
          payload.onSuccess(response)
        }
        handleServerSuccess(
          actionType.USER_LOGIN_SUCCESS,
          actionType.LOADING_DATA,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        if (payload.onFail) {
          payload.onFail(err)
        }
        handleServerError(actionType.USER_LOGIN_ERROR, actionType.LOADING_DATA, err, dispatch)
      })
  }
}

export const deleteProfile = () => {
  return (dispatch) => {
    dispatch({
      type: actionType.DELETE_PROFILE_LOADING,
      payload: { loading: true },
    })
    Services.deleteProfile()
      .then((response) => {
        handleServerSuccess(
          actionType.DELETE_PROFILE_SUCCESS,
          actionType.DELETE_PROFILE_LOADING,
          response,
          dispatch,
        )
        dispatch(showToast('Account deleted successfully', 'success'))
        logout(dispatch)
      })
      .catch((err) => {
        handleServerError(
          actionType.DELETE_PROFILE_ERROR,
          actionType.DELETE_PROFILE_LOADING,
          err,
          dispatch,
        )
        dispatch(showToast('Failed to delete profile', 'error'))
      })
  }
}
