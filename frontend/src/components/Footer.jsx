import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4em;
  padding: 2em 4em;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
`;
const Center = styled.div``;
const Right = styled.div``;
const Title = styled.h2`
  margin-bottom: 1em;
`;
const Desc = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1em;
`;
const MediaLinkList = styled.ul`
  display: flex;
  gap: 1em;
`;
const MediaLinkItem = styled.li``;
const MediaLink = styled.span`
  background-color: ${(props) => props.bgColor};
  color: white;
  border-radius: 50%;
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UsefulLinkList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
`;
const UsefulLinkItem = styled.li``;
const UsefulLink = styled.span``;
const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const InfoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Title>SHOP</Title>
        <Desc>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
          voluptates rerum sit ratione illum sapiente officiis perferendis
          libero dignissimos vitae.
        </Desc>
        <MediaLinkList>
          <MediaLinkItem>
            <MediaLink bgColor="royalblue">
              <FacebookIcon />
            </MediaLink>
          </MediaLinkItem>
          <MediaLinkItem>
            <MediaLink bgColor="skyblue">
              <TwitterIcon />
            </MediaLink>
          </MediaLinkItem>
          <MediaLinkItem>
            <MediaLink bgColor="hotpink">
              <InstagramIcon />
            </MediaLink>
          </MediaLinkItem>
        </MediaLinkList>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <UsefulLinkList>
          <UsefulLinkItem>
            <UsefulLink>Home</UsefulLink>
          </UsefulLinkItem>
          <UsefulLinkItem>
            <UsefulLink>Accessories</UsefulLink>
          </UsefulLinkItem>
          <UsefulLinkItem>
            <UsefulLink>Men's Fashion</UsefulLink>
          </UsefulLinkItem>
          <UsefulLinkItem>
            <UsefulLink>Women's Fashion</UsefulLink>
          </UsefulLinkItem>
          <UsefulLinkItem>
            <UsefulLink>Wishlist</UsefulLink>
          </UsefulLinkItem>
          <UsefulLinkItem>
            <UsefulLink>Cart</UsefulLink>
          </UsefulLinkItem>
          <UsefulLinkItem>
            <UsefulLink>My Account</UsefulLink>
          </UsefulLinkItem>
          <UsefulLinkItem>
            <UsefulLink>Terms and Conditions</UsefulLink>
          </UsefulLinkItem>
        </UsefulLinkList>
      </Center>
      <Right>
        <Title>Contact</Title>
        <InfoList>
          <InfoItem>
            <LocationOnIcon />
            123 Shopping Lane, Boston, MA
          </InfoItem>
          <InfoItem>
            <PhoneIcon />
            +1 123 456 7890
          </InfoItem>
          <InfoItem>
            <EmailIcon />
            contact@shop.com
          </InfoItem>
        </InfoList>
      </Right>
    </Container>
  );
};
export default Footer;
