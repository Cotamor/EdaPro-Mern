import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import './shipping.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { saveShipphingAddress } from '../../slices/cartSlice'

const Shipping = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector((state) => state.cart)

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(saveShipphingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }
  return (
    <div className="shipping">
      <CheckoutSteps step1 step2 />
      <div className="shippingContainer">
        <div className="title">Shipping</div>
        <form onSubmit={handleSubmit}>
          <label>Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address ...1-1-1 choujya machi"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label>City</label>
          <input
            type="text"
            id="city"
            required
            placeholder="Enter city ...Yokohama"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>Postal Code</label>
          <input
            type="text"
            id="postalCode"
            required
            placeholder="Enter postal code ...2222222"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <label>Country</label>
          <input
            type="text"
            id="country"
            required
            placeholder="Enter country ...Japan"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
export default Shipping
