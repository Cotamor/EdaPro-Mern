import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../../slices/usersApiSlice'
import { toast } from 'react-toastify'
import './userList.scss'

const UserList = () => {
  const { data: users, isLoading, error } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  return (
    <div className="userList">
      <div className="userListContainer">
        <div className="userListTop">
          <h1 className="title">User List</h1>
        </div>
        {isLoading ? (
          <div className="">Loading...</div>
        ) : error ? (
          <div className="">{error?.data?.message || error.error}</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`} className="mailLink">
                      {user.email}
                    </a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <CheckOutlinedIcon />
                    ) : (
                      <CloseOutlinedIcon />
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <EditIcon className="icon iconEdit" />
                    </Link>
                    <DeleteIcon
                      className="icon iconDelete"
                      onClick={() => handleDelete(user._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
export default UserList
