import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Btn = styled.button`
  font-size: 1.5rem;
  padding: 1em;
`;

const Span = styled.span``;

const KEY =
  'pk_test_51MILO5Gw1TbTweETpArzklQ8n2rMBvofPoCeVVp9HxCBFONuoT2qwdTEG6WsxZGswYLOQ4MwPNpmJCCxwCVhc4Pa003LPoMH89';

const API_URL = 'http://localhost:5000/api/checkout/payment';

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(API_URL, {
          tokenId: stripeToken.id,
          amount: 2000,
        });
        console.log(res.data);
        navigate('/success');
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);
  return (
    <Container>
      {stripeToken ? (
        <Span>Processing. Please wait...</Span>
      ) : (
        <StripeCheckout
          name="Shop"
          billingAddress
          shippingAddress
          description="Your total is $20"
          amount={2000}
          token={onToken}
          stripeKey={KEY}
        >
          <Btn>Pay Now</Btn>
        </StripeCheckout>
      )}
    </Container>
  );
};
export default Pay;
