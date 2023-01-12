import styled from 'styled-components';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: relative;
  background-color: var(--bg-clr-light);
  padding: 1em;
`;

const Image = styled.img`
  max-height: 250px;
`;
const ImageWrapper = styled.div`
  background-color: white;
  border-radius: 50%;
  padding: 2em;
  display: grid;
  place-items: center;
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

const Product = ({ item }) => {
  return (
    <Container>
      <ImageWrapper>
        <Image src={item.img} />
      </ImageWrapper>
      <Btns>
        <Btn>
          <ShoppingCartIcon />
        </Btn>
        <Link to={`/product/${item._id}`}>
          <Btn>
            <SearchIcon />
          </Btn>
        </Link>
        <Btn>
          <FavoriteBorderIcon />
        </Btn>
      </Btns>
    </Container>
  );
};
export default Product;
