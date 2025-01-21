import Comments from './Comments'
import CommentForm from '../components/CommentForm'

const Blog = ({ blog }) => {

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2 className="blog-header">{blog.title}</h2>
      <div className="blog-content">
        <div>{blog.url}</div>
        <div className='blog__likes'>
          <span className='likes'>Likes: {blog.likes}</span>
        </div>
        <div className="author">Added by {blog.author}</div>
        <CommentForm blog={blog} />
        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default Blog