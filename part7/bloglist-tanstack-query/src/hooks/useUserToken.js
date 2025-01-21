import { useContext } from 'react'
import UserContext from '../context/UserContext'

const useUserToken = () => {
  const [user, userDispatch] = useContext(UserContext)
  return user?.token
}

export default useUserToken