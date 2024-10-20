import { createSlice } from "@reduxjs/toolkit";

interface cartState {
  list: Object[];
}

const initialState: cartState = {
  list: []
}

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    push: (state, action) => {
      console.log(state.list);
      state.list.push(action.payload);
    },
    pull: (state, action) => {
      console.log(state.list);
      const updatedItems = state.list.filter(item => item !== action.payload)
      state.list = updatedItems;
      console.log(state.list);
      //delete state.list[action.payload];
    }
  }
})

export const { push, pull } = cartSlice.actions;

export default cartSlice.reducer;