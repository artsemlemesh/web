import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AnalyticsScreen from '../Common/AnalyticsScreen'
import Content from './Content'
import { RootState } from '../../store/reducers'
import history from '../../history'

export default () => {
  const user = useSelector((state: RootState) => state.user)

  const localCartData = 'localCartData'

  useEffect(() => {
    if (!localCartData) {
      if (user.profile) history.back()
    }
  }, [user])

  return (
    <AnalyticsScreen page="main">
      <div className="MainPage">
        <Content />
      </div>
    </AnalyticsScreen>
  )
}
