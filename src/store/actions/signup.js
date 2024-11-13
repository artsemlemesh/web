import * as actionType from './constants'
import { handleServerError, handleServerSuccess } from './common'
import * as Services from '../api/index'
import consoleHelper from '../../helpers/ConsoleHelper'

export const signupUser = (req) => {
  return (dispatch) => {
    dispatch({
      type: actionType.USER_LOGIN_LOADING,
      payload: { loading: true },
    })
    Services.signUp(req.item)
      .then((response) => {
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

export const connectStripe = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionType.USER_LOGIN_LOADING,
      payload: { loading: true },
    })
    Services.connectStripe(data)
      .then((response) => {
        consoleHelper('[stripe]', response)
        handleServerSuccess(
          actionType.STRIPE_CONNECTION_SUCCESS,
          actionType.LOADING_DATA,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        consoleHelper('[error--]', err)
      })
  }
}

export const disconnectStripe = () => {
  return () => {
    Services.disconnectStripe()
      .then(() => {
        // consoleHelper('[stripe]', response)
      })
      .catch(() => {
        // consoleHelper('[stripe]', err)
      })
  }
}
