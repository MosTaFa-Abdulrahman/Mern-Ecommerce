import "./app.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const userAdmin = useSelector((state) => state.user.currentUser?.isAdmin);
  // console.log(userAdmin); // true when i logedin as Admin

  return (
    <BrowserRouter>
      <Topbar />

      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/users"
            element={userAdmin ? <UserList /> : <Navigate to="/login" />}
          />
          <Route
            path="/user/:id"
            element={userAdmin ? <User /> : <Navigate to="/login" />}
          />
          <Route path="/newUser" element={<NewUser />} />
          <Route
            path="/products"
            element={userAdmin ? <ProductList /> : <Navigate to="/login" />}
          />
          <Route
            path="/product/:productId"
            element={userAdmin ? <Product /> : <Navigate to="/login" />}
          />
          <Route path="/newProduct" element={<NewProduct />} />

          <Route
            path="/login"
            element={userAdmin ? <Navigate to="/" /> : <Login />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
