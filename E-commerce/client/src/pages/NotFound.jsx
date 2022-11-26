import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  font-size: 40px;
  font-weight: 600;
  background-color: white;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NotFound() {
  return <Container>404 NotFound !!!</Container>;
}

export default NotFound;
