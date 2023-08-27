import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Ui-Components/Button";
import Title from "../Ui-Components/Title";
import Input from "../Ui-Components/CustomInput";
import TextArea from "../Ui-Components/TextArea";
import CustomInput from "../Ui-Components/CustomInput";
import {createProduct} from "../api/productApi";
import {useDispatch} from "react-redux";
import {saveProduct} from "../Redux/productSlice";

const StyledPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  overflow-y: scroll;
  border: 1px solid black;
  background-color: dodgerblue;
`;

const ModalContent = styled.div`
  padding: 50px;
  width: 600px;
  height: 500px;
`;

const CategoryDropdown = styled.select`
  height: 40px;
  width: 100%;
  option {
    color: black;
    font-size: 14px;
    border: none;
    padding: 20px;
  }
`;

const FieldBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  width: 100%;
`;

const INITAL_VALUE ={
  name: "",
  brand: "",
  company: "",
  category: "",
  description: "",
  resource: "",
  information: "",
  other: ""
}
const AddProductPopup = ({ isOpen, onClose, onAdd }) => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [productData, setProductData] = useState(INITAL_VALUE);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", imageFile); // Append the image file to the form data
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    console.log(formData);
    createProduct(formData).then(res => {
      dispatch(saveProduct(formData));
    })
  };

  return (
    <StyledPopup style={{ display: isOpen ? "block" : "none" }}>
      <div>
        <ModalContent>
          <div>
            <Title className="popup-title">Add Product</Title>

            <FieldBox>
              <Title fontSize={14}>Name</Title>
              <CustomInput
                type="text"
                name="name" // Make sure this matches the name in productData
                placeholder="Enter product name"
                onChange={(value) =>
                  handleInputChange({ target: { name: "name", value } })
                }
              />
            </FieldBox>
            <FieldBox>
              <Title fontSize={14}>Brand</Title>
              <CustomInput
                type="text"
                name="brand" // Make sure this matches the name in productData
                placeholder="Enter brand"
                onChange={(value) =>
                  handleInputChange({ target: { name: "brand", value } })
                }
              />
            </FieldBox>
            <FieldBox>
              <Title fontSize={14}>Company</Title>
              <CustomInput
                type="text"
                name="company" // Make sure this matches the name in productData
                placeholder="Enter company"
                onChange={(value) =>
                  handleInputChange({ target: { name: "company", value } })
                }
              />
            </FieldBox>
            <FieldBox>
              <Title fontSize={14}>Category</Title>
              <CategoryDropdown name="category" onChange={handleInputChange}>
                <option value=""></option>
                <option value="Category A">Category A</option>
                <option value="Category B">Category B</option>
                <option value="Category C">Category C</option>
              </CategoryDropdown>
            </FieldBox>

            <FieldBox>
              <Title fontSize={14}>Description</Title>
              <TextArea
                onChange={(value) =>
                  handleInputChange({ target: { name: "description", value } })
                }
              />
            </FieldBox>
            <FieldBox>
              <Title fontSize={14}>Resource</Title>
              <TextArea
                onChange={(value) =>
                  handleInputChange({ target: { name: "resource", value } })
                }
              />
            </FieldBox>
            <FieldBox>
              <Title fontSize={14}>Information</Title>
              <TextArea
                onChange={(value) =>
                  handleInputChange({ target: { name: "information", value } })
                }
              />
            </FieldBox>

            <FieldBox>
              <Title fontSize={14}>Image</Title>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FieldBox>

            {imageFile && (
              <FieldBox>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Selected"
                  style={{ maxWidth: "100px" }}
                />
              </FieldBox>
            )}

            <FieldBox>
              <Button onClick={handleSubmit}>Add</Button>
              <Button onClick={onClose}>Cancel</Button>
            </FieldBox>
          </div>
        </ModalContent>
      </div>
    </StyledPopup>
  );
};

export default AddProductPopup;
