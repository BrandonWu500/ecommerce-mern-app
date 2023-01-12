import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { login, reset } from '../redux/auth/authSlice';

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
  &:disabled {
    cursor: not-allowed;
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };
  return (
    <>
      <Navbar />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>SIGN IN</Title>

          <Input
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {isLoading ? (
            <Btn disabled={true}>Loading...</Btn>
          ) : (
            <Btn type="submit">SIGN IN</Btn>
          )}
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
