import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const list = ['staging', 'production']

const logMiddleware = createLogger({
  predicate: () => {
    return !list.includes(process.env.REACT_APP_ENV_NAME || '')
  },
})

export default createStore(rootReducer, applyMiddleware(logMiddleware, ReduxThunk))
