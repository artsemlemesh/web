import { useLocation } from 'react-router-dom'
import Header from '../Common/Header'
import FooterDark from '../Common/FooterDark'

import Content from './Content'
import AnalyticsScreen from '../Common/AnalyticsScreen'

export default () => {
  const location = useLocation()
  const itemData = location.state.order

  return (
    <AnalyticsScreen page="OrderDetails">
      <div className="OrderDetails">
        {/* <Preloader /> */}
        <Header />
        <Content
          id={itemData.id}
          created={itemData.created}
          modified={itemData.modified}
          status={itemData.status}
          reason={itemData.reason}
          batch={itemData.batch}
          shipmentid={itemData.shipmentid}
          order={itemData.order}
          listing={itemData.listing}
        />
        {/* <Subscribe /> */}
        <FooterDark />
      </div>
    </AnalyticsScreen>
  )
}
