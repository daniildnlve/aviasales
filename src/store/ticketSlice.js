import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getSearchId = createAsyncThunk('tickets/getSearchId', async function () {
  const res = await fetch('https://aviasales-test-api.kata.academy/search')
  const data = await res.json()
  return data
})

export const getTickets = createAsyncThunk('tickets/getTickets', async function (searchId, { dispatch }) {
  let stop = false
  let errorsCount = 0
  let count = 0
  while (!stop) {
    const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    if (!res.ok) {
      errorsCount += 1
      if (errorsCount > 20) {
        stop = true
        dispatch(setStatus('exception'))
        setTimeout(() => dispatch(setLoading(false)), 1000)
        throw new Error()
      }
      if (res.status !== 500) {
        dispatch(setProgress(10))
      }
      continue
    }
    count += 1
    const data = await res.json()
    dispatch(setTickets(data.tickets))
    if (count === 1) {
      dispatch(setFirstLoading(false))
      dispatch(setFirstLoadingEnd(true))
    }
    dispatch(setProgress(5))
    stop = data.stop
  }
  setTimeout(() => dispatch(setLoading(false)), 1000)
})

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    searchId: '',
    loading: false,
    firstLoading: false,
    firstLoadingEnd: false,
    progress: 0,
    error: false,
    notFind: false,
    status: 'active',
  },
  reducers: {
    setTickets(state, action) {
      state.tickets.push(...action.payload)
    },
    setProgress(state, action) {
      state.progress += action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setFirstLoading(state, action) {
      state.firstLoading = action.payload
    },
    setFirstLoadingEnd(state, action) {
      state.firstLoadingEnd = action.payload
    },
    setNotFind(state, action) {
      state.notFind = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(getSearchId.pending, (state) => {
        state.error = false
      })
      .addCase(getSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload.searchId
      })
      .addCase(getSearchId.rejected, (state) => {
        state.error = true
      })
      .addCase(getTickets.pending, (state) => {
        state.error = false
        state.loading = true
        state.firstLoading = true
        state.progress = 0
        state.status = 'active'
      })
      .addCase(getTickets.fulfilled, (state) => {
        state.status = 'sucess'
      })
      .addCase(getTickets.rejected, (state) => {
        state.error = true
      })
  },
})

export const { setTickets, setProgress, setLoading, setNotFind, setStatus, setFirstLoading, setFirstLoadingEnd } =
  ticketSlice.actions
export default ticketSlice.reducer
