import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import authReducer from './auth/authSlice';
import checkoutReducer from './checkout/checkoutSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
  devTools: false,
});
