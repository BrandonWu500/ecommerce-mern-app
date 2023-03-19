import axios from 'axios';

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://brandonwu500-mern-ecommerce-api.onrender.com'
    : 'http://localhost:3500/api';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
