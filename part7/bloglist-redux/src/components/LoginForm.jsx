import { useState } from 'react'

const LoginForm = ({ userLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleLoginFormFieldsChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    userLogin(credentials)
    setCredentials({
      username: '',
      password: ''
    })
  }

  return (
    <div className="login-form__container">
      <h3>Login form</h3>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            data-testid='username'
            type="text"
            value={credentials.username}
            name="username"
            onChange={handleLoginFormFieldsChange}
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
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm