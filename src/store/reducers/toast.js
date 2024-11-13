import { SHOW_TOAST, CLEAR_TOAST } from '../actions/constants'

const initialState = {
  message: '',
  type: '',
}

// eslint-disable-next-line @typescript-eslint/default-param-last
const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return { ...state, ...action.payload }
    case CLEAR_TOAST:
      return initialState
    default:
      return state
  }
}

export default toastReducer
