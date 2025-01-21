import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import NotificationContext from '../context/NotificationContext'
import Button from './Button'
import notificationService from '../services/notifications'

const MainMenu = () => {

  const [user, userDispatch] = useContext(UserContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')
    notificationService.showNotification({ message: `User ${user.name} is logout`, type: 'notification' }, notificationDispatch)
    userDispatch({ type: 'SET', payload: { user: null } })
  }

  return (
    <div className="main-menu container px-4 py-3 w-1/3">
      <nav>
        <ul className='flex items-center justify-between'>
          <li>
            <Link to="/" className='text-gray-600 hover:text-gray-800'>Home</Link>
          </li>
          <li>
            <Link to="/blogs" className='text-gray-600 hover:text-gray-800'>Blogs</Link>
          </li>
          <li>
            <Link to="/users" className='text-gray-600 hover:text-gray-800'>Users</Link>
          </li>
          { user && (
            <li>
              <span>{user.name} is logged in</span>
              <Button action={handleLogout} text="Logout"></Button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default MainMenu