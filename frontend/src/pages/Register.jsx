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
    url('/images/people/7.jpg');
  background-size: cover;
  background-position: left;
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

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };
  return (
    <>
      <Navbar />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>CREATE AN ACCOUNT</Title>
          <Row>
            <Input placeholder="First Name" required />
            <Input placeholder="Last Name" required />
          </Row>
          <Row>
            <Input placeholder="Username" required />
            <Input type="email" placeholder="Email" required />
          </Row>
          <Row>
            <Input type="password" placeholder="Password" required />
            <Input type="password" placeholder="Confirm Password" required />
          </Row>
          <Span>
            By creating an account, I consent to the proccessing of my personal
            data in accordance with the <strong>Privacy Policy</strong>
          </Span>
          <Link to="/login">
            <strong>Already have an account? Sign in</strong>
          </Link>
          <Btn type="submit">SIGN UP</Btn>
        </Form>
      </Container>
    </>
  );
};
export default Register;
