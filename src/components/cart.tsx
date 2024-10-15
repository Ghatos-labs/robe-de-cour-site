import { createSlice } from "@reduxjs/toolkit";

interface cartState {
  count: number,
  list: Object[];
}

const initialState: cartState = {
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
    },
    push: (state, action) => {
      state.list.push(action.payload);
    }
  }
})

export const { increment, decrement, push } = cartSlice.actions;

export default cartSlice.reducer;