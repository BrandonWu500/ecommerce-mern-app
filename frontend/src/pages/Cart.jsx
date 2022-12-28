import Annoucement from '../components/Annoucement';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Footer from '../components/Footer';

const Container = styled.div`
  padding: 1em 4em;
`;
const Header = styled.div`
  margin-bottom: 3em;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 300;
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
const Underline = styled.span`
  text-decoration: underline;
`;
const Grid = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2em;
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
  gap: 0.5em;
`;
const InfoClr = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: green;
  border-radius: 50%;
  border: 1px solid gray;
`;
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
const BtnAccent = styled.button`
  padding: 1em;
  background-color: black;
  color: white;
`;

const Cart = () => {
  return (
    <>
      <Annoucement />
      <Navbar />
      <Container>
        <Header>
          <Title>YOUR CART</Title>
          <Wrapper>
            <Btn>CONTINUE SHOPPING</Btn>
            <Underline>Your Wishlist (0)</Underline>
          </Wrapper>
        </Header>
        <Grid>
          <Products>
            <Product>
              <Image src="/images/products/shoes.png" />
              <Info>
                <InfoLeft>
                  <InfoText>
                    <InfoLabel>Product:</InfoLabel> SHOES
                  </InfoText>
                  <InfoText>
                    <InfoLabel>ID:</InfoLabel> 123
                  </InfoText>
                  <InfoClr></InfoClr>
                  <InfoText>
                    <InfoLabel>Size:</InfoLabel> 10
                  </InfoText>
                </InfoLeft>
                <InfoRight>
                  <InfoText>
                    <InfoLabel>Quantity:</InfoLabel>
                    <InfoInput type="number" defaultValue="2" min="1" />
                  </InfoText>
                  <InfoPrice>$30</InfoPrice>
                </InfoRight>
              </Info>
            </Product>
            <Product>
              <Image src="/images/products/shoes.png" />
              <Info>
                <InfoLeft>
                  <InfoText>
                    <InfoLabel>Product:</InfoLabel> SHOES
                  </InfoText>
                  <InfoText>
                    <InfoLabel>ID:</InfoLabel> 123
                  </InfoText>
                  <InfoClr></InfoClr>
                  <InfoText>
                    <InfoLabel>Size:</InfoLabel> 10
                  </InfoText>
                </InfoLeft>
                <InfoRight>
                  <InfoText>
                    <InfoLabel>Quantity:</InfoLabel>
                    <InfoInput type="number" defaultValue="2" min="1" />
                  </InfoText>
                  <InfoPrice>$30</InfoPrice>
                </InfoRight>
              </Info>
            </Product>
            <Product>
              <Image src="/images/products/shoes.png" />
              <Info>
                <InfoLeft>
                  <InfoText>
                    <InfoLabel>Product:</InfoLabel> SHOES
                  </InfoText>
                  <InfoText>
                    <InfoLabel>ID:</InfoLabel> 123
                  </InfoText>
                  <InfoClr></InfoClr>
                  <InfoText>
                    <InfoLabel>Size:</InfoLabel> 10
                  </InfoText>
                </InfoLeft>
                <InfoRight>
                  <InfoText>
                    <InfoLabel>Quantity:</InfoLabel>
                    <InfoInput type="number" defaultValue="2" min="1" />
                  </InfoText>
                  <InfoPrice>$30</InfoPrice>
                </InfoRight>
              </Info>
            </Product>
          </Products>
          <SummaryWrapper>
            <Summary>
              <Title>ORDER SUMMARY</Title>
              <SummaryText>
                Subtotal <Span>$80</Span>
              </SummaryText>
              <SummaryText>
                Estimated Shipping <Span>$7</Span>
              </SummaryText>
              <SummaryText>
                Discount <Span>- $20</Span>
              </SummaryText>
              <Total>
                Total <Span>$67</Span>
              </Total>
              <BtnAccent>CHECKOUT NOW</BtnAccent>
            </Summary>
          </SummaryWrapper>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};
export default Cart;
