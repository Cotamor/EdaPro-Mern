import './placeOrder.scss'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../../slices/ordersApiSlice'
import { clearCart } from '../../slices/cartSlice'

const PlaceOrder = () => {
  const PF = process.env.REACT_APP_PF
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const {
    shippingAddress,
    paymentMethod,
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart
  console.log(cart)

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    } else if (!paymentMethod) {
      navigate('/payment')
    }
  }, [navigate, shippingAddress, paymentMethod])

  const [createOrder, { isLoading, error }] = useCreateOrderMutation()

  const handlePlaceOrder = async () => {
    try {
      // api createOrder
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap()

      // clear cart
      dispatch(clearCart())
      navigate(`/order/${res._id}`)
      // navigate to order page
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className="placeOrder">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeOrderContainer">
        <div className="placeOrderLeft">
          <div className="placeOrderLeftItem">
            <div className="title">Shipping</div>
            <span>
              <b>Address</b> :{' '}
              {`${shippingAddress.address}, ${shippingAddress.city} ${shippingAddress.postalCode}, ${shippingAddress.country}`}
            </span>
          </div>
          <div className="placeOrderLeftItem">
            <div className="title">Payment</div>
            <span>
              <b>Payment</b>: {paymentMethod}
            </span>
          </div>

          <div className="placeOrderLeftItem">
            <div className="title">Order Items</div>
            {cartItems.length === 0 ? (
              <div className="">Your cart is empty.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th className="productImg">Product</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td className="productImg">
                        <img src={PF + item.image} alt="" />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        {item.price} x {item.qty} = ${item.price * item.qty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="placeOrderRight">
          <div className="summeryContainer">
            <div className="title">Order Summery</div>
            <div className="summeryItem">
              <span>Items</span>
              <span>$ {cart.itemsPrice}</span>
            </div>
            <hr />
            <div className="summeryItem">
              <span>Shipping</span>
              <span>$ {cart.shippingPrice}</span>
            </div>
            <hr />
            <div className="summeryItem">
              <span>Tax</span>
              <span>$ {cart.taxPrice}</span>
            </div>
            <hr className="hrTotal" />
            <div className="summeryItem total">
              <span>Total</span>
              <span>$ {cart.totalPrice}</span>
            </div>
            <button
              className="placeOrderBtn"
              disabled={cartItems.length === 0}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
            {isLoading && <div className="">Loading...</div>}
            {error && <div className="">error</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
export default PlaceOrder
