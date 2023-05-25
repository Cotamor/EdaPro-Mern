import { useEffect, useState } from 'react'
import './register.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

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
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
    } else {
      try {
        const res = await register({ name, email, password }).unwrap()
        console.log(res)
        dispatch(setCredentials({ ...res }))
        navigate(redirect)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className="login">
      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="title">REGISTER</div>
        <label>Name</label>
        <input
          type="text"
          className="formInput"
          placeholder="your name"
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          className="formInput"
          placeholder="confirm password"
          minLength={6}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        <span>
          Already have an account?
          <Link to="/login">
            <b> Login</b>
          </Link>
        </span>
      </form>
    </div>
  )
}
export default Register
