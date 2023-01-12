import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteCart, guestClearCart } from '../redux/cart/cartSlice';
import { checkoutReset, createOrder } from '../redux/checkout/checkoutSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4em;
  height: 80vh;
`;
const Text = styled.h1`
  max-width: 30ch;
`;
const Btns = styled.div`
  display: flex;
  gap: 2em;
`;
const Btn = styled.button`
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 1em;
  font-size: 1.1rem;
`;
const BtnAccent = styled.button`
  border: 0;
  background-color: black;
  color: white;
  padding: 1em;
  font-size: 1.1rem;
`;

const PaySuccess = () => {
  const { user } = useSelector((state) => state.auth);
  const { orderId, orderCreated, paymentMade } = useSelector(
    (state) => state.checkout
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!paymentMade) {
      navigate('/');
    }
    if (!orderCreated) {
      dispatch(createOrder());
    }
    if (orderCreated) {
      user ? dispatch(deleteCart()) : dispatch(guestClearCart());
    }
  }, [orderCreated, paymentMade, navigate, dispatch, user]);
  const handleClick = (type) => {
    dispatch(checkoutReset());
    if (type === 'home') {
      navigate('/');
    } else if (type === 'orders') {
      navigate('/orders');
    }
  };
  return (
    <Container>
      <Text>
        {orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Success. Your order is being prepared...`}
      </Text>
      {orderId && (
        <Btns>
          <Btn onClick={() => handleClick('home')}>Go to Homepage</Btn>
          {user && (
            <BtnAccent onClick={() => handleClick('orders')}>
              View All Your Orders
            </BtnAccent>
          )}
        </Btns>
      )}
    </Container>
  );
};
export default PaySuccess;
