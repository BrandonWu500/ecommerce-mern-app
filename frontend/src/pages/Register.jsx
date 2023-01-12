import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { register, reset } from '../redux/auth/authSlice';

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
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess || user) {
      navigate('/');
    }
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        username,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>CREATE AN ACCOUNT</Title>
          <Row>
            <Input
              placeholder="Username"
              required
              name="username"
              value={username}
              onChange={handleChange}
            />
            <Input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <Input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              required
              name="password2"
              value={password2}
              onChange={handleChange}
            />
          </Row>
          <Span>
            By creating an account, I consent to the proccessing of my personal
            data in accordance with the <strong>Privacy Policy</strong>
          </Span>
          <Link to="/login">
            <strong>Already have an account? Sign in</strong>
          </Link>
          {isLoading ? (
            <Btn disabled={true}>Loading...</Btn>
          ) : (
            <Btn type="submit">SIGN UP</Btn>
          )}
        </Form>
      </Container>
    </>
  );
};
export default Register;
