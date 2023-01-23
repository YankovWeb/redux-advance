import {createSlice} from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    carIsVisilbe: false,
  },
  reducers: {
    toggle(state) {
      state.carIsVisilbe = !state.carIsVisilbe;
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
