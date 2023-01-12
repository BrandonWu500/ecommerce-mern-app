import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Annoucement from '../components/Annoucement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Order from '../components/Order';
import { BASE_URL } from '../requestMethods';

const Container = styled.div`
  padding: 1em 4em;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 300;
  margin-bottom: 1em;
`;
const Grid = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;
const Empty = styled.div`
  min-height: 30vh;
  display: grid;
  place-items: center;
`;
const BtnAccent = styled.button`
  padding: 1em;
  background-color: black;
  color: white;
`;

const Orders = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(BASE_URL + `/orders/${user._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    user && getOrders();
  }, [user]);
  return (
    <>
      <Annoucement />
      <Navbar />
      <Container>
        {orders.length > 0 ? (
          <>
            <Title>YOUR ORDERS</Title>
            <Grid>
              {orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <Order key={order._id} order={order} />
                ))}
            </Grid>
          </>
        ) : (
          <>
            <Empty>
              <Title>No orders yet.</Title>
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
export default Orders;
