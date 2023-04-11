import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    allChecked: true,
    noTrns: true,
    trns1: true,
    trns2: true,
    trns3: true,
  },
  reducers: {
    allCheckedChange(state) {
      const newChecks = { ...state }
      Object.keys(newChecks).forEach((key) => {
        newChecks[key] = !state.allChecked
      })

      return newChecks
    },
    checkedChange(state, action) {
      const newChecks = { ...state }
      newChecks[action.payload] = !newChecks[action.payload]
      delete newChecks.allChecked
      const isAllChecked = Object.values(newChecks).every((value) => value === true)
      newChecks.allChecked = isAllChecked

      return newChecks
    },
  },
})

export const { allCheckedChange, checkedChange } = filterSlice.actions
export default filterSlice.reducer
