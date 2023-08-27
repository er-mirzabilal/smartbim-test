import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import "./global.css";
import Header from "./Pages/header";
import ProductDetail from "./Pages/ProductDetail";
import ConfigurationProvider from "./providers/ConfigurationProvider";
function App() {


  return (
    <Router>
        <ConfigurationProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
        </ConfigurationProvider>
    </Router>
  );
}

export default App;
