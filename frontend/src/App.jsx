import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import { useDispatch } from "react-redux";
import { setProducts } from "./Redux/productSlice";
import axios from "axios";
import { useEffect } from "react";
import ProductDetail from "./Pages/ProductDetail";
import "./global.css";
import Header from "./Pages/header";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products`)
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
