import * as actionType from './../actions/constants'

const initialState = {
  loadingData: false,
  success: false,
  error: null,
  shopListLoading: false,
  shopsData: {},
  shops: [],
  options: {},
  purchasedBundles: [],
  buyerOrderList: [],
  buyerOrderListLoading: false,
}

// eslint-disable-next-line @typescript-eslint/default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_FILTRE_DATA: {
      let newArray = []
      if (action.payload.data.results.length > 0) {
        if (action.payload.data.previous === null) {
          newArray = action.payload.data.results
        } else {
          newArray = [...state.shops, ...action.payload.data.results]
        }
      } else {
        newArray = action.payload.data.results
      }
      return {
        ...state,
        shopsData: action.payload.data,
        shops: newArray,
        error: null,
        success: true,
      }
    }

    case actionType.GET_FILTRE_DATA_ERROR: {
      return { ...state, success: false, error: action.payload.error }
    }
    case actionType.ITEM_OPTIONS_SUCCESS: {
      return {
        ...state,
        options: action.payload.data,
        error: null,
        success: true,
      }
    }
    case actionType.ITEM_OPTIONS_ERROR: {
      return { ...state, success: false, error: action.payload.error }
    }
    case actionType.GET_SHOP_LIST_LOADING: {
      return { ...state, shopListLoading: action.payload.loading }
    }
    case actionType.GET_SHOP_LIST_SUCCESS: {
      let newArray = [...state.shops]
      if (newArray.length > 0 && action.payload.data.results.length > 0) {
        newArray = [...newArray, ...action.payload.data.results]
      } else {
        newArray = action.payload.data.results
      }

      return {
        ...state,
        shopsData: action.payload.data,
        shops: newArray,
        error: null,
        success: true,
      }
    }
    case actionType.GET_SHOP_LIST_ERROR: {
      return { ...state, success: false, error: action.payload.error }
    }
    case actionType.GET_PURCHASED_LIST_SUCCESS: {
      return {
        ...state,
        purchasedBundles: action.payload.data.results,
        error: null,
        success: true,
      }
    }
    case actionType.GET_PURCHASED_LIST_ERROR: {
      return { ...state, success: false, error: action.payload.error }
    }

    // order
    case actionType.GET_BUYER_ORDER_LIST_LOADING: {
      return { ...state, buyerOrderListLoading: action.payload.loading }
    }

    case actionType.GET_BUYER_ORDER_LIST_SUCCESS: {
      let newArray = [...state.buyerOrderList]
      let newOrders = action.payload.data.results.filter(
        (order) => !newArray.some((existingOrder) => existingOrder.id === order.id),
      )
      newArray.push(...newOrders)
      return {
        ...state,
        buyerOrderList: newArray,
        error: null,
        success: true,
      }
    }
    case actionType.GET_BUYER_ORDER_LIST_ERROR: {
      return { ...state, success: false, error: action.payload.error }
    }

    default:
      return state
  }
}
