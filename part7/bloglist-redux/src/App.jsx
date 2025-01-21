import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import notificationService from './services/notifications'
import Notification from './components/Notification'
import Button from './components/Button'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    // var getAllBlogs = async () => {
    //   let result = await blogService.getAll()
    //   var sortedResults = result.sort((a, b) => b.likes - a.likes)
    //   dispatch({type: 'blogs/setBlogs', payload: sortedResults})
    // }
    // getAllBlogs()
    dispatch(initializeBlogs())

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({type: 'user/setUser', payload: user})
      blogService.setToken(user.token)
    }
  }, [])

  const userLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      dispatch({type: 'user/setUser', payload: user})
      blogService.setToken(user.token)
    } catch (exception) {
      console.log(exception)
      notificationService.showNotification({ message: 'Wrong credentials', type: 'error' }, dispatch)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    window.localStorage.removeItem('loggedUser')
    notificationService.showNotification({ message: `User ${user.name} is logout`, type: 'notification' }, dispatch)
    dispatch({type: 'user/setUser', payload: null})
  }

  const createBlog = async (blog) => {
    try {
      let result = await blogService.createBlog(blog)
      blogFormRef.current.toggleVisibility()
      dispatch({type: 'blogs/createBlog', payload: { ...result, id: result.id }})
      notificationService.showNotification({ message: `New blog "${result.title}" was added successfully by ${result.author}`, type: 'success' }, dispatch)
    }
    catch (e) {
      console.log(e)
      notificationService.showNotification({ message: e.response.data.error, type: 'error' }, dispatch)
    }
  }

  return (
    <div>
      < Notification />
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
          return <Blog key={blog.id} blog={blog} user={user}/>
        }
        )}
      </div>
    </div>
  )
}

export default App