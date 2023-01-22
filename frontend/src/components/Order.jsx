import styled from 'styled-components';
import OrderItem from './OrderItem';

const Container = styled.div``;

const Header = styled.div`
  display: grid;
  background-color: #eee;
  padding: 1em;
  border: 1px solid gray;
`;
const HeaderLabel = styled.div`
  grid-row: 1 / 2;
`;
const HeaderText = styled.div``;
const Content = styled.div``;
const Row = styled.div`
  border: 1px solid gray;
  border-top: 0;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;
const RowTitle = styled.h3`
  margin-bottom: 1em;
  text-transform: capitalize;
`;

const Order = ({ order }) => {
  return (
    <Container>
      <Header>
        <HeaderLabel>Order Placed:</HeaderLabel>
        <HeaderText>
          {new Date(order.createdAt).toLocaleDateString()}
        </HeaderText>
        <HeaderLabel>Total:</HeaderLabel>
        <HeaderText>${order.amount}</HeaderText>
        <HeaderLabel>Order ID:</HeaderLabel>
        <HeaderText>{order._id}</HeaderText>
      </Header>
      <Content>
        <Row>
          <RowTitle>Order Status: {order.status}</RowTitle>
          {order.products.map((item) => (
            <OrderItem key={item._id} item={item} />
          ))}
        </Row>
      </Content>
    </Container>
  );
};
export default Order;
