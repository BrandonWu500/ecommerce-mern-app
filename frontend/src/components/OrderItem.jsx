import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div``;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  ${mobile({ gridTemplateColumns: 'repeat(2,1fr)', gap: '3em' })}
`;
const ItemImg = styled.img`
  width: 150px;
  max-height: 250px;
  object-fit: cover;
`;
const ItemTitle = styled.h4`
  font-weight: 500;
  font-size: 1.2rem;
  text-transform: capitalize;
`;
const ItemInfo = styled.p`
  text-transform: capitalize;
`;

const OrderItem = ({ item }) => {
  return (
    <Container>
      <Item>
        <Link to={`/product/${item._id}`}>
          <ItemImg src={item.img} />
        </Link>
        <Col>
          <Link to={`/product/${item._id}`}>
            <ItemTitle>{item.title}</ItemTitle>
          </Link>
          <ItemInfo>Quantity: {item.quantity}</ItemInfo>
          {item.color && <ItemInfo>Color: {item.color}</ItemInfo>}
          {item.size && <ItemInfo>Size: {item.size}</ItemInfo>}
        </Col>
      </Item>
    </Container>
  );
};
export default OrderItem;
