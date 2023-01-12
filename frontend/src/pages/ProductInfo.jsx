import Annoucement from '../components/Annoucement';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { publicRequest } from '../requestMethods';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, guestAddToCart } from '../redux/cart/cartSlice';
import { mobile } from '../responsive';
import { toast } from 'react-toastify';

const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 2em 0;
`;
const Left = styled.div`
  display: flex;
  justify-content: center;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  ${mobile({ paddingLeft: '2em' })}
`;
const Image = styled.img`
  width: 60%;
  height: 60vh;
  object-fit: cover;
  ${mobile({ height: '30vh', width: '80%' })}
`;
const Title = styled.h1`
  text-transform: capitalize;
`;
const Desc = styled.p`
  max-width: 40ch;
  ${mobile({ maxWidth: '20ch', lineHeight: '2' })}
`;
const Price = styled.h2``;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4em;

  ${mobile({ flexDirection: 'column', gap: '2em', alignItems: 'flex-start' })}
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
const Label = styled.span``;
const Btns = styled.div`
  display: flex;
  gap: 0.5em;
`;
const Btn = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.active ? '3px solid var(--bg-clr-primary)' : '1px solid gray'};
  transform: ${(props) => props.active && 'scale(1.2)'};
`;
const Select = styled.select``;
const Option = styled.option``;
const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
const QuantityBtn = styled.button``;
const QuantityText = styled.span``;
const AddCartBtn = styled.button`
  align-self: flex-start;
  color: white;
  background-color: teal;
  border: 0;
  padding: 0.5em;
  border-radius: 5px;
`;

const ProductInfo = ({ item }) => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get('/products/' + id);
        setProduct(res.data);
        const selectedColor = res.data.color.find((c) => c.itemId === id);
        const selectedSize = res.data.size.find((s) => s.itemId === id);
        setColor(selectedColor?.info);
        setSize(selectedSize?.info);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);
  const handleQuantity = (type) => {
    if (type === 'inc') {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };
  const handleClick = () => {
    if (user) {
      dispatch(addToCart({ ...product, quantity, color, size }));
    } else {
      dispatch(guestAddToCart({ ...product, quantity, color, size }));
    }
    toast.success(`${product.title} added to cart`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Annoucement />
      <Navbar />
      <Container>
        <Left>
          <Image src={product.img} />
        </Left>
        <Right>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>${product.price}</Price>
          <Row>
            <Wrapper>
              <Label>Color</Label>
              <Btns>
                {product.color?.map((c) => (
                  <Btn
                    active={c.info === color}
                    color={c.info}
                    key={c.info}
                    onClick={() => {
                      setColor(c.info);
                      navigate(`/product/${c.itemId}`);
                    }}
                  ></Btn>
                ))}
              </Btns>
            </Wrapper>
            <Wrapper>
              <Label>Size</Label>
              <Select
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
                {product.size?.map((s) => (
                  <Option key={s.info} value={s.info}>
                    {s.info}
                  </Option>
                ))}
              </Select>
            </Wrapper>
          </Row>
          <Quantity>
            <QuantityBtn onClick={() => handleQuantity('dec')}>-</QuantityBtn>
            <QuantityText>{quantity}</QuantityText>
            <QuantityBtn onClick={() => handleQuantity('inc')}>+</QuantityBtn>
          </Quantity>
          <AddCartBtn onClick={handleClick}>ADD TO CART</AddCartBtn>
        </Right>
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};
export default ProductInfo;
