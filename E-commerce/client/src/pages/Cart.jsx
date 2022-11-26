import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeProduct } from "../redux/cartRedux";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
const stripePaymentKey =
  "pk_test_51LNo35G2b2rR7T8ZgNtXkYAQ3SdWMwlY9wMMDcn6wRghAB4nMCucWbqEC92XBwpb2JpDiwT7TQBrPWtriMQrL1ol002mQNkCs0";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 300px;
  height: 250px;
  object-fit: cover;
  margin-bottom: 20px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  ${mobile({ width: "100%" })}
`;

const Button = styled.button`
  padding: 15px;
  border: 3px solid teal;
  background: white;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    color: white;
    background: red;
  }
`;
const ButtonClear = styled.button`
  padding: 15px;
  border: 3px solid teal;
  background: white;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;

  &:hover {
    color: white;
    background: red;
  }
`;

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeProductCart = (product) => {
    dispatch(removeProduct(product));
  };

  const clearCartProducts = () => {
    dispatch(clearCart());
  };

  // Payment Method //
  const [stripeToken, setStripeToken] = useState(null);
  const payy = cart.total;
  const payyy = cart.total * 100;

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios({
          url: "http://localhost:5000/api/checkout/payment",
          method: "post",
          data: {
            amount: payyy,
            tokenId: stripeToken.id,
          },
        });

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, payy]);

  return (
    <Container>
      <Navbar />
      <Announcement />

      <Wrapper>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product.id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductName>
                      <b>Title:</b> {product.title}
                    </ProductName>
                    <ProductName>
                      <b>Price:</b> {product.price} $
                    </ProductName>
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                    <ProductColor color={product.color} />
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount>Quantity: {product.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <AddContainer>
                    <Button onClick={() => removeProductCart(product)}>
                      Remove
                    </Button>
                  </AddContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <ButtonClear onClick={() => clearCartProducts()}>
              Clear Cart
            </ButtonClear>
            <Hr />
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>SubTotal</SummaryItemText>
              <SummaryItemPrice>{cart.total} $</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText type="total">Total</SummaryItemText>
              <SummaryItemPrice>{cart.total} $</SummaryItemPrice>
            </SummaryItem>
            <SummaryButton>
              {stripeToken ? (
                <h2 onClick={clearCartProducts}>OK</h2>
              ) : (
                <StripeCheckout
                  name="Darsh Shop"
                  image="https://firebasestorage.googleapis.com/v0/b/shop-2e7f2.appspot.com/o/1660559581386React_(web_framework)-Logo.wine.png?alt=media&token=b163a0a0-8e7c-43a2-b581-8b3cde1a8e34"
                  billingAddress
                  shippingAddress
                  currency="USD"
                  description={` Your total is ${payy} $`}
                  amount={payyy}
                  token={onToken}
                  stripeKey={stripePaymentKey}
                ></StripeCheckout>
              )}
            </SummaryButton>
          </Summary>
        </Bottom>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default Cart;
