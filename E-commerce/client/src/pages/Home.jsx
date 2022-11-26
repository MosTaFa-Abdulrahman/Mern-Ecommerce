import { useSelector } from "react-redux";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import CategoriesHeader from "../components/CategoriesHeader";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Products from "../components/Products";
import ProductsHeader from "../components/ProductsHeader";
import Slider from "../components/Slider";

function Home() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Announcement />
      <Navbar user={user} />
      <Slider />
      <CategoriesHeader />
      <Categories />
      <ProductsHeader />
      <Products />
      <NewsLetter />
      <Footer />
    </>
  );
}

export default Home;
