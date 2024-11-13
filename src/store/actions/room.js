import axios from 'axios'
import * as actionType from './constants'
import { handleServerError, handleServerSuccess } from './common'
import Config from '../../config'

export const getPublisherToken = (roomId) => {
  return (dispatch) => {
    dispatch({ type: actionType.LOADING_DATA, payload: { loading: true } })

    axios
      .get(`${Config.api_base_url}/room/publisher-token/${roomId}`)
      .then((response) => {
        response.data.roomId = roomId

        handleServerSuccess(
          actionType.PUBLISHER_TOKEN_SUCCESS,
          actionType.LOADING_DATA,
          response.data,
          dispatch,
        )
        dispatch({
          type: actionType.USER_UPDATE_SUCCESS,
          payload: { data: { opentokToken: response.data.opentok_token } },
        })
      })
      .catch((err) => {
        handleServerError(actionType.PUBLISHER_TOKEN_ERROR, actionType.LOADING_DATA, err, dispatch)
      })
  }
}

export const getRoomList = () => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_ROOM_LIST_LOADING,
      payload: { loading: true },
    })

    axios
      .get(`${Config.api_base_url}/room/list`)
      .then((response) => {
        handleServerSuccess(
          actionType.GET_ROOM_LIST_SUCCESS,
          actionType.GET_ROOM_LIST_LOADING,
          response.data,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerError(
          actionType.GET_ROOM_LIST_ERROR,
          actionType.GET_ROOM_LIST_LOADING,
          err,
          dispatch,
        )
      })
  }
}
