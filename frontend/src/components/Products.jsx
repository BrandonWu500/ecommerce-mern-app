import styled from 'styled-components';
import { popularProducts } from '../data';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 1em 2em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2em;
`;

const Product = styled.div`
  position: relative;
  background-color: var(--bg-clr-light);
  padding: 1em;
`;

const Image = styled.img``;
const ImageWrapper = styled.div`
  background-color: white;
  border-radius: 50%;
  padding: 2em;
`;
const Btns = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0 0 0 / 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1em;
  opacity: 0;

  &:hover,
  &:focus {
    opacity: 1;
  }
`;
const Btn = styled.button`
  background-color: white;
  border: 0;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Products = () => {
  return (
    <Container>
      {popularProducts.map((item) => (
        <Product>
          <ImageWrapper>
            <Image src={item.img} />
          </ImageWrapper>
          <Btns>
            <Btn>
              <ShoppingCartIcon />
            </Btn>
            <Link to="/product-info">
              <Btn>
                <SearchIcon />
              </Btn>
            </Link>
            <Btn>
              <FavoriteBorderIcon />
            </Btn>
          </Btns>
        </Product>
      ))}
    </Container>
  );
};
export default Products;
