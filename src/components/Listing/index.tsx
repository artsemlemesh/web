import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import AnalyticsScreen from '../Common/AnalyticsScreen'

export default () => {
  return (
    <AnalyticsScreen page="listing">
      <div className="Listing">
        {/* <Preloader /> */}
        <Header />
        {/* <Content /> */}
        {/* <Subscribe /> */}
        <FooterDark />

        <a href="/" className="scrollup" style={{ display: 'none' }}>
          <i className="ion-ios-arrow-up" />
        </a>
      </div>
    </AnalyticsScreen>
  )
}
