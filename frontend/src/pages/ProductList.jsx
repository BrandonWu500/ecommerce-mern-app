import styled from 'styled-components';
import Annoucement from '../components/Annoucement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';

const Container = styled.div`
  padding: 2em 8em;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h2`
  margin-bottom: 1em;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
const Sort = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
const Subtitle = styled.h3``;
const Select = styled.select``;
const Option = styled.option``;

const ProductList = () => {
  return (
    <>
      <Annoucement />
      <Navbar />
      <Container>
        <Title>Shirts</Title>
        <Header>
          <Filter>
            <Subtitle>Filter Products:</Subtitle>
            <Select>
              <Option>White</Option>
              <Option>Blue</Option>
              <Option>Red</Option>
            </Select>
            <Select>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
            </Select>
          </Filter>
          <Sort>
            <Subtitle>Sort Products:</Subtitle>
            <Select>
              <Option>Price (ascending)</Option>
              <Option>Price (descending)</Option>
              <Option>Newest</Option>
              <Option>Most Popular</Option>
            </Select>
          </Sort>
        </Header>
        <Products />
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};
export default ProductList;
