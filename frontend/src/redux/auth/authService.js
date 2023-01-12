import { publicRequest } from '../../requestMethods';

const register = async (user) => {
  const res = await publicRequest.post('/users', user);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

const login = async (user) => {
  const res = await publicRequest.post('/users/login', user);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
    localStorage.removeItem('cart');
  }
  return res.data;
};

const logout = async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('cart');
};

const authService = { register, login, logout };

export default authService;
