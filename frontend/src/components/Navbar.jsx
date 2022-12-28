import styled from 'styled-components';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 1em 2em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1em;
`;
const Select = styled.select``;
const Option = styled.option``;
const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;
const SearchInput = styled.input`
  font-size: 1rem;
  padding: 0.5em;
`;
const SearchBtn = styled.button`
  background: transparent;
  border: 0;
`;
const Title = styled.h2``;
const LinkList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1em;
`;
const LinkItem = styled.li``;
const LinkContent = styled.span``;
const CartWrapper = styled.div`
  position: relative;
`;
const CartBadge = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: var(--bg-clr-accent);
  color: white;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
`;

const Navbar = () => {
  return (
    <Container>
      <Left>
        <Select>
          <Option>EN</Option>
          <Option>ESP</Option>
          <Option>FR</Option>
        </Select>
        <Search>
          <SearchInput placeholder="Search" />
          <SearchBtn>
            <SearchIcon />
          </SearchBtn>
        </Search>
      </Left>
      <Center>
        <Link to="/">
          <Title>SHOP</Title>
        </Link>
      </Center>
      <Right>
        <LinkList>
          <LinkItem>
            <Link to="/register">
              <LinkContent>REGISTER</LinkContent>
            </Link>
          </LinkItem>
          <LinkItem>
            <Link to="/login">
              <LinkContent>SIGN IN</LinkContent>
            </Link>
          </LinkItem>
          <LinkItem>
            <LinkContent>
              <Link to="/cart">
                <CartWrapper>
                  <ShoppingCartIcon />
                  <CartBadge>2</CartBadge>
                </CartWrapper>
              </Link>
            </LinkContent>
          </LinkItem>
        </LinkList>
      </Right>
    </Container>
  );
};
export default Navbar;
