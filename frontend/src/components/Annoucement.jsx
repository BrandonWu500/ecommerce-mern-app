import styled from 'styled-components';

const Container = styled.div`
  background-color: var(--bg-clr-primary);
  color: white;
  padding: 0.5em 1em;
  text-align: center;
`;

const Annoucement = () => {
  return <Container>Super Deal! Free shipping on orders over $50</Container>;
};
export default Annoucement;
