import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import AnalyticsScreen from '../Common/AnalyticsScreen'
import Content from './Content'

export default () => {
  return (
    <AnalyticsScreen page="terms">
      <div className="Terms">
        {/* <Preloader /> */}
        <Header />
        {/* <Breadcrumb /> */}
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
