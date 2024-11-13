import * as actionType from './constants'
import { handleServerError, handleServerSuccess } from './common'
import * as Services from '../api/index'
import { setItem } from '../../helpers/storage'

export const getShopList = (payload = {}) => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_SHOP_LIST_LOADING,
      payload: { loading: true },
    })
    Services.getListings(payload.url)
      .then((response) => {
        if (payload.onSuccess) {
          setItem('nextURL', response.next)
          payload.onSuccess()
        }
        handleServerSuccess(
          actionType.GET_SHOP_LIST_SUCCESS,
          actionType.GET_SHOP_LIST_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        if (payload.onFail) {
          payload.onFail()
        }
        handleServerError(
          actionType.GET_SHOP_LIST_ERROR,
          actionType.GET_ROOM_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const getListingDetail = (id) => {
  return new Promise((resolve, reject) => {
    Services.getListingDetail(id)
      .then((response) => {
        resolve({ statusCode: response.status, body: response })
      })
      .catch((error) => {
        if (error !== undefined) {
          resolve({ statusCode: error.response.status, body: error })
        } else {
          reject(new Error('Check Your Connection'))
        }
      })
  })
}

export const loadItemOptions = () => {
  return (dispatch) => {
    Services.loadItemOptions()
      .then((response) => {
        handleServerSuccess(
          actionType.ITEM_OPTIONS_SUCCESS,
          actionType.ITEM_OPTIONS_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerError(
          actionType.ITEM_OPTIONS_ERROR,
          actionType.ITEM_OPTIONS_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const getPurchasedBundles = (userID) => (dispatch) => {
  dispatch({
    type: actionType.GET_SHOP_LIST_LOADING,
    payload: { loading: true },
  })
  Services.getListings(userID)
    .then((response) => {
      handleServerSuccess(
        actionType.GET_PURCHASED_LIST_SUCCESS,
        actionType.GET_SHOP_LIST_LOADING,
        response,
        dispatch,
      )
    })
    .catch((err) => {
      handleServerError(
        actionType.GET_PURCHASED_LIST_ERROR,
        actionType.GET_ROOM_LIST_LOADING,
        err,
        dispatch,
      )
    })
}

export const getUrl = (payload) => {
  return (dispatch) => {
    Services.getUrl(payload.url)
      .then((response) => {
        if (payload.onSuccess) {
          setItem('nextURL', response.next)
          payload.onSuccess(response)
        }
        handleServerSuccess(
          actionType.GET_FILTRE_DATA,
          actionType.GET_FILTRE_DATA_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        if (payload.onFail) {
          payload.onFail(err)
        }
        handleServerError(
          actionType.GET_FILTRE_DATA_ERROR,
          actionType.GET_FILTRE_DATA_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const getBuyerOderList = () => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_BUYER_ORDER_LIST_LOADING,
      payload: { loading: true },
    })
    Services.getBuyerOderList()
      .then((response) => {
        handleServerSuccess(
          actionType.GET_BUYER_ORDER_LIST_SUCCESS,
          actionType.GET_BUYER_ORDER_LIST_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerError(
          actionType.GET_BUYER_ORDER_LIST_ERROR,
          actionType.GET_BUYER_ORDER_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}
