import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'

import Content from './Content'
import AnalyticsScreen from '../Common/AnalyticsScreen'

export default () => {
  return (
    <AnalyticsScreen page="account">
      <div className="MyAccount">
        {/* <Preloader /> */}
        <Header />
        <Content />
        {/* <Subscribe /> */}
        <FooterDark />
      </div>
    </AnalyticsScreen>
  )
}
