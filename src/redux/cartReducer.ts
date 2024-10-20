// src/redux/cartReducer.ts
import { ADD_TO_CART, REMOVE_FROM_CART, Product, CartActionTypes } from './actionTypes';

// Define the initial state type
export interface CartState {
  cart: Product[];
}

// Initial state
const initialState: CartState = {
  cart: [],
};

export const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload], // Add new product to the cart
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload), // Remove product from cart
      };
    default:
      return state;
  }
};
