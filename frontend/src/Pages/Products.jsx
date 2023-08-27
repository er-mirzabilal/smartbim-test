import React, { useState } from "react";
import styled from "styled-components";
import Title from "../Ui-Components/Title";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Ui-Components/Button";
import AddProductPopup from "./AddProductPopup";

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
const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;
export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  if (products.length === 0) {
    return <div>Loading....</div>;
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup

  const handleButtonClick = () => {
    setIsPopupOpen(true); // Open the popup when the button is clicked
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const handleDelete = (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      dispatch({ type: "DELETE_PRODUCT", payload: productId }); // Dispatch the delete action
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
                <ProductImage src={product.image} alt="img" />
              </div>
              <ProductContent>
                <Title>{product.name}</Title>
                <p>{product.category}</p>
                <DeleteButton onClick={() => handleDelete(product.id)}>
                  Delete
                </DeleteButton>
              </ProductContent>
            </Styledproduct>
          </Link>
        ))}
      </ProductBox>

      <AddProductPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
}
