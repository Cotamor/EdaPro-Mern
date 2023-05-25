import { useEffect, useState } from 'react'
import './userEdit.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { dummyUsers } from '../../../dummyData'
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../../slices/usersApiSlice'
import { toast } from 'react-toastify'

const UserEdit = () => {
  const { id: userId } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId)

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateUser({ userId, name, email, isAdmin })
      console.log('updatedUser', res.data)
      toast.success('User updated successfully')
      refetch()
      navigate('/admin/userList')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="userEdit">
      <div className="userEditContainer">
        <Link to="/admin/userList">
          <button className="goBack">Go Back</button>
        </Link>
        <div className="formContainer">
          <h1 className="title">User Edit</h1>
          {loadingUpdate && <div className="">Loading...</div>}
          {isLoading ? (
            <div className="">Loading...</div>
          ) : error ? (
            <div className="">{error?.data?.message || error.error}</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="check">
                <input
                  type="checkbox"
                  onChange={() => setIsAdmin(!isAdmin)}
                  checked={isAdmin}
                  className="checkAdmin"
                />
                <label>isAdmin</label>
              </div>

              <button type="submit">Update</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
export default UserEdit
