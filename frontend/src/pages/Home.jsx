import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Annoucement from '../components/Annoucement';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Slider from '../components/Slider';
import { addCart } from '../redux/cart/cartSlice';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (cart) {
        dispatch(addCart(cart));
        localStorage.removeItem('cart');
      }
    }
  }, [user, dispatch]);
  return (
    <>
      <Annoucement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
};
export default Home;
