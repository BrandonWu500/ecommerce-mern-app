import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';

const Container = styled.div`
  padding: 1em 2em;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 400px));
  gap: 2em;
`;

const Title = styled.h2`
  margin: 2em 0;
  text-align: center;
`;

const API_URL = '/api/products';

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterUsed, setFilterUsed] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat ? API_URL + `?category=${cat}` : API_URL
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (cat) {
      const filtered = products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].map((obj) => obj.info).includes(value)
        )
      );
      setFilterUsed(true);
      setFilteredProducts(filtered);
    }
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === 'newest') {
      if (!filterUsed) {
        setFilteredProducts(
          products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } else {
        setFilteredProducts((prev) =>
          [...prev].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      }
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === 'desc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort, products, filteredProducts.length, filterUsed]);
  return (
    <Container>
      {filteredProducts.length === 0 && filterUsed && (
        <Title>NO PRODUCTS FOUND</Title>
      )}
      {cat
        ? filteredProducts.map((item) => <Product key={item._id} item={item} />)
        : products
            .slice(0, 8)
            .map((item) => <Product key={item._id} item={item} />)}
    </Container>
  );
};
export default Products;
