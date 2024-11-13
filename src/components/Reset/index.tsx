import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import AnalyticsScreen from '../Common/AnalyticsScreen'
import Content from './Content'

export default () => {
  return (
    <AnalyticsScreen page="reset">
      <div className="Login">
        <Header />
        <Content />
        <FooterDark />
      </div>
    </AnalyticsScreen>
  )
}
