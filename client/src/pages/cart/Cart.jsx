import './cart.scss'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../slices/cartSlice'

const Cart = () => {
  const PF = process.env.REACT_APP_PF
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cart)

  const handleAddToCart = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const handleRemoveFromCart = (id) => {
    console.log('remove from cart')
    dispatch(removeFromCart(id))
  }

  const handleCheckout = () => {
    navigate('/login?redirect=/shipping')
    // navigate('/shipping')
  }

  return (
    <div className="cart">
      <div className="cartWrapper">
        <div className="cartLeft">
          <Link to="/">
            <button className="backBtn">Back to shopping</button>
          </Link>
          <div className="title">Your Cart</div>
          {cartItems.length === 0 ? (
            <div className="">Your cart is empty</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th className="productImgTitle">Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product) => (
                  <tr key={product._id}>
                    <td className="productImg">
                      <img src={PF + product.image} alt="" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <select
                        name="qty"
                        id="qty"
                        value={product.qty}
                        onChange={(e) =>
                          handleAddToCart(product, Number(e.target.value))
                        }
                      >
                        {[...Array(product.countInStock)].map((_, i) => (
                          <option value={i + 1} key={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <DeleteIcon
                        onClick={() => handleRemoveFromCart(product._id)}
                        className="deleteIcon"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="cartRight">
          <div className="subtotalContainer">
            <div className="title">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
              items)
            </div>
            <div className="subtotal">
              ${' '}
              {cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}
            </div>
            <hr />
            <button className="checkoutBtn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cart
