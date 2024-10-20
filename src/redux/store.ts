import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartReducer';

const store = configureStore({
  reducer: cartReducer, // Pass the reducer
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;