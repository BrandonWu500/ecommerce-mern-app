import styled from 'styled-components';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { sliderItems } from '../data';
import { useEffect, useRef, useState } from 'react';

const Container = styled.div`
  position: relative;
  height: 70vh;
  overflow: hidden;
`;
const Slides = styled.ul`
  position: relative;
  height: 100%;
  transform: translateX(${(props) => props.slideIdx * -100}vw);
  transition: transform 1.5s ease-in-out;
`;
const Slide = styled.li`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => (props.id - 1) * 100}vw;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: ${(props) => props.bgColor};
  color: white;
`;
const Left = styled.div``;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  padding: 0 2em;
`;
const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
`;
const Title = styled.h1``;
const Subtitle = styled.p`
  max-width: 40ch;
`;
const MoreBtn = styled.button`
  align-self: start;
  color: inherit;
  border: 2px solid white;
  padding: 0.5em;
  background-color: transparent;
  margin-top: 2em;
`;
const ArrowBtn = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 3rem;
  height: 3rem;
  background-color: white;
  border: 0;
  border-radius: 50%;
  color: black;
  opacity: 0.5;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus {
    opacity: 1;
  }
`;
const SliderDots = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  margin: auto;
  width: fit-content;
  background-color: rgba(255 255 255 / 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2em;
  padding: 1em;
  border-radius: 100vh;
`;
const Dot = styled.button`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? 'rgba(0 0 0 / 0.8)' : 'rgba(0 0 0 / 0.3)'};
  border: 0;
`;

const Slider = () => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleArrowClick = (direction) => {
    setClicked(true);
    changeSlide(direction);
  };

  const handleDotClick = (idx) => {
    setClicked(true);
    setSlideIdx(idx);
  };

  const changeSlide = (direction) => {
    if (direction === 'left') {
      setSlideIdx(slideIdx <= 0 ? sliderItems.length - 1 : slideIdx - 1);
    } else {
      setSlideIdx(slideIdx >= sliderItems.length - 1 ? 0 : slideIdx + 1);
    }
  };

  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = () => changeSlide('right');
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    let interval;

    if (!clicked) {
      interval = setInterval(play, 8000);
      return () => clearInterval(interval);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [clicked]);

  return (
    <Container>
      <Slides slideIdx={slideIdx}>
        {sliderItems.map((item) => (
          <Slide bgColor={item.bgColor} key={item.id} id={item.id}>
            <Left>
              <Image src={item.imgUrl} alt={item.name} />
            </Left>
            <Right>
              <Title>{item.title}</Title>
              <Subtitle>{item.subtitle}</Subtitle>
              <MoreBtn>LEARN MORE</MoreBtn>
            </Right>
          </Slide>
        ))}
      </Slides>
      <ArrowBtn
        style={{ left: '1rem' }}
        onClick={() => handleArrowClick('left')}
      >
        <ArrowLeftIcon fontSize="inherit" />
      </ArrowBtn>
      <ArrowBtn
        style={{ right: '1rem' }}
        onClick={() => handleArrowClick('right')}
      >
        <ArrowRightIcon fontSize="inherit" />
      </ArrowBtn>
      <SliderDots>
        {sliderItems.map((item) => (
          <Dot
            key={item.id}
            active={slideIdx === item.id - 1}
            onClick={() => handleDotClick(item.id - 1)}
          ></Dot>
        ))}
      </SliderDots>
    </Container>
  );
};
export default Slider;
