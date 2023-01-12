import axios from 'axios';
import { BASE_URL } from '../../requestMethods';

const makePayment = async (paymentData, token) => {
  const { userId, stripeToken, cart } = paymentData;
  if (token) {
    try {
      const res = await axios.post(
        BASE_URL + '/checkout/payment',
        {
          tokenId: stripeToken.id,
          amount: cart.totalPrice * 100,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { stripeData: res.data, cart, userId };
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const res = await axios.post(BASE_URL + '/checkout/payment', {
        tokenId: stripeToken.id,
        amount: cart.totalPrice * 100,
      });
      const orderData = { stripeData: res.data, cart, userId };
      return orderData;
    } catch (error) {
      console.log(error);
    }
  }
};

const createOrder = async (orderData, token) => {
  const { stripeData, cart, userId } = orderData;
  if (token) {
    try {
      const res = await axios.post(
        BASE_URL + '/orders/' + userId,
        {
          userId,
          products: cart.products,
          amount: cart.totalPrice,
          address: stripeData.billing_details.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const res = await axios.post(BASE_URL + '/orders/' + userId, {
        userId,
        products: cart.products,
        amount: cart.totalPrice,
        address: stripeData.billing_details.address,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
};

const checkoutService = { makePayment, createOrder };

export default checkoutService;
