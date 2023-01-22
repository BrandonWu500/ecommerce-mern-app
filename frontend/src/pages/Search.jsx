import { Link, useLocation } from 'react-router-dom';
import Annoucement from '../components/Annoucement';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../requestMethods';
import Categories from '../components/Categories';

const Container = styled.div`
  margin: 0 auto;
  padding: 2em 4em;
`;
const SearchResults = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 4em;
  border-bottom: 1px solid gray;
  padding-bottom: 4em;
`;
const SearchResult = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;
const Img = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;
const Title = styled.h2`
  text-transform: capitalize;
`;
const Price = styled.p`
  font-size: 1.2rem;
`;
const Span = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Search = () => {
  const location = useLocation();
  const search = location.state.search;
  const [searchResults, setSearchResults] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  useEffect(() => {
    const makeSearch = async () => {
      try {
        const res = await axios.post(BASE_URL + '/products/search', {
          query: search,
        });
        setSearchResults(res.data);
        setSearchDone(true);
      } catch (error) {
        console.log(error);
      }
    };
    search && makeSearch();
  }, [search]);
  return (
    <>
      <Annoucement />
      <Navbar />
      <Container>
        <Center>
          <Span>
            {searchDone && searchResults.length === 0 && 'No Products Found'}
          </Span>
          <Span>
            {!searchDone && searchResults.length === 0 && 'Loading...'}
          </Span>
        </Center>
        <SearchResults>
          {searchResults.length > 0 &&
            searchResults.map((result) => (
              <Link to={`/product/${result._id}`} key={result._id}>
                <SearchResult>
                  <Img src={result.img} />
                  <Title>{result.title}</Title>
                  <Price>${result.price}</Price>
                </SearchResult>
              </Link>
            ))}
        </SearchResults>
      </Container>
      <Categories />
      <Footer />
    </>
  );
};
export default Search;
