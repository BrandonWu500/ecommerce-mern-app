import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(rgba(255 255 255 / 0.5), rgba(255 255 255 / 0.5)),
    url('/images/people/6.jpg');
  background-size: cover;
  background-position: left bottom;
`;
const Title = styled.h1`
  font-weight: 500;
`;
const Form = styled.form`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  background-color: white;
  padding: 2em;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;
`;
const Input = styled.input`
  width: 100%;
  padding: 1em;
`;
const Span = styled.span``;
const Btn = styled.button`
  background-color: var(--bg-clr-primary);
  color: white;
  border: 0;
  padding: 1em;
`;

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };
  return (
    <>
      <Navbar />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>SIGN IN</Title>

          <Input placeholder="Username" required />

          <Input type="password" placeholder="Password" required />

          <Btn type="submit">SIGN IN</Btn>
          <Span>Forgot password?</Span>
          <Link to="/register">
            <Span>
              <strong>Create a new account</strong>
            </Span>
          </Link>
        </Form>
      </Container>
    </>
  );
};
export default Login;
