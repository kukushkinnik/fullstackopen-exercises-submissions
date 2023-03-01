import anecdotReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationsReducer from './reducers/notificationsReducer'
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
  reducer: {
    anecdotes: anecdotReducer,
    filter: filterReducer,
    notifications: notificationsReducer,
  }
})

export default store;