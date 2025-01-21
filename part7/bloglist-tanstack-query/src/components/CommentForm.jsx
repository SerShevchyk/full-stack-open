import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment } from '../services/comments'

const CommentForm = ({ blog }) => {
  const queryClient = useQueryClient()

  const addCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
    onError: (error) => {
      console.log('ERROR', error)
    }
  })

  const handleCommonFormSubmit = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value

    addCommentMutation.mutate({ comment : comment, blog : blog.id })
    e.target.comment.value = ''
  }

  return (
    <div className="blog-form__container" style={{ marginTop: 20, marginBottom: 20 }}>
      <h3 className='block text-sm font-medium text-gray-700'>Add new common</h3>
      <form onSubmit={handleCommonFormSubmit}>
        <div>
          Comment: <input name="comment" placeholder="comment" className='mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500'/>
        </div>
        <div>
          <button type="submit" className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm;