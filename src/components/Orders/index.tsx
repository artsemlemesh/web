import { useEffect, ReactElement } from 'react'
import { type AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { getBuyerOderList } from '../../store/actions/shop'
import { RootState } from '../../store/reducers'
import { Link } from 'react-router-dom'
import statusMap from '../Common/StatusMapper'

export interface BuyerOrdersProps {}

export interface Order {
  id: number
  created: string
  status: string
  reason: string
  batch: string
  shipmentid: string
  order: number
  listing: number
}

function BuyerOrders({}: BuyerOrdersProps): ReactElement {
  const dispatch = useDispatch()
  const buyerOrdersList = useSelector((state: RootState) => state.shop.buyerOrderList)

  useEffect(() => {
    dispatch(getBuyerOderList() as unknown as AnyAction)
  }, [])

  return (
    <div>
      {buyerOrdersList ? (
        buyerOrdersList.length == 0 ? (
          <p>No orders available</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyerOrdersList.map((order: Order) => (
                <tr key={order.id}>
                  <td>{`#${order.id}`}</td>
                  <td>{new Date(order.created).toLocaleDateString()}</td>
                  <td>{statusMap.get(order.status)}</td>
                  <td>{`$${150} for ${order.order} item(s)`}</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/orderDetails',
                        state: { order }, // Pass the data in the state object
                      }}
                      className="btn btn-fill-out btn-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  )
}
export default BuyerOrders
