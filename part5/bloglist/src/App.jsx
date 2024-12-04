import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import notificationService from './services/notifications'
import Notification from './components/Notification'
import Button from './components/Button'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  const blogFormRef = useRef()

  useEffect(() => {
    var getAllBlogs = async () => {
      let result = await blogService.getAll()
      var sortedResults = result.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedResults )
    }
    getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const userLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      console.log(exception)
      notificationService.showNotification({ message: 'Wrong credentials', type: 'error' }, setNotification)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    window.localStorage.removeItem('loggedUser')
    notificationService.showNotification({ message: `User ${user.name} is logout`, type: 'notification' }, setNotification)
    setUser(null)
  }

  const createBlog = async (blog) => {
    try {
      let result = await blogService.createBlog(blog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat({ ...result, id: result.id }))
      notificationService.showNotification({ message: `New blog "${result.title}" was added successfully by ${result.author}`, type: 'success' }, setNotification)
    }
    catch (e) {
      console.log(e)
      notificationService.showNotification({ message: e.response.data.error, type: 'error' }, setNotification)
    }
  }

  const updateBlogs = async (action, result) => {
    let updatedBlogs = []

    switch (action) {
    case 'add':
      updatedBlogs = blogs.map((blog) => blog.id === result.id ? result : blog)
      break
    case 'delete':
      updatedBlogs = blogs.filter((blog) => blog.id !== result.id)
      break
    }

    var sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  return (
    <div>
      <Notification notification={notification} />
      {
        user === null ? (
          <LoginForm userLogin={userLogin}></LoginForm>
        ) : (
          <div className="content">
            <div className="user-info">
              <div className="user-info__welcome">
                <span>{user.name} is logged in</span>
                <Button action={handleLogout} text="Logout"></Button>
              </div>
            </div>
            <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
              <BlogForm createBlog={createBlog}></BlogForm>
            </Togglable>
          </div>
        )
      }
      <div className="blogs">
        <h2>Blogs</h2>
        {blogs.map(blog => {
          return <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} user={user}/>
        }
        )}
      </div>
    </div>
  )
}

export default App