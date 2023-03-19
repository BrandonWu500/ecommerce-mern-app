import styled from 'styled-components';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../redux/auth/authSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { cartReset, getCart } from '../redux/cart/cartSlice';
import axios from 'axios';
import { BASE_URL } from '../requestMethods';
import { mobile } from '../responsive';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled.div`
  padding: 1em 2em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 99;

  ${mobile({ gridTemplateColumns: 'repeat(2, 1fr)', position: 'relative' })}
`;

const MobileNavBtn = styled.button`
  background-color: transparent;
  border: 0;
  display: none;
  ${mobile({ display: 'block' })}
  z-index: 100;
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
  ${mobile({ justifyContent: 'flex-end' })}
  gap: 2em;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1em;
  ${mobile({
    position: 'absolute',
    bottom: '-9rem',
    right: '0',
    transform: (props) =>
      props.navToggle ? 'translateX(0%)' : 'translateX(200%)',
    transition: 'transform 0.5s ease-in-out',
    backgroundColor: 'white',
    zIndex: '9',
  })}
`;
const SelectLang = styled.select`
  ${mobile({ display: 'none' })}
`;
const Option = styled.option``;
const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  position: relative;
`;
const SearchItems = styled.ul`
  position: absolute;
  top: 4rem;
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: white;
  z-index: 2;
`;
const SearchItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  border: 1px solid gray;
  border-bottom: 0;
  padding: 1em;
  cursor: pointer;

  &:last-of-type {
    border-bottom: 1px solid gray;
  }
`;
const SearchItemImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;
const SearchItemText = styled.p``;
const SearchInput = styled.input`
  font-size: 1rem;
  padding: 0.5em;
  ${mobile({ width: '100%' })}
`;
const SearchBtn = styled.button`
  background: transparent;
  border: 0;
`;
const Title = styled.h2``;
const LinkList = styled.ul`
  display: flex;
  align-items: center;
  gap: 2em;
  ${mobile({ flexDirection: 'column', padding: '2em' })}
`;
const LinkItem = styled.li``;
const LinkContent = styled.span`
  cursor: pointer;
`;
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
  const { quantity, isError, message } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [navToggle, setNavToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(cartReset());
    dispatch(logout());
    dispatch(reset());
  };
  useEffect(() => {
    if (isError) {
      /* if jwt expires */
      if (message === 'Request failed with status code 400') {
        dispatch(logout());
        navigate('/login');
      }
      dispatch(cartReset());
    } else {
      dispatch(getCart());
    }
  }, [isError, message, user, dispatch, navigate]);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const res = await axios.post(BASE_URL + '/products/search3', {
      query: e.target.value,
    });
    setSearchResults(res.data);
  };
  const handleSearchClick = () => {
    setSearchResults([]);
    navigate('/search', {
      state: {
        search,
      },
    });
    window.scrollTo(0, 0);
  };

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      setSearchResults([]);
      navigate('/search', {
        state: {
          search,
        },
      });
      window.scrollTo(0, 0);
    }
  };

  const handleSearchLink = (id) => {
    setSearchResults([]);
    setSearch('');
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <Container>
      <Left>
        <SelectLang>
          <Option>EN</Option>
          <Option>ESP</Option>
          <Option>FR</Option>
        </SelectLang>
        <Search>
          <SearchInput
            placeholder="Search"
            onChange={handleSearch}
            value={search}
            onKeyDown={handleSearchEnter}
          />
          <SearchBtn onClick={handleSearchClick}>
            <SearchIcon />
          </SearchBtn>
          <SearchItems>
            {searchResults.map((result) => (
              <SearchItem
                onClick={() => handleSearchLink(result._id)}
                key={result._id}
              >
                <SearchItemImg src={result.img} />
                <SearchItemText>{result.title}</SearchItemText>
              </SearchItem>
            ))}
          </SearchItems>
        </Search>
      </Left>
      <Center>
        <Link to="/">
          <Title>SHOP</Title>
        </Link>
        <MobileNavBtn onClick={() => setNavToggle(!navToggle)}>
          {navToggle ? (
            <CloseIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </MobileNavBtn>
      </Center>
      <Right navToggle={navToggle}>
        <LinkList>
          {!user ? (
            <>
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
            </>
          ) : (
            <>
              <LinkItem>
                <Link to="/orders">
                  <LinkContent>ORDERS</LinkContent>
                </Link>
              </LinkItem>
              <LinkItem onClick={handleLogout}>
                <LinkContent>LOGOUT</LinkContent>
              </LinkItem>
            </>
          )}

          <LinkItem>
            <LinkContent>
              <Link to="/cart">
                <CartWrapper>
                  <ShoppingCartIcon />
                  <CartBadge>{quantity ?? 0}</CartBadge>
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
