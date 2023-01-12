import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import checkoutService from './checkoutService';

const initialState = {
  paymentMade: false,
  orderData: null,
  orderCreated: false,
  orderId: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const makePayment = createAsyncThunk(
  'checkout/pay',
  async (paymentData, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      if (user) {
        const token = thunkAPI.getState().auth.user.token;
        return await checkoutService.makePayment(paymentData, token);
      }
      return await checkoutService.makePayment(paymentData, null);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'checkout/createOrder',
  async (_, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      const orderData = thunkAPI.getState().checkout.orderData;
      if (user) {
        const token = thunkAPI.getState().auth.user.token;
        return await checkoutService.createOrder(orderData, token);
      }
      return await checkoutService.createOrder(orderData, null);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    checkoutReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.paymentMade = true;
        state.isSuccess = true;
        state.isLoading = false;
        state.orderData = action.payload;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.orderId = action.payload._id;
        state.orderCreated = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export const { checkoutReset } = checkoutSlice.actions;
export default checkoutSlice.reducer;
