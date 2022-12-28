import styled from 'styled-components';
import { categories } from '../data';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 1em 4em;
  align-items: center;
  gap: 2em;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: 25% 50%;
  height: 70vh;
`;

const Title = styled.h2`
  color: white;
  text-shadow: 0 0 10px rgba(0 0 0 / 0.8);
`;
const Btn = styled.button`
  background-color: white;
  box-shadow: 0 0 10px rgba(0 0 0 / 0.8);
  border: 0;
  padding: 0.5em 1em;
  font-weight: 500;
  color: gray;
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <Category key={item.id} bg={item.img}>
          <Title>{item.title}</Title>
          <Link to="/products">
            <Btn>SHOP NOW</Btn>
          </Link>
        </Category>
      ))}
    </Container>
  );
};
export default Categories;
