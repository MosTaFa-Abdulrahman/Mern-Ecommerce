import styled from "styled-components";
import ProductItem from "./ProductItem";
import { popularProducts } from "../data";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 25px;
`;

function Products({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filterdProducts, setFilterdProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        cat
          ? `http://localhost:5000/api/products?category=${cat}`
          : "http://localhost:5000/api/products"
      );
      // console.log(res.data);
      setProducts(res.data);
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilterdProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilterdProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilterdProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else
      setFilterdProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
  }, [sort]);

  return (
    <Container>
      {cat
        ? filterdProducts.map((item) => (
            <ProductItem item={item} key={item.id} />
          ))
        : products.map((item) => <ProductItem item={item} key={item.id} />)}
    </Container>
  );
}

export default Products;

//  setFilterdProducts(
//    products.filter((item) =>
//      Object.entries(filters).every(([key, value]) => item[key].includes(value))
//    )
//  );
