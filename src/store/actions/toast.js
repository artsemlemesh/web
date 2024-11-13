import * as actionType from './constants'

export const showToast = (message, type) => ({
  type: actionType.SHOW_TOAST,
  payload: { message, type },
})

export const clearToast = () => ({
  type: actionType.CLEAR_TOAST,
})
