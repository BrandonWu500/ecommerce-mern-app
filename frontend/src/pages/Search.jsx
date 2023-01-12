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
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;
const SearchResults = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2em;
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

const Search = () => {
  const location = useLocation();
  const search = location.state.search;
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const makeSearch = async () => {
      try {
        const res = await axios.post(BASE_URL + '/products/search', {
          query: search,
        });
        setSearchResults(res.data);
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
        <SearchResults>
          {searchResults.map((result) => (
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
