/*
This function handle success from server side and dispatch desired action
defined in your reducer for success and dispatch loading false action as well.
*/

export const handleServerSuccess = (actionName, loadingActionName, data, dispatch) => {
  dispatch({ type: actionName, payload: { data: data } })
  dispatch({ type: loadingActionName, payload: { loading: false } })
}

export const handleServerError = (actionName, loadingActionName, error, dispatch) => {
  dispatch({
    type: actionName,
    payload: {
      error: error && error.detail ? error.detail : 'Internal server error!',
    },
  })

  dispatch({ type: loadingActionName, payload: { loading: false } })
}

/*
This function handle success from server side and dispatch desired action
defined in your reducer for success and dispatch loading false action as well.
*/

export const handleServerSuccessNew = (actionName, loadingActionName, data, dispatch) => {
  // dispatch your desired action
  dispatch({ type: actionName, payload: { data: data } })

  // dispatch action to set loading=false in /reducers/timesheet.js
  dispatch({ type: loadingActionName, payload: { loading: false } })
}

/*
This function handle any type of error from server side and dispatch desired action
defined in /reducers/timesheet.js for error and dispatch loading false as well.
*/
export const handleServerErrorNew = (actionName, loadingActionName, error, dispatch) => {
  if (typeof error.response === 'undefined') {
    dispatch({ type: actionName, payload: { error: 'Network error!' } })
  } else {
    if (error.response.status === 500) {
      dispatch({
        type: actionName,
        payload: { error: 'Internal server error!' },
      })
    } else {
      dispatch({ type: actionName, payload: { error: error.response.data } })
    }
  }

  dispatch({ type: loadingActionName, payload: { loading: false } })
}
