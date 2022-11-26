import styled from "styled-components";

const Container = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: italic;
  color: brown;
  background-color: #fafad2;
  height: 60px;
`;

function ProductsHeader() {
  return <Container>Products</Container>;
}

export default ProductsHeader;
