import styled from "styled-components";
import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { mobile } from "../responsive";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin-left: 8px;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  /* text-align: center; */
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: "2", justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

function Navbar({ user }) {
  const quantity = useSelector((state) => state.cart.quantity);
  // console.log(quantity);

  const dispatch = useDispatch();
  const handleLogOutButton = () => {
    logOut(dispatch);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Seacrh" />
            <Search style={{ color: "grey", fontSize: "16px" }} />
          </SearchContainer>
        </Left>

        <Center>
          <NavLink to="/">
            <Logo>M&M</Logo>
          </NavLink>
        </Center>

        <Right>
          {user ? (
            <NavLink to="/login">
              <p onClick={handleLogOutButton}>logOut</p>
            </NavLink>
          ) : (
            <>
              <NavLink to="/register">
                <MenuItem>Register</MenuItem>
              </NavLink>
              <NavLink to="/login">
                <MenuItem>Login</MenuItem>
              </NavLink>
            </>
          )}
          <NavLink to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </NavLink>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
