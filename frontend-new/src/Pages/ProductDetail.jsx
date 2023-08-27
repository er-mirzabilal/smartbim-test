import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import Title from "../Ui-Components/Title";
import "./product-detail.css";
import TabComponent from "./TabComponent";
import {getProduct} from "../api/productApi";
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


const TabsContainer = styled.div`
  display: flex;
  background-color: #f0f0f0;
  padding: 0px 60px;
`;

const Tab = styled.div`
  padding: 30px 20px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "red" : "#1a1a1a")};
  color: white;
  width: 100%;
  font-size: 20px;
  font-family: var(--primary-font);
`;

const Content = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  padding: 30px 20px;
  margin: 0px 60px;
  border: 1px solid #ccc;
`;
const ContentContainer = styled.div`
  background-color: #f0f0f0;
`;
export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const handleTabClick = (index) => {
    setActiveTab(index);
  };


  useEffect(() => {
    getProduct(productId).then(res => {
      setProduct(res.data)})
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductInfo>
        <ImageBox>
          <ProductImage src={process.env.REACT_APP_BACKEND_URL + '/' + product.image} alt="img" />
        </ImageBox>

        <ProductContent>
          <Title color="#ed1c25">Product ID: {product.id}</Title>
          <Title fontSize={34}>{product.name}</Title>
          <Title color="#ed1c25">
            {product.brand} | {product.category}
          </Title>
          <Title className="description">Description:</Title>
          <ProductDescription>{product.description}</ProductDescription>
        </ProductContent>
      </ProductInfo>
      <TabsContainer>
        <Tab active={activeTab === 'info'} onClick={() => handleTabClick('info')}>
          Product Information
        </Tab>
        <Tab active={activeTab === 'resource'} onClick={() => handleTabClick('resource')}>
          Resources
        </Tab>
        <Tab active={activeTab === 'other'} onClick={() => handleTabClick('other')}>
          Other
        </Tab>
      </TabsContainer>
      <ContentContainer>
        <Content active={activeTab === 'info'}>
          {product.information}
        </Content>
        <Content active={activeTab === 'resource'}>{product.resource}</Content>
        <Content active={activeTab === 'other'}>{product.other}</Content>
      </ContentContainer>

    </div>
  );
}
