import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { register } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: wheat;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

// not do flex-wrap:wrap; only insideElements have width
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 5px;
  padding: 10px;
`;
// not do flex-wrap:wrap; only insideElements have width

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let history = useNavigate();

  const handleRegisterButton = (e) => {
    e.preventDefault();
    register(dispatch, { username, email, password });

    history("/login");
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREAT AN ACCOUNT</Title>
        <Form>
          <Input
            required
            type="text"
            placeholder="username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            required
            type="text"
            placeholder="email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            type="password"
            placeholder="password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <Agreement>
            By creating an account, I con.sent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegisterButton}>CREATE </Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;
