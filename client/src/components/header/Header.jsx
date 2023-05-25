import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import LoginIcon from '@mui/icons-material/Login'
import {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, setMode } from '../../slices/authSlice'
import './header.scss'
import { useLogoutMutation } from '../../slices/usersApiSlice'
import { clearShippingAddress } from '../../slices/cartSlice'
import Search from '../searchBox/Search'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openAdminMenu, setOpenAdminMenu] = useState(false)
  const { mode, userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()
  const { cartItems } = useSelector((state) => state.cart)
  const numItems = cartItems.reduce((acc, i) => acc + i.qty, 0)

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      // for testing
      dispatch(clearShippingAddress())
      navigate('/login')
      setOpenMenu(false)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headLeft">
          <Link to="/">
            <div className="logo">EdaPro</div>
          </Link>
        </div>
        <div className="headCenter tabletHide">
          <Search />
        </div>
        <div className="headRight">
          {mode === 'light' ? (
            <div className="icon">
              <DarkModeIcon onClick={() => dispatch(setMode())} />
            </div>
          ) : (
            <div className="icon">
              <LightModeIcon onClick={() => dispatch(setMode())} />
            </div>
          )}
          {/* </div> */}
          <Link className="link" to="/cart">
            <div className="iconCart">
              <ShoppingCartOutlinedIcon />
              {userInfo && cartItems.length > 0 && (
                <div className="cartBadge">{numItems}</div>
              )}
            </div>
          </Link>
          {userInfo ? (
            <div
              className="menu"
              onMouseEnter={() => setOpenMenu(!openMenu)}
              onMouseLeave={() => setOpenMenu(!openMenu)}
            >
              <span>{userInfo.name}</span>
              {openMenu && (
                <ul className="menuBox">
                  <Link to="/profile">
                    <li>Profile</li>
                  </Link>
                  <Link onClick={handleLogout}>
                    <li>Logout</li>
                  </Link>
                </ul>
              )}
            </div>
          ) : (
            <div className="menu">
              <Link className="link" to="/login">
                <span>Login</span>
                <LoginIcon />
              </Link>
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div
              className="menu"
              onMouseEnter={() => setOpenAdminMenu(!openAdminMenu)}
              onMouseLeave={() => setOpenAdminMenu(!openAdminMenu)}
            >
              <span>Admin</span>
              {openAdminMenu && (
                <ul className="menuBox menuBoxAdmin">
                  <Link to="/admin/productList">
                    <li>Products</li>
                  </Link>
                  <Link to="/admin/orderList">
                    <li>Orders</li>
                  </Link>
                  <Link to="/admin/userList">
                    <li>Users</li>
                  </Link>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Header
