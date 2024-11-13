import Header from '../Common/Header'
import Breadcrumb from '../Common/Breadcrumb'
import FooterDark from '../Common/FooterDark'
import Content from './Content'
import AnalyticsScreen from '../Common/AnalyticsScreen'

export default () => {
  return (
    <AnalyticsScreen page="contact">
      <div className="Contact">
        {/* <Preloader /> */}
        <Header />
        <Breadcrumb />
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
