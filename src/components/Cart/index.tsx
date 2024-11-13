import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'
import Content from './Content'
import ScrollUp from '../Common/ScrollUp'
import AnalyticsScreen from '../Common/AnalyticsScreen'

export default () => {
  return (
    <AnalyticsScreen page="cart">
      <div className="Cart">
        {/* <Preloader /> */}
        <Header />
        <Content />
        {/* <Subscribe /> */}
        <FooterDark />

        <ScrollUp />
      </div>
    </AnalyticsScreen>
  )
}
