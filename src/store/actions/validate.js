import * as actionType from './constants'
import { handleServerError, handleServerSuccess } from './common'
import * as Services from '../api/index'

export const validateOTP = (req) => {
  return (dispatch) => {
    dispatch({
      type: actionType.USER_LOGIN_LOADING,
      payload: { loading: true },
    })
    Services.validateOTP(req.item)
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
