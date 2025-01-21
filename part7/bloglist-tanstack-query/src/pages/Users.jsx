import {
  Link
} from 'react-router-dom'
import { useContext } from 'react'
import UsersContext from '../context/UsersContext'

const Users = () => {
  const [users, usersDispatch] = useContext(UsersContext)

  return (
    <>
      {!users ? (
        <div>Loading users...</div>
      ) : (
        <div className='users'>
          <h2 className='block text-xl font-medium text-gray-700'>Users</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Users