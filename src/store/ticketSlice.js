import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchId = createAsyncThunk(
  'tickets/getSearchId',
  async function() {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    const data = await res.json();
    return data;
  }
)

export const getTickets = createAsyncThunk(
  'tickets/getTickets',
  async function(searchId) {
    const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    const data = await res.json();
    return data;
  }
)

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    searchId: '',
    status: null,
    error: null
  },
  reducers: {

  },
  extraReducers: {
    [getSearchId.fulfilled]: (state, action) => {
      state.searchId = action.payload.searchId;
    },
    [getTickets.fulfilled]: (state, action) => {
      state.tickets = action.payload.tickets
    }
  }
})

export default ticketSlice.reducer;