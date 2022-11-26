import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: orange;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;

function Announcement() {
  return <Container>Super Free Deal Shopping on Orders Over 130 $</Container>;
}

export default Announcement;
