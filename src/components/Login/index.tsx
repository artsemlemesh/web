import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import AnalyticsScreen from '../Common/AnalyticsScreen'
import Content from './Content'
import { RootState } from '../../store/reducers'
import history from '../../history'

export default () => {
  const user = useSelector((state: RootState) => state.user)

  const localCartData = 'localCartData'

  useEffect(() => {
    if (!localCartData) {
      if (user.profile) history.back()
    }
  }, [user])

  return (
    <AnalyticsScreen page="login">
      <div className="Login">
        {/* <Preloader /> */}
        <Header />
        <Content />
        {/* <Subscribe /> */}
        <FooterDark />
      </div>
    </AnalyticsScreen>
  )
}
