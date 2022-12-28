import styled from 'styled-components';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  padding: 4em 0;
  background-color: peachpuff;
`;
const Title = styled.h1`
  font-size: 4rem;
`;
const Subtitle = styled.p``;
const Wrapper = styled.div`
  display: flex;
  border: 2px solid #ccc;
`;
const Input = styled.input`
  border: 0;
  font-size: 1rem;
  padding: 0.5em;
`;
const Btn = styled.button`
  border: 0;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Subtitle>Get timely updates from your favorite products.</Subtitle>
      <Wrapper>
        <Input placeholder="Your email..."></Input>
        <Btn>
          <ArrowCircleRightIcon />
        </Btn>
      </Wrapper>
    </Container>
  );
};
export default Newsletter;
