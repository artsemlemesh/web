import { ReactElement } from 'react'
import statusMapper from '../Common/StatusMapper'

interface OrderDetailsProps {
  id: number
  created: string
  modified: string
  status: string
  reason: string | null
  batch: string | null
  shipmentid: string | null
  order: number
  listing: number
}

function Content({
  id,
  created,
  modified,
  status,
  shipmentid,
  order,
  listing,
}: OrderDetailsProps): ReactElement {
  return (
    <div className=" col-3 col-md-5 col-sm-7 mx-auto">
      <div className="card order-card  p-3 mb-5 bg-white rounded">
        <div className="card-body text-center">
          <h3 className="card-title">Order Details</h3>
          <p className="card-text">ID: {id}</p>
          <p className="card-text">Created: {new Date(created).toLocaleDateString()}</p>
          <p className="card-text">Modified: {new Date(modified).toLocaleDateString()}</p>
          <p className="card-text">Status: {statusMapper.get(status)}</p>
          <p className="card-text">Shipment ID: {shipmentid}</p>
          <p className="card-text">Order: {order}</p>
          <p className="card-text">Listing: {listing}</p>
        </div>
      </div>
    </div>
  )
}

export default Content
