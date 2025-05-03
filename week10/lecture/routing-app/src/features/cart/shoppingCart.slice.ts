import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "./card-item";

interface  ShoppingCardState  {
  cart: CartItem[];
};

const initialState: ShoppingCardState = {
  cart: [],
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + 1} : item),
        };
      }

      return {
        ...state, 
        cart: [...state.cart, action.payload],
      };
    },
    removeItem: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        cart: [],
      };
    },
  }
})

export const { addItem, removeItem, clearCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;