import { useEffect } from 'react'
import { type AnyAction } from 'redux'
import { useDispatch } from 'react-redux'
import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import AnalyticsScreen from '../Common/AnalyticsScreen'
import Content from './Content'
import { getShopList } from '../../store/actions/shop'

export default () => {
  const dispatch = useDispatch()

  const getShopData = () => {
    dispatch(getShopList() as unknown as AnyAction)
  }

  useEffect(() => {
    getShopData()
  }, [])

  return (
    <AnalyticsScreen page="signup">
      <div className="Shop">
        {/* <Preloader /> */}
        <Header />
        <Content />
        {/* <Subscribe /> */}
        <FooterDark />
      </div>
    </AnalyticsScreen>
  )
}
