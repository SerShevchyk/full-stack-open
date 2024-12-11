import { useDispatch } from 'react-redux'

const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (e) => {
    let filter = e.target.value
    dispatch({ type: 'anecdoteFilter/actionCreatorFilter', payload: {filter} })
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter