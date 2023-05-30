import './order.scss'
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../../slices/ordersApiSlice'
import { useParams } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment-timezone'

const Order = () => {
  const PF = process.env.REACT_APP_PF
  const { id: orderId } = useParams()

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId)

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  const [markAsDeli, { isLoading: loadingMark, error: errorMark }] =
    useDeliverOrderMutation()

  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useGetPaypalClientIdQuery()

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        })
        paypalDispatch({
          type: 'setLoadingStatus',
          value: 'pending',
        })
      }
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript()
        }
      }
    }
  }, [errorPaypal, loadingPaypal, order, paypalDispatch, paypal])

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details })
        refetch()
        toast.success('Order is paid')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    })
  }

  function onError(err) {
    toast.error(err.message)
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        // Your code here after create the order
        return orderId
      })
  }

  const handleDeliver = async (orderId) => {
    console.log('Delivered')
    await markAsDeli(orderId)
    refetch()
    //  TODO: ADD delivered logic
  }

  return (
    <div className="order">
      <div className="orderContainer">
        {isLoading ? (
          <div className="">Loading...</div>
        ) : error ? (
          <div className="">error?.data?.message || error.error</div>
        ) : (
          <>
            <div className="orderLeft">
              <div className="orderLeftItem">
                <div className="title">Shipping</div>
                <span>
                  <b>Name</b> : {order.user.name}
                </span>
                <span>
                  <b>Email</b> : {order.user.email}
                </span>
                <span>
                  <b>Address</b> :{' '}
                  {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode} ${order.shippingAddress.country}`}
                </span>
                {order.isDelivered ? (
                  <span className="status">
                    Delivered on{' '}
                    {moment(order.deliveredAt)
                      .tz('Asia/Tokyo')
                      .format('YYYY-MM-DD HH:mm')}
                  </span>
                ) : (
                  <span className="status notyet">Not Delivered</span>
                )}
              </div>
              <div className="orderLeftItem">
                <div className="title">Payment</div>
                <span>
                  <b>Payment</b>: {order.paymentMethod}
                </span>
                {order.isPaid ? (
                  <span className="status">
                    Paid on{' '}
                    {moment(order.paidAt)
                      .tz('Asia/Tokyo')
                      .format('YYYY-MM-DD HH:mm')}
                  </span>
                ) : (
                  <span className="status notyet">Not Paid</span>
                )}
              </div>

              <div className="orderLeftItem">
                <div className="title">Order Items</div>
                <table>
                  <thead>
                    <tr>
                      <th className="productImg">Product</th>
                      <th>Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item) => (
                      <tr key={item._id}>
                        <td className="productImg">
                          <img src={PF + item.image} alt="" />
                        </td>
                        <td>{item.name}</td>
                        <td>
                          {item.price} x {item.qty} = {item.price * item.qty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="orderRight">
              <div className="summeryContainer">
                <div className="title">Order Summery</div>
                <div className="summeryItem">
                  <span>Items</span>
                  <span>$ {order.itemsPrice}</span>
                </div>
                <hr />
                <div className="summeryItem">
                  <span>Shipping</span>
                  <span>$ {order.shippingPrice}</span>
                </div>
                <hr />
                <div className="summeryItem">
                  <span>Tax</span>
                  <span>$ {order.taxPrice}</span>
                </div>
                <hr className="hrTotal" />
                <div className="summeryItem total">
                  <span>Total</span>
                  <span>$ {order.totalPrice}</span>
                </div>

                {!order.isPaid && (
                  <div className="paypalBtnWrapper">
                    {loadingPay && <div className="">Loading...</div>}
                    {isPending ? (
                      <div className="">Loading...</div>
                    ) : (
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    )}
                  </div>
                )}
                {loadingMark && <div className="">Loading...</div>}
                {errorMark && (
                  <div className="">
                    {errorMark?.data?.message || errorMark.error}
                  </div>
                )}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <div className="summeryItem">
                      <button
                        className="markAsDeliBtn"
                        onClick={() => handleDeliver(order._id)}
                      >
                        Mark as Delivered
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default Order
