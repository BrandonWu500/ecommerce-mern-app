import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductInfo from './pages/ProductInfo';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import PaySuccess from './pages/PaySuccess';
import Search from './pages/Search';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductInfo />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/orders"
            element={user ? <Orders /> : <Navigate to="/" />}
          />
          <Route path="/payment-success" element={<PaySuccess />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
      <ToastContainer position="top-left" />
    </>
  );
};
export default App;
