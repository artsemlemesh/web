import * as actionType from './constants'
import { handleServerError, handleServerSuccess } from './common'
import * as Services from '../api/index'

export const getSellingList = () => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_SELLING_LIST_LOADING,
      payload: { loading: true },
    })
    Services.getBundleList()
      .then((response) => {
        handleServerSuccess(
          actionType.GET_SELLING_LIST_SUCCESS,
          actionType.GET_SELLING_LIST_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerError(
          actionType.GET_SELLING_LIST_ERROR,
          actionType.GET_SELLING_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const createNewBundle = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_SELLING_LIST_LOADING,
      payload: { loading: true },
    })
    const { title, tags, description, seller_price } = data
    Services.createNewBundle(title, tags, description, seller_price)
      .then((response) => {
        handleServerSuccess(
          actionType.ADD_NEW_BUNNDLE,
          actionType.GET_SELLING_LIST_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerError(
          actionType.GET_SELLING_LIST_ERROR,
          actionType.GET_SELLING_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const deleteBundle = (pk) => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_SELLING_LIST_LOADING,
      payload: { loading: true },
    })
    Services.deleteBundle(pk)
      .then((response) => {
        handleServerSuccess(
          actionType.DELETE_BUNDLE_ITEM,
          actionType.GET_SELLING_LIST_LOADING,
          pk,
          dispatch,
        )
        dispatch(getSellingList())
      })
      .catch((err) => {
        handleServerError(
          actionType.GET_SELLING_LIST_ERROR,
          actionType.GET_SELLING_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const getSellingDetail = (id) => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_SELLING_ITEM_DETAIL_LOADING,
      payload: { loading: true },
    })
    Services.getBundleDetail(id)
      .then((response) => {
        handleServerSuccess(
          actionType.GET_SELLING_ITEM_DETAIL_SUCCESS,
          actionType.GET_SELLING_LIST_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerError(
          actionType.GET_SELLING_ITEM_DETAIL_ERROR,
          actionType.GET_SELLING_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const updateBundle = (id, item) => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_SELLING_LIST_LOADING,
      payload: { loading: true },
    })
    const { pk, title, tags, description, seller_price } = item
    Services.updateBundle(id, item)
      .then((response) => {
        handleServerSuccess(
          actionType.UPDATE_BUNDLE_ITEM,
          actionType.GET_SELLING_LIST_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerError(
          actionType.GET_SELLING_LIST_ERROR,
          actionType.GET_SELLING_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const publishBundle = (id) => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_SELLING_LIST_LOADING,
      payload: { loading: true },
    })
    Services.publishBundle(id)
      .then((response) => {
        handleServerSuccess(
          actionType.PUBLISH_BUNDLE,
          actionType.GET_SELLING_LIST_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerError(
          actionType.PUBLISH_BUNDLE_ERROR,
          actionType.GET_SELLING_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const addItem = (id, item) => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_SELLING_LIST_LOADING,
      payload: { loading: true },
    })
    Services.addItem(id, item)
      .then((response) => {
        handleServerSuccess(
          actionType.ADD_NEW_ITEM,
          actionType.GET_SELLING_LIST_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerError(
          actionType.ADD_NEW_ITEM_ERROR,
          actionType.GET_SELLING_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const updateItem = (listingId, id, item) => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_SELLING_LIST_LOADING,
      payload: { loading: true },
    })
    Services.updateItem(listingId, id, item)
      .then((response) => {
        handleServerSuccess(
          actionType.UPDATE_LISTING_ITEM,
          actionType.GET_SELLING_LIST_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerError(
          actionType.GET_SELLING_LIST_ERROR,
          actionType.GET_SELLING_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}

export const deleteItem = (listingId, id) => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_SELLING_LIST_LOADING,
      payload: { loading: true },
    })
    const data = {
      listingId,
      id,
    }
    Services.deleteItem(listingId, id)
      .then((response) => {
        handleServerSuccess(
          actionType.DELETE_LISTING_ITEM,
          actionType.GET_SELLING_LIST_LOADING,
          data,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerError(
          actionType.GET_SELLING_LIST_ERROR,
          actionType.GET_SELLING_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}
