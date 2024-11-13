import * as actionType from '../actions/constants'

const initialState = {
  success: false,
  error: null,
  products: [],
  sellingListLoading: false,
  selectedSelling: null,
  bundlePublished: false,
  bundlePublishError: null,
  initialBundle: null,
}

// eslint-disable-next-line @typescript-eslint/default-param-last
export default (state = initialState, action) => {
  let filteredData

  switch (action.type) {
    case actionType.GET_SELLING_LIST_LOADING: {
      return {
        ...state,
        sellingListLoading: action.payload.loading,
        bundlePublished: false,
        bundlePublishError: null,
        success: false,
        error: null,
      }
    }
    case actionType.GET_SELLING_LIST_SUCCESS: {
      return {
        ...state,
        products: action.payload.data.results,
        error: null,
        success: true,
        initialBundle: null,
      }
    }
    case actionType.GET_SELLING_ITEM_DETAIL_LOADING: {
      return { ...state, sellingListLoading: action.payload.loading }
    }
    case actionType.ADD_NEW_BUNNDLE: {
      let { products } = state
      let { data } = action.payload.data
      let { id } = data
      return {
        ...state,
        products: [...products, { ...data, items: [], pk: id }],
        initialBundle: { ...data, items: [], pk: id },
        error: null,
        success: true,
      }
    }
    case actionType.UPDATE_BUNDLE_ITEM: {
      let { products } = state
      let updateBundle = action.payload.data
      let list = products.map((item) => {
        if (item.pk === updateBundle.pk) {
          let temp = {
            ...item,
            ...updateBundle,
          }
          return temp
        } else {
          return item
        }
      })
      return {
        ...state,
        products: list,
        error: null,
        success: true,
      }
    }
    case actionType.PUBLISH_BUNDLE_ERROR: {
      return {
        ...state,
        bundlePublished: false,
        bundlePublishError: action.payload.error,
      }
    }
    case actionType.DELETE_BUNDLE_ITEM: {
      let { products } = state
      const id = action.payload.data
      filteredData = products.filter((item) => item.pk !== id)
      return {
        ...state,
        products: filteredData,
      }
    }
    case actionType.ADD_NEW_ITEM: {
      let { products } = state
      let { pk, listingId, ...itemArgs } = action.payload.data.data
      let list = products.map((item) => {
        if (item.pk == listingId) {
          let items = item.items
          items = [
            ...items,
            {
              ...itemArgs,
              id: pk,
            },
          ]
          let temp = {
            ...item,
            items,
          }
          return temp
        } else {
          return item
        }
      })
      return {
        ...state,
        products: list,
        error: null,
        success: true,
      }
    }
    case actionType.UPDATE_LISTING_ITEM: {
      let { products } = state
      let updateBundle = action.payload.data
      let list = products.map((item) => {
        if (item.pk == updateBundle.listing) {
          let items = item.items.map((sItem) => {
            if (sItem.id == updateBundle.id) {
              return updateBundle
            } else {
              return sItem
            }
          })
          let bTemp = {
            ...item,
            items,
          }
          return bTemp
        } else {
          return item
        }
      })
      return {
        ...state,
        products: list,
        error: null,
        success: true,
      }
    }
    case actionType.DELETE_LISTING_ITEM: {
      let { products } = state
      let { listingId, id } = action.payload.data
      let list = products.map((item) => {
        if (item.pk == listingId) {
          let items = item.items.filter((sItem) => sItem.id !== id)
          let bTemp = {
            ...item,
            items,
          }
          return bTemp
        } else {
          return item
        }
      })
      return {
        ...state,
        products: list,
        error: null,
        success: true,
      }
    }
    case actionType.USER_LOGOUT:
      return initialState
    default:
      return state
  }
}
