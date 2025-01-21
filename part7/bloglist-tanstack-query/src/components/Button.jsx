import React from 'react'

const Button = ({ action, text, attr }) => {
  return (
    <button onClick={action} {...attr} className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800'>{text}</button>
  )
}

export default Button