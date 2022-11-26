import styled from "styled-components";

const Container = styled.h1`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: italic;
  color: red;
  background-color: #b0c4de;
`;

function CategoriesHeader() {
  return <Container>Categories</Container>;
}

export default CategoriesHeader;
