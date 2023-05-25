import { useEffect, useState } from 'react'
import './login.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../slices/authSlice'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (err) {
      console.log('error', err)
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="login">
      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="title">LOGIN</div>
        <label>Email</label>
        <input
          type="email"
          className="formInput"
          placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          className="formInput"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Log In'}
        </button>
        <span>
          You don't have an account?
          <Link to="/register">
            <b> Register</b>
          </Link>
        </span>
      </form>
    </div>
  )
}
export default Login
