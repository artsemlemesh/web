import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import AnalyticsScreen from '../Common/AnalyticsScreen'
import Content from './Content'
import StickyBar from './StickyBar'

export default () => {
  return (
    <AnalyticsScreen page="shop">
      <div className="Shop">
        {/* <Preloader /> */}
        <Header />

        <Content />
        {/* <Subscribe /> */}
        <StickyBar/>
        <FooterDark />

        <a href="/" className="scrollup" style={{ display: 'none' }}>
          <i className="ion-ios-arrow-up" />
        </a>
      </div>
    </AnalyticsScreen>
  )
}
