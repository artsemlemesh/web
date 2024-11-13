import * as actionType from './constants'
import { handleServerError, handleServerSuccess } from './common'
import * as Services from '../api/index'

export const resetPassword = (req, uid, token) => {
  return (dispatch) => {
    dispatch({
      type: actionType.RESET_PASSWORD_LOADING,
      payload: { loading: true },
    })
    Services.resetPassword(req.data.new_password, req.data.confirm_password, uid, token)
      .then((response) => {
        if (req.onSuccess) {
          req.onSuccess(response.message)
        }
        handleServerSuccess(
          actionType.RESET_PASSWORD_SUCCESS,
          actionType.LOADING_DATA,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        if (req.onFail) {
          req.onFail(err)
        }
        handleServerError(actionType.RESET_PASSWORD_LOADING, actionType.LOADING_DATA, err, dispatch)
      })
  }
}
