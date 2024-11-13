import * as actionType from '../actions/constants'
import { getItem, removeItem, setItem } from '../../helpers/storage'
import { LOCAL_CART_KEY } from '../../utils/constants'

let localCartData = getItem(LOCAL_CART_KEY) || undefined

const initialState = {
  localCart: localCartData,
  success: false,
  error: null,
  carts: [],
  favorites: [],
  favors: [],
  loading: false,
  checkouts: {},
}

// eslint-disable-next-line @typescript-eslint/default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.CHECKOUT_SUCCESS: {
      return {
        ...state,
        checkouts: action.payload,
        error: null,
        success: true,
      }
    }
    case actionType.CHECKOUT_ERROR: {
      return {
        ...state,
        success: false,
        error: action.payload.error,
      }
    }

    case actionType.CLEAR_CART: {
      return {
        ...state,
        carts: [],
        error: null,
        success: false,
        loading: false,
      }
    }
    case actionType.GET_CART_LOADING: {
      return {
        ...state,
        loading: action.payload.loading,
      }
    }
    case actionType.GET_CART_SUCCESS: {
      return {
        ...state,
        success: true,
        carts: action.payload.data.items,
      }
    }
    case actionType.GET_CART_ERROR: {
      return {
        ...state,
        success: false,
        carts: [],
        error: action.payload.error,
      }
    }
    case actionType.ADD_NEW_CART_ITEM_SUCCESS: {
      return {
        ...state,
        success: true,
        error: null,
      }
    }
    case actionType.ADD_NEW_CART_ITEM_ERROR: {
      return {
        ...state,
        success: false,
        error: action.payload.error,
      }
    }
    case actionType.DELETE_CART_ITEM_SUCCESS: {
      return {
        ...state,
        success: true,
        error: null,
      }
    }
    case actionType.DELETE_CART_ITEM_ERROR: {
      return {
        ...state,
        success: false,
        error: action.payload.error,
      }
    }
    case actionType.USER_LOGOUT:
      return initialState

    case actionType.UPDATE_LOCAL_CART: {
      setItem(LOCAL_CART_KEY, JSON.stringify(action.payload))
      return {
        ...state,
        localCart: JSON.stringify(action.payload),
      }
    }

    case actionType.REMOVE_LOCAL_CART: {
      return {
        ...state,
        localCart: removeItem(LOCAL_CART_KEY),
      }
    }
    default:
      return state
  }
}
