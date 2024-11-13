import * as actionType from '../actions/constants'

const initialState = {
  loadingUserLogin: false,
  profile: null,
  success: false,
  error: null,
  temp: null,
  loadingUserForgot: false,
  loadingUserReset: false,
  tokenLoaded: false,
}

// eslint-disable-next-line @typescript-eslint/default-param-last
const user = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_LOGIN_LOADING: {
      return {
        ...state,
        loadingUserLogin: action.payload.loading,
      }
    }

    case actionType.PHONE_VERIFICATION_BLANK: {
      return {
        ...state,
        loadingUserLogin: false,
        success: false,
        error: null,
      }
    }

    case actionType.USER_LOGIN_SUCCESS:
      return {
        ...initialState,
        success: true,
        profile: action.payload.data,
        loadingUserLogin: false,
        error: null,
        tokenLoaded: true,
      }

    case actionType.GET_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload.data,
        error: null,
        success: true,
      }
    }

    case actionType.USER_LOGOUT:
      return {
        ...initialState,
        success: false,
        profile: null,
        loadingUserLogin: false,
        tokenLoaded: false,
      }

    case actionType.USER_LOGIN_ERROR:
      return {
        ...initialState,
        error: action.payload.error,
        success: false,
        loadingUserLogin: false,
      }

    case actionType.USER_UPDATE_SUCCESS: {
      const { profile } = state
      const updatedProfile = Object.assign({}, profile, action.payload.data)
      return { ...initialState, success: true, profile: updatedProfile }
    }

    case actionType.STRIPE_CONNECTION_SUCCESS: {
      return {
        ...state,
        success: true,
        temp: action.payload.data,
        loadingUserLogin: false,
      }
    }
    case actionType.STRIPE_CONNECTED: {
      const { profile } = state
      return { ...state, profile: { ...profile, is_stripe_connected: true } }
    }
    case actionType.REMOVE_OPENTOK_TOKEN: {
      const { profile } = state
      delete profile.opentokToken
      const updatedProfile = Object.assign({}, profile)
      return { ...initialState, success: true, profile: updatedProfile }
    }
    case actionType.USER_LOGIN_CLEAR: {
      return { ...state, success: false, error: null }
    }

    case actionType.FORGOT_PASSWORD_FAILURE: {
      return {
        ...initialState,
        error: action.payload.error,
        success: false,
        loadingUserForgot: false,
      }
    }

    case actionType.FORGOT_PASSWORD_LOADING: {
      return {
        ...state,
        loadingUserForgot: action.payload.loading,
      }
    }

    case actionType.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...initialState,
        success: true,
        profile: action.payload.data,
        loadingUserForgot: false,
        error: null,
      }
    }

    case actionType.RESET_PASSWORD_FAILURE: {
      return {
        ...initialState,
        success: false,
        error: action.payload.error,
        loadingUserReset: false,
      }
    }

    case actionType.RESET_PASSWORD_LOADING: {
      return {
        ...state,
        loadingUserReset: action.payload.loading,
      }
    }

    case actionType.RESET_PASSWORD_SUCCESS: {
      return {
        ...initialState,
        success: true,
        profile: action.payload.data,
        loadingUserReset: false,
        error: null,
      }
    }

    case actionType.DELETE_PROFILE_LOADING: {
      return {
        ...state,
        loadingUserForgot: action.payload.loading,
      }
    }
    case actionType.DELETE_PROFILE_SUCCESS: {
      return initialState
    }
    case actionType.DELETE_PROFILE_ERROR: {
      return {
        ...initialState,
        success: false,
        error: action.payload.error,
      }
    }

    default:
      return state
  }
}

export default user
