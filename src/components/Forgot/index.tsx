import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import Content from './Content'
import { RootState } from '../../store/reducers'
import history from '../../history'
import AnalyticsScreen from '../Common/AnalyticsScreen'

export default () => {
  const user = useSelector((state: RootState) => state.user)

  const localCartData = 'localCartData'

  useEffect(() => {
    if (!localCartData) {
      if (user.profile) history.back()
    }
  }, [user])

  return (
    <AnalyticsScreen page="forgot">
      <div className="Login">
        <Header />
        <Content />
        <FooterDark />
      </div>
    </AnalyticsScreen>
  )
}
