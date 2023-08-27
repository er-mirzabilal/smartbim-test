import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import Title from "../Ui-Components/Title";
import "./product-detail.css";
import TabComponent from "./TabComponent";
const ProductInfo = styled.div`
  display: flex;
  background-color: #f0f0f0;
  padding: 60px;
`;
const ProductImage = styled.img`
  width: 100%;
`;

const ProductDescription = styled.div`
  font-size: 18px;
`;

const ImageBox = styled.div`
  width: 40%;
  height: 100%;
  padding: 0px 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const ProductContent = styled.div`
  width: 60%;
  padding: 0px 20px;
`;

const StyledList = styled.ul`
  padding-left: 20px;
  font-size: 16px;
  margin: 0;
`;
const StyledListItem = styled.li`
  margin-bottom: 5px;
`;
export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductInfo>
        <ImageBox>
          <ProductImage src={product.image} alt="img" />
        </ImageBox>

        <ProductContent>
          <Title color="#ed1c25">Product ID: {product.id}</Title>
          <Title fontSize={34}>{product.name}</Title>
          <Title color="#ed1c25">
            {product.brand} | {product.category}
          </Title>
          <Title className="description">Description:</Title>
          <ProductDescription>{product.description}</ProductDescription>
          <Title className="features">Features:</Title>

          <StyledList>
            {product.features.map((feature, index) => (
              <StyledListItem key={index}>{feature}</StyledListItem>
            ))}
          </StyledList>
        </ProductContent>
      </ProductInfo>
      <TabComponent />
    </div>
  );
}
