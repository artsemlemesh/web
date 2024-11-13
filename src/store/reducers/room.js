import * as actionType from './../actions/constants'
import * as _ from 'lodash'

const initialState = {
  loadingData: false,
  success: false,
  error: null,
  broadcastLoading: false,
  roomListLoading: false,
  rooms: [],
  publisher: {},
  subscriber: {},
  newRoomLoading: false,
  newRoomSuccess: false,
  newRoomError: null,
  publisherTokenSuccess: false,
  publisherTokenError: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ROOM_LIST_LOADING: {
      return { ...state, roomListLoading: action.payload.loading }
    }
    case actionType.GET_ROOM_LIST_SUCCESS: {
      return {
        ...state,
        rooms: action.payload.data,
        error: null,
        success: true,
      }
    }
    case actionType.GET_ROOM_LIST_ERROR: {
      return { ...state, success: false, error: action.payload.error }
    }

    case actionType.PUBLISHER_TOKEN_LOADING: {
      return { ...state, loadingData: action.payload.loading }
    }
    case actionType.PUBLISHER_TOKEN_SUCCESS: {
      let { rooms } = state
      const publisher = action.payload.data
      rooms = rooms.map((room) => {
        if (room.id === publisher.roomId) {
          const isPublisherAlreadyInRoom = room.publishers.find((p) => p.id === publisher.id)
          if (!isPublisherAlreadyInRoom) {
            room.publishers.push(publisher)
          }

          return room
        }

        return room
      })
      return {
        ...state,
        publisher: action.payload.data,
        rooms,
        publisherTokenError: null,
        publisherTokenSuccess: true,
      }
    }

    case actionType.PUBLISHER_TOKEN_ERROR: {
      return {
        ...state,
        publisherTokenSuccess: false,
        publisherTokenError: action.payload.error,
      }
    }

    default:
      return state
  }
}
