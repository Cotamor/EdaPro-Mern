import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import './payment.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../slices/cartSlice'

const Payment = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [navigate, shippingAddress])

  const [paymentMethod, setPaymentMethod] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(paymentMethod)
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <div className="payment">
      <CheckoutSteps step1 step2 step3 />
      <div className="paymentContainer">
        <div className="paymentTitle">Payment</div>
        <form onSubmit={handleSubmit}>
          <div className="formItem">
            <input
              type="radio"
              name="payment"
              id="choice1"
              value="PayPal"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="choice1">Paypal or Credit Card</label>
          </div>
          <div className="formItem">
            <input
              type="radio"
              name="payment"
              id="choice2"
              value="Bitcoin"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="choice2">Bitcoin</label>
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  )
}
export default Payment
