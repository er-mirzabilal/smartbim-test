import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../Ui-Components/Title";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Ui-Components/Button";
import AddProductPopup from "./AddProductPopup";
import { deleteProduct, getProducts } from "../api/productApi";
import {
  fetchProducts,
  removeProduct,
  setProducts,
} from "../Redux/productSlice";

const ProductBox = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
`;

const Styledproduct = styled.div`
  border: 1px solid black;
  width: 350px;
  height: 470px;
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
`;
const ProductImage = styled.img`
  width: 100%;
  height: auto;
  transition: transform 0.8s ease;
  overflow: hidden;
  ${Styledproduct}:hover & {
    transform: scale(1.1);
  }
`;

const ProductContent = styled.div`
  border-top: 1px solid gray;
  padding: 10px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  padding: 20px;
`;

const ProductCategory = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
`;
export default function Products() {
  const dispatch = useDispatch();
  const { data: products, loading } = useSelector((state) => state.products);

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading....</div>;
  }

  const handleButtonClick = () => {
    setIsPopupOpen(true); // Open the popup when the button is clicked
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const handleDelete = async (productId, event) => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      try {
        dispatch(removeProduct(productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div>
      <ButtonBox>
        <Button onClick={handleButtonClick}>Add New Product</Button>
      </ButtonBox>
      <ProductBox>
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            {" "}
            <Styledproduct key={product.id}>
              <div className="product">
                <ProductImage
                  src={process.env.REACT_APP_BACKEND_URL + "/" + product.image}
                  alt="img"
                />
              </div>
              <ProductContent>
                <Title>{product.name}</Title>
                <ProductCategory>
                  {product.category}{" "}
                  <Button
                    danger="true"
                    onClick={(event) => handleDelete(product.id, event)}
                  >
                    Delete
                  </Button>
                </ProductCategory>
              </ProductContent>
            </Styledproduct>
          </Link>
        ))}
      </ProductBox>

      <AddProductPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
}
