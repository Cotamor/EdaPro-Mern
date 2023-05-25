import { Link } from 'react-router-dom'
import './checkoutSteps.scss'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <div className="checkoutSteps">
      <div className="stepsContainer">
        <div className="stepItem">
          {step1 ?(
            <Link to='/login'>Sign In</Link>
            ) :(
            <Link to='/login' className='disabled-link'>Sign In</Link>
          )}
        </div>
        <div className="stepItem">
          {step2 ?(
            <Link to='/shipping'>Shipping</Link>
            ) :(
            <Link to='/shipping' className='disabled-link'>Shipping</Link>
          )}
        </div>
        <div className="stepItem">
          {step3 ?(
            <Link to='/payment'>Payment</Link>
            ) :(
            <Link to='/payment' className='disabled-link'>Payment</Link>
          )}
        </div>
        <div className="stepItem">
          {step4 ?(
            <Link to='/placeorder'>Place Order</Link>
            ) :(
            <Link to='/placeorder' className='disabled-link'>Place Order</Link>
          )}
        </div>
      </div>
    </div>
    )
}
export default CheckoutSteps