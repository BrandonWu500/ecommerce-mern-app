import Annoucement from '../components/Annoucement';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import {
  deleteCart,
  guestClearCart,
  guestRemoveFromCart,
  guestUpdateCart,
  removeFromCart,
  updateCart,
} from '../redux/cart/cartSlice';
import { makePayment } from '../redux/checkout/checkoutSlice';
import { mobile } from '../responsive';

const Container = styled.div`
  padding: 1em 4em;
`;
const Empty = styled.div`
  min-height: 50vh;
  display: grid;
  place-items: center;
`;
const Header = styled.div`
  margin-bottom: 3em;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 300;
  margin-bottom: 1em;
`;
const Wrapper = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
`;
const Btn = styled.button`
  border: 1px solid black;
  background-color: white;
  color: black;
  padding: 0.5em;
`;
const Grid = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2em;
  ${mobile({ display: 'flex', flexDirection: 'column' })}
`;
const Products = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 2em 0;
`;
const Product = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid gray;
  padding-bottom: 2em;
  ${mobile({ gap: '2em' })}
`;
const Image = styled.img`
  width: 150px;
  object-fit: contain;
`;
const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column: 2 / 4;
  padding-right: 5em;
`;
const InfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const InfoRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
`;
const InfoInput = styled.input`
  width: 3rem;
`;
const InfoText = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5em;
  text-transform: capitalize;
`;
const InfoClr = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  border: 1px solid gray;
`;
const InfoId = styled.small``;
const InfoLabel = styled.span``;
const InfoPrice = styled.p`
  font-size: 1.5rem;
`;
const SummaryWrapper = styled.div``;
const Summary = styled.div`
  border: 1px solid black;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 2em;
  max-width: 300px;
  margin: 0 auto;
`;
const SummaryText = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Span = styled.span``;
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.5rem;
`;
const StripeWrapper = styled.div`
  align-self: center;
`;
const BtnAccent = styled.button`
  padding: 1em;
  background-color: black;
  color: white;
`;
const RemoveBtn = styled.button`
  background-color: crimson;
  color: white;
  border: 0;
  padding: 0.5em;
`;

const KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [stripeToken, setStripeToken] = useState(null);
  const { isError, message, isSuccess, paymentMade } = useSelector(
    (state) => state.checkout
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess && paymentMade) {
      navigate('/payment-success');
    }

    if (stripeToken && !paymentMade) {
      user
        ? dispatch(makePayment({ userId: user._id, stripeToken, cart }))
        : dispatch(makePayment({ userId: 'guest', stripeToken, cart }));
    }

    /* return () => {
      dispatch(checkoutReset());
    }; */
  }, [
    stripeToken,
    isError,
    message,
    user,
    cart,
    isSuccess,
    paymentMade,
    dispatch,
    navigate,
  ]);

  const handleQuantity = (e, itemId) => {
    const quantity = e.target.value;
    user
      ? dispatch(updateCart({ itemId, newQuantity: parseInt(quantity) }))
      : dispatch(guestUpdateCart({ itemId, newQuantity: parseInt(quantity) }));
  };

  const handleRemove = (itemId) => {
    user
      ? dispatch(removeFromCart(itemId))
      : dispatch(guestRemoveFromCart(itemId));
  };
  return (
    <>
      <Annoucement />
      <Navbar />
      <Container>
        {cart.products && cart.products.length > 0 ? (
          <>
            <Header>
              <Title>YOUR CART</Title>
              <Wrapper>
                <Link to="/">
                  <Btn>CONTINUE SHOPPING</Btn>
                </Link>
                <RemoveBtn
                  onClick={() =>
                    user ? dispatch(deleteCart()) : dispatch(guestClearCart())
                  }
                >
                  CLEAR CART
                </RemoveBtn>
              </Wrapper>
            </Header>

            <Grid>
              <Products>
                {cart.products.map((product) => (
                  <Product key={product._id + product?.color + product?.size}>
                    <Link to={`/product/${product._id}`}>
                      <Image src={product.img} />
                    </Link>
                    <Info>
                      <InfoLeft>
                        <InfoText>
                          <Link to={`/product/${product._id}`}>
                            <InfoLabel>Product:</InfoLabel> {product.title}
                          </Link>
                        </InfoText>
                        <InfoText>
                          <InfoId>
                            <InfoLabel>ID:</InfoLabel> {product._id}
                          </InfoId>
                        </InfoText>
                        <InfoText>
                          <InfoLabel>Color: </InfoLabel>
                          <InfoClr color={product.color}></InfoClr>
                        </InfoText>
                        <InfoText>
                          <InfoLabel>Size:</InfoLabel> {product.size}
                        </InfoText>
                      </InfoLeft>
                      <InfoRight>
                        <InfoText>
                          <InfoLabel>Quantity:</InfoLabel>
                          <InfoInput
                            type="number"
                            value={product.quantity}
                            min="1"
                            onChange={(e) => handleQuantity(e, product._id)}
                          />
                        </InfoText>
                        <InfoPrice>
                          ${product.quantity * product.price}
                        </InfoPrice>
                        <RemoveBtn onClick={() => handleRemove(product._id)}>
                          REMOVE
                        </RemoveBtn>
                      </InfoRight>
                    </Info>
                  </Product>
                ))}
              </Products>
              <SummaryWrapper>
                <Summary>
                  <Title>ORDER SUMMARY</Title>
                  <SummaryText>
                    Subtotal <Span>${cart.totalPrice}</Span>
                  </SummaryText>
                  <SummaryText>
                    Estimated Shipping <Span>$7</Span>
                  </SummaryText>
                  <SummaryText>
                    Discount <Span>- $7</Span>
                  </SummaryText>
                  <Total>
                    Total <Span>${cart.totalPrice}</Span>
                  </Total>
                  <StripeWrapper>
                    <StripeCheckout
                      name="SHOP"
                      billingAddress
                      shippingAddress
                      description={`Your total is $${cart.totalPrice}`}
                      amount={cart.totalPrice * 100}
                      token={onToken}
                      stripeKey={KEY}
                    >
                      <BtnAccent>CHECKOUT NOW</BtnAccent>
                    </StripeCheckout>
                  </StripeWrapper>
                </Summary>
              </SummaryWrapper>
            </Grid>
          </>
        ) : (
          <>
            <Empty>
              <Title>Your cart is empty.</Title>
              <Link to="/">
                <BtnAccent>START SHOPPING</BtnAccent>
              </Link>
            </Empty>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};
export default Cart;
