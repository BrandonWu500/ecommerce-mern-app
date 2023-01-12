import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartService from './cartService';

const initialState = {
  products: [],
  quantity: 0,
  totalPrice: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getCart = createAsyncThunk('cart/get', async (_, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (user) {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user._id;
      return await cartService.getCart(token, userId);
    }
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addToCart = createAsyncThunk(
  'cart/add',
  async (productData, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      if (user) {
        const token = thunkAPI.getState().auth.user.token;
        const userId = thunkAPI.getState().auth.user._id;
        return await cartService.addToCart(productData, token, userId);
      }
      return cartService.guestAddToCart(productData);
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

export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (itemId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user._id;
      return await cartService.removeFromCart(itemId, token, userId);
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

export const updateCart = createAsyncThunk(
  'cart/update',
  async (itemData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user._id;

      return await cartService.updateCart(itemData, token, userId);
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

export const deleteCart = createAsyncThunk(
  'cart/delete',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user._id;

      return await cartService.deleteCart(token, userId);
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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartReset: (state) => initialState,
    guestAddToCart: (state, action) => {
      let cart = JSON.parse(localStorage.getItem('cart'));
      const productData = action.payload;
      if (cart) {
        // check if item already in cart
        const itemIdx = cart.products.findIndex(
          (item) => item._id === productData._id
        );

        // updates existing item's quantity
        if (itemIdx > -1) {
          const item = cart.products[itemIdx];
          item.quantity += productData.quantity;
          cart.products[itemIdx] = item;
        } else {
          cart.products.push(productData);
        }
        cart.quantity += productData.quantity;
        cart.totalPrice += productData.quantity * productData.price;
        localStorage.setItem('cart', JSON.stringify(cart));

        // update redux
        state.products = cart.products;
        state.quantity = cart.quantity;
        state.totalPrice = cart.totalPrice;
      } else {
        cart = {
          products: [productData],
          quantity: productData.quantity,
          totalPrice: productData.quantity * productData.price,
        };
        localStorage.setItem('cart', JSON.stringify(cart));

        // update redux
        state.products = cart.products;
        state.quantity = cart.quantity;
        state.totalPrice = cart.totalPrice;
      }
    },
    guestRemoveFromCart: (state, action) => {
      const itemId = action.payload;
      let cart = JSON.parse(localStorage.getItem('cart'));
      const itemIdx = cart.products.findIndex((item) => item._id === itemId);
      if (itemIdx > -1) {
        const item = cart.products[itemIdx];
        cart.totalPrice -= item.quantity * item.price;
        cart.quantity -= item.quantity;
        cart.products.splice(itemIdx, 1);
        localStorage.setItem('cart', JSON.stringify(cart));

        // update redux
        state.products = cart.products;
        state.quantity = cart.quantity;
        state.totalPrice = cart.totalPrice;
      }
    },
    guestClearCart: (state) => {
      localStorage.removeItem('cart');
      return initialState;
    },
    guestUpdateCart: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      let cart = JSON.parse(localStorage.getItem('cart'));
      const itemIdx = cart.products.findIndex((item) => item._id === itemId);
      if (itemIdx > -1 && newQuantity > 0) {
        const item = cart.products[itemIdx];
        cart.quantity -= item.quantity;
        cart.totalPrice -= item.quantity * item.price;
        item.quantity = newQuantity;
        cart.products[itemIdx] = item;
        cart.quantity += newQuantity;
        cart.totalPrice += newQuantity * item.price;
        localStorage.setItem('cart', JSON.stringify(cart));

        // update redux
        state.products = cart.products;
        state.quantity = cart.quantity;
        state.totalPrice = cart.totalPrice;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload?.products;
        state.quantity = action.payload?.quantity ?? 0;
        state.totalPrice = action.payload?.totalPrice ?? 0;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products;
        state.quantity = action.payload.quantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products;
        state.quantity = action.payload.quantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products;
        state.quantity = action.payload.quantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = [];
        state.quantity = 0;
        state.totalPrice = 0;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  cartReset,
  guestAddToCart,
  guestRemoveFromCart,
  guestClearCart,
  guestUpdateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
