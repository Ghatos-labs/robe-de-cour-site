import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  list: []
}

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    }
  }
})

export const { increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;