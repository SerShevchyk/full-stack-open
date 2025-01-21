import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNewAnecdoteForm = (props) => {
  const navigate = useNavigate()

  const { reset:contentReset, ...content } = useField('content')
  const { reset:authorReset, ...author } = useField('author')
  const { reset:infoReset, ...info } = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    navigate('/')
    props.setNotification(`A new anecdote "${content.value}" was created`)
  }

  const handleReset = (e) => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  )
};

export default CreateNewAnecdoteForm;