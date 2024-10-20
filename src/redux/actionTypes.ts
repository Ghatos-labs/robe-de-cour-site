export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    options: string;
  }

// Define types for the actions
interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: Product;
}

interface RemoveFromCartAction {
    type: typeof REMOVE_FROM_CART;
    payload: string; // product id
}

// Combine Action types into one type
export type CartActionTypes = AddToCartAction | RemoveFromCartAction;

// Action creators
export const addToCart = (product: Product): AddToCartAction => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCart = (productId: string): RemoveFromCartAction => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});