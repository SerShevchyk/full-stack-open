import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationState(state, action) {
      return action.payload.notification
    },
    removeNotification(state, action) {
      return ''
    }
  },
})

export const setNotification = (notification, seconds) => {
  return dispatch => {
    dispatch(setNotificationState({notification : notification}))

    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export const { setNotificationState, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer