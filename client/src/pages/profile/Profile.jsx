import ClearIcon from '@mui/icons-material/Clear'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import './profile.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useProfileMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/authSlice'
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice'

const Profile = () => {
  const PF = process.env.REACT_APP_PF
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { userInfo } = useSelector((state) => state.auth)

  const [updateProfile, { isLoading }] = useProfileMutation()

  const {
    data: myOrders,
    isLoading: loadingMyOrder,
    error: errorMyOrders,
  } = useGetMyOrdersQuery()

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.name, userInfo.email])

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        if (window.confirm('Are you going to update your info?')) {
          const res = await updateProfile({
            _id: userInfo._id,
            name,
            email,
            password,
          }).unwrap()
          dispatch(setCredentials({ ...res }))
          toast.success('Profile updated successfully')
        } else {
          return
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className="profile">
      <div className="profileContainer">
        <div className="profileLeft">
          <div className="title">User Profile</div>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password..."
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password..."
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
            />
            <button type="submit" className="updateBtn" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Update'}
            </button>
          </form>
        </div>
        <div className="profileRight">
          <div className="title">My Order</div>
          {loadingMyOrder ? (
            <div className="">Loading...</div>
          ) : errorMyOrders ? (
            <div className="">
              {errorMyOrders?.data?.message || errorMyOrders.error}
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th className="tabletHide">ID</th>
                  <th>PRODUCT</th>
                  <th>DATE</th>
                  <th className="tabletHide">TOTAL</th>
                  <th className="tabletHide">PAID</th>
                  <th className="mobileHide">DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="tabletHide">{`${order._id
                      .toString()
                      .slice(0, 5)}...`}</td>
                    <td>
                      <img
                        src={PF + order.orderItems[0].image}
                        alt=""
                        className="productImg"
                      />
                    </td>
                    <td>{order.createdAt.toString().slice(0, 10)}</td>
                    <td className="tabletHide">${order.totalPrice}</td>
                    <td className="tabletHide">
                      {order.isPaid ? <CircleOutlinedIcon /> : <ClearIcon />}
                    </td>
                    <td className="mobileHide">
                      {order.isDelivered ? (
                        <CircleOutlinedIcon />
                      ) : (
                        <ClearIcon />
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button>Details</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
export default Profile
