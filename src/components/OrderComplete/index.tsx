import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import AnalyticsScreen from '../Common/AnalyticsScreen'
import Content from './Content'
import { getItem } from '../../helpers/storage'
import { clearLocalCart } from '../../store/actions/product'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = getItem('token')
    if (!token) {
      dispatch(clearLocalCart())
    }
  }, [])

  return (
    <AnalyticsScreen page="order complete">
      <div className="OrderComplete">
        {/* <Preloader /> */}
        <Header />
        <Content />
        {/* <Subscribe /> */}
        <FooterDark />

        <a href="/" className="scrollup" style={{ display: 'none' }}>
          <i className="ion-ios-arrow-up" />
        </a>
      </div>
    </AnalyticsScreen>
  )
}
