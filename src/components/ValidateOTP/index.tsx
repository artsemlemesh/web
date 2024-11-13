import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import AnalyticsScreen from '../Common/AnalyticsScreen'
import Content from './Content'

export default () => {
  return (
    <AnalyticsScreen page="validate-otp">
      <div>
        <Header />
        <Content />
        <FooterDark />
      </div>
    </AnalyticsScreen>
  )
}
