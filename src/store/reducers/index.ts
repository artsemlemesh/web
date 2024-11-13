import { type Reducer, combineReducers } from 'redux'
import commonReducer from './common'
import userReducer from './user'
import cartReducer from './cart'
import favoriteReducer from './favorite'
import bundleReducer from './bundle'
import shopReducer from './shop'
import toastReducer from './toast'

const appReducer = combineReducers({
  common: commonReducer,
  user: userReducer,
  // signup: signupReducer,
  // room: roomReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  bundle: bundleReducer,
  shop: shopReducer,
  toast: toastReducer,
})

export default appReducer
// export type RootState = ReturnType<typeof appReducer>;
export type RootState = ReturnType<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Reducer<{ common: any; user: any; cart: any; favorite: any; bundle: any; shop: any }>
>
