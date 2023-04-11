import { configureStore } from '@reduxjs/toolkit'

import sortReducer from './sortSlice'
import filterReducer from './filterSlice'
import ticketReducer from './ticketSlice'

export default configureStore({
  reducer: {
    sort: sortReducer,
    filter: filterReducer,
    tickets: ticketReducer,
  },
})
