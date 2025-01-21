import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBlogComments } from '../services/comments'

const Comments = ({ blog }) => {

  const { data, isLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getBlogComments(blog.id)
  })

  if (isLoading) { return ( <div className="loading">Loading...</div> ) }

  return (
    <div className='comments'>
      <h3>Comments</h3>
      <ul>
        {data.map(comment => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments