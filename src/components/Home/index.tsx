import { useEffect } from 'react'
import { type AnyAction } from 'redux'
import { useDispatch } from 'react-redux'
import Popup from '../Common/Popup'
import Banner from '../Common/Banner/'
import FooterDark from '../Common/FooterDark'
import Header from '../Common/Header'
import AnalyticsScreen from '../Common/AnalyticsScreen'
import Content from './Content'
import { getUserCart } from '../../store/actions/product'
import { getItem } from '../../helpers/storage'

export default () => {
  const dispatch = useDispatch()
  const token = getItem('token')

  useEffect(() => {
    if (token) {
      dispatch(getUserCart() as unknown as AnyAction)
    }
  }, [])

  return (
    <AnalyticsScreen page="home">
      <div className="Home">
        {/* <Preloader /> */}
        <Popup />
        <Header />
        <Banner />

        <Content />
        <FooterDark />
      </div>
    </AnalyticsScreen>
  )
}
