import { useEffect } from 'react'
import { type AnyAction } from 'redux'
import { useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import AnalyticsScreen from '../Common/AnalyticsScreen'
import Content from './Content'
import { getShopList } from '../../store/actions/shop'
import WebService from '../../helpers/WebService'

export default () => {
  const dispatch = useDispatch()
  const route = useRouteMatch<{ id: string; slug: string }>()

  const getShopData = () => {
    const url = WebService.makeUrl(`/products/?slug=${encodeURI(route.params.slug)}`)
    dispatch(getShopList({ url }) as unknown as AnyAction)
  }

  useEffect(() => {
    getShopData()
  }, [])

  return (
    <AnalyticsScreen page="shop details">
      <div className="Shop">
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
