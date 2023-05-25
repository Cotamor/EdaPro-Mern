import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import './orderList.scss'
import { Link } from 'react-router-dom'
import { useGetOrdersQuery } from '../../../slices/ordersApiSlice'

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery()

  return (
    <div className="orderList">
      <div className="orderListContainer">
        <div className="orderListTop">
          <h1 className="title">Order List</h1>
        </div>
        {isLoading ? (
          <div className="">Loading...</div>
        ) : error ? (
          <div className="">{error?.data?.message || error.error}</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt}</td>
                  <td>$ {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <CircleOutlinedIcon className="icon iconCircle" />
                    ) : (
                      <CloseOutlinedIcon className="icon iconClose" />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <CircleOutlinedIcon className="icon iconCircle" />
                    ) : (
                      <CloseOutlinedIcon className="icon iconClose" />
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button className="detailsBtn">Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
export default OrderList
