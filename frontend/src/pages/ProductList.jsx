import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Annoucement from '../components/Annoucement';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';

const Container = styled.div`
  padding: 2em 8em;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
`;
const Title = styled.h2`
  margin-bottom: 1em;
  text-transform: capitalize;
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
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');

  const handleFilters = (e) => {
    let val = e.target.value;
    if (e.target.name === 'color') {
      // color values are stored lowercase in db
      val = val.toLowerCase();
    }
    if (val === 'all' || val === 'All') {
      // clears filter for the respective key
      if (e.target.name === 'color') {
        setFilters((prev) => {
          const { color, ...rest } = prev;
          return rest;
        });
      } else if (e.target.name === 'size') {
        setFilters((prev) => {
          const { size, ...rest } = prev;
          return rest;
        });
      }
    } else {
      setFilters({
        ...filters,
        [e.target.name]: val,
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Annoucement />
      <Navbar />
      <Container>
        <Title>{cat}</Title>
        <Header>
          <Filter>
            <Subtitle>Filter Products:</Subtitle>
            <Select name="color" onChange={handleFilters} defaultValue="Color">
              <Option disabled>Color</Option>
              <Option>All</Option>
              <Option>White</Option>
              <Option>Blue</Option>
              <Option>Red</Option>
              <Option>Black</Option>
              <Option>Brown</Option>
              <Option>Green</Option>
            </Select>
            <Select name="size" onChange={handleFilters} defaultValue="Size">
              <Option disabled>Size</Option>
              <Option>All</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
            </Select>
          </Filter>
          <Sort>
            <Subtitle>Sort Products:</Subtitle>
            <Select
              name="sort"
              onChange={(e) => setSort(e.target.value)}
              defaultValue="newest"
            >
              <Option value="newest">Newest</Option>
              <Option value="asc">Price (ascending)</Option>
              <Option value="desc">Price (descending)</Option>
            </Select>
          </Sort>
        </Header>
        <Products cat={cat} filters={filters} sort={sort} />
      </Container>
      <Categories />
      <Footer />
    </>
  );
};
export default ProductList;
