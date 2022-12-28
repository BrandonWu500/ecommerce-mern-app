import Annoucement from '../components/Annoucement';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 2em 0;
`;
const Left = styled.div`
  display: flex;
  justify-content: center;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;
const Image = styled.img`
  width: 60%;
`;
const Title = styled.h1``;
const Desc = styled.p`
  max-width: 40ch;
`;
const Price = styled.h2``;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4em;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
const Label = styled.span``;
const Btns = styled.div`
  display: flex;
  gap: 0.5em;
`;
const Btn = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid gray;
`;
const Select = styled.select``;
const Option = styled.option``;
const Quantity = styled.div`
  display: flex;
  gap: 1em;
`;
const QuantityBtn = styled.button``;
const QuantityText = styled.span``;
const AddCartBtn = styled.button`
  align-self: flex-start;
  color: white;
  background-color: teal;
  border: 0;
  padding: 0.5em;
  border-radius: 5px;
`;

const ProductInfo = () => {
  return (
    <>
      <Annoucement />
      <Navbar />
      <Container>
        <Left>
          <Image src="/images/products/shirt.png" />
        </Left>
        <Right>
          <Title>T-shirt</Title>
          <Desc>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat,
            veritatis!
          </Desc>
          <Price>$20</Price>
          <Row>
            <Wrapper>
              <Label>Color</Label>
              <Btns>
                <Btn color="white"></Btn>
                <Btn color="blue"></Btn>
                <Btn color="red"></Btn>
              </Btns>
            </Wrapper>
            <Wrapper>
              <Label>Size</Label>
              <Select>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
              </Select>
            </Wrapper>
          </Row>
          <Quantity>
            <QuantityBtn>-</QuantityBtn>
            <QuantityText>1</QuantityText>
            <QuantityBtn>+</QuantityBtn>
          </Quantity>
          <AddCartBtn>ADD TO CART</AddCartBtn>
        </Right>
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};
export default ProductInfo;
