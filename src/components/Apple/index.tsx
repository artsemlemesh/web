import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import Content from './Content'
import AnalyticsScreen from '../Common/AnalyticsScreen'

export default () => {
  return (
    <AnalyticsScreen page="apple">
      <div className="About">
        <Header />
        <Content />
        <FooterDark />
        <a href="/" className="scrollup" style={{ display: 'none' }}>
          <i className="ion-ios-arrow-up" />
        </a>
      </div>
    </AnalyticsScreen>
  )
}
