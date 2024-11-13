import { removeItem } from '../../helpers/storage'
import { logoutUser } from '../../store/actions/login'

const logout = (dispatch) => {
  removeItem('token')
  removeItem('authdata')
  removeItem('localCartData')
  dispatch(logoutUser())
}
export default logout
