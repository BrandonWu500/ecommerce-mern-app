import axios from 'axios';
import { BASE_URL } from '../../requestMethods';

const API_URL = BASE_URL + '/carts/';

const getCart = async (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + userId, config);

  return res.data;
};

export const addToCart = async (productData, token, userId) => {
  if (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(API_URL + userId, productData, config);
    return res.data;
  }
};

export const addCart = async (cartData, token, userId) => {
  if (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(
      API_URL + 'addCart/' + userId,
      cartData,
      config
    );
    return res.data;
  }
};

export const removeFromCart = async (itemId, token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(API_URL + `${userId}/${itemId}`, config);
  return res.data;
};

export const updateCart = async (itemData, token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { itemId, newQuantity } = itemData;
  const res = await axios.put(
    API_URL + `${userId}/${itemId}`,
    { newQuantity },
    config
  );

  return res.data;
};

export const deleteCart = async (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(API_URL + userId, config);

  return res.data;
};

const cartService = {
  addToCart,
  addCart,
  removeFromCart,
  deleteCart,
  getCart,
  updateCart,
};

export default cartService;
