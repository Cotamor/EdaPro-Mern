import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './app.scss'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { logout } from './slices/authSlice'

function App() {
  const { mode } = useSelector((state) => state.auth)
  // console.log(mode)
  const dispatch = useDispatch()

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime')
    if (expirationTime) {
      const currentTime = new Date().getTime()
      if (currentTime > expirationTime) {
        // TODO: check if need to add logoutApiCall here?
        dispatch(logout())
      }
    }
  }, [dispatch])

  return (
    <div className={`app theme-${mode}`}>
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
