import { useState, useContext } from 'react'
import UserContext from '../context/UserContext'
import NotificationContext from '../context/NotificationContext'
import loginService from '../services/login'
import notificationService from '../services/notifications'

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const [user, userDispatch] = useContext(UserContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const handleLoginFormFieldsChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const loginUser = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loginUser)
      )

      userDispatch({ type: 'SET', payload: { user: loginUser } })
    } catch (exception) {
      console.log(exception)
      notificationService.showNotification({ message: 'Wrong credentials', type: 'error' }, notificationDispatch)
    }

    setCredentials({
      username: '',
      password: ''
    })
  }

  return (
    <div className="login-form__container" style={{ marginBottom: 20 }}>
      <h3 className='block text-sm font-medium text-gray-700'>Login form</h3>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            data-testid='username'
            type="text"
            value={credentials.username}
            name="username"
            onChange={handleLoginFormFieldsChange}
            className='mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500'
          />
        </div>
        <div>
          Password
          <input
            data-testid='password'
            type="password"
            value={credentials.password}
            name="password"
            onChange={handleLoginFormFieldsChange}
            className='mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500'
          />
        </div>
        <button type="submit" className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800'>login</button>
      </form>
    </div>
  )
}

export default LoginForm