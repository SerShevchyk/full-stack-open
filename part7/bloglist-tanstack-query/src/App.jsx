import { useEffect, useRef, useContext } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import MainMenu from './components/MainMenu'
import UserContext from './context/UserContext'
import UsersContext from './context/UsersContext'
import BlogsContext from './context/BlogsContext'
import Blogs from './pages/Blogs'
import Users from './pages/Users'
import Home from './pages/Home'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const [user, userDispatch] = useContext(UserContext)
  const [users, usersDispatch] = useContext(UsersContext)
  const [blogs, blogsDispatch] = useContext(BlogsContext)
  const blogFormRef = useRef()

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  const matchedUser = userMatch
    ? users?.find(user => user.id === userMatch.params.id)
    : null

  const matchedBlog = blogMatch
    ? blogs?.find(blog => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      userDispatch({ type: 'SET', payload: { user: user } })
    }
  }, [userDispatch])

  return (
    <div className='container mx-auto px-4 py-3'>
      <Notification/>
      <MainMenu />
      {
        user === null ? (
          <LoginForm></LoginForm>
        ) : (
          <div className="content" style={ { marginBottom: 20, marginTop: 20 } }>
            <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
              <BlogForm blogFormRef={blogFormRef}></BlogForm>
            </Togglable>
          </div>
        )
      }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
      </Routes>
    </div>
  )
}

export default App