import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    allChecked: false,
    noTrns: false,
    trns1: false,
    trns2: false,
    trns3: false
  },
  reducers: {
    allCheckedChange(state, action) {
      const newChecks = {...state}
      Object.keys(newChecks).forEach(key => {
        newChecks[key] = !state.allChecked;
      });

      return newChecks;
    },
    checkedChange(state, action) {
      const newChecks = {...state}
      newChecks[action.payload] = !newChecks[action.payload];
      delete newChecks.allChecked
      const isAllChecked = Object.values(newChecks).every(value => value === true);
      newChecks.allChecked = isAllChecked;

      return newChecks;
    }
  }
})

export const {allCheckedChange, checkedChange} = filterSlice.actions;
export default filterSlice.reducer;