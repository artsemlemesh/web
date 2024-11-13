import * as actionType from './constants'
import { handleServerError, handleServerSuccess } from './common'
import * as Services from '../api/index'
import consoleHelper from '../../helpers/ConsoleHelper'

export const forgotUser = (req) => {
  return (dispatch) => {
    dispatch({
      type: actionType.FORGOT_PASSWORD_LOADING,
      payload: { loading: true },
    })
    const { email } = req.data
    Services.forgot(email)
      .then((response) => {
        if (req.onSuccess) {
          consoleHelper('response', response)
          req.onSuccess(response.message)
        }
        handleServerSuccess(
          actionType.FORGOT_PASSWORD_SUCCESS,
          actionType.LOADING_DATA,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        if (req.onFail) {
          consoleHelper(req, err.non_field_errors[0])
          req.onFail(err.non_field_errors[0])
        }
        handleServerError(
          actionType.FORGOT_PASSWORD_LOADING,
          actionType.LOADING_DATA,
          err,
          dispatch,
        )
      })
  }
}
