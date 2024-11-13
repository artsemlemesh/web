import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import AnalyticsScreen from '../Common/AnalyticsScreen'
import Content from './Content'

export default () => {
  return (
    <AnalyticsScreen page="sell">
      <div className="About">
        {/* <Preloader /> */}
        <Header />
        {/* <Breadcrumb /> */}
        <Content />
        {/* <Subscribe /> */}
        <FooterDark />
      </div>
    </AnalyticsScreen>
  )
}
