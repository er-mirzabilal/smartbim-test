import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Ui-Components/Button";
import Title from "../Ui-Components/Title";
import Input from "../Ui-Components/CustomInput";
import TextArea from "../Ui-Components/TextArea";
import CustomInput from "../Ui-Components/CustomInput";
import { createProduct } from "../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { saveProduct } from "../Redux/productSlice";

const StyledPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

const ModalContent = styled.div`
  padding: 50px;
  width: 605px;
  height: 500px;
`;

const CategoryDropdown = styled.select`
  height: 40px;
  width: 100%;
`;

const FieldBox = styled.div`
  gap: 10px;
  padding: 10px;
  width: 100%;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  padding-bottom: 10px;
`;
const ButtonBoxItem = styled.div`
  padding-right: 10px;
`;

const INITAL_VALUE = {
  name: "",
  brand: "",
  company: "",
  category: "",
  description: "",
  resource: "",
  information: "",
  other: "",
};
const AddProductPopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [productData, setProductData] = useState(INITAL_VALUE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const themeConfig = useSelector((state) => state.themeConfig.themeConfig);

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

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("image", imageFile);
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    try {
      await dispatch(saveProduct(formData));
      setIsSubmitting(false);
      window.alert("Product added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      setIsSubmitting(false);
    }
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
                name="name"
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
                name="brand"
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
                name="company"
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
                  style={{ maxWidth: "200px", padding: "10px 0px" }}
                />
                <ButtonBoxItem>
                  <Button danger onClick={() => setImageFile(null)}>
                    Remove Image
                  </Button>
                </ButtonBoxItem>
              </FieldBox>
            )}

            <ButtonBox>
              <ButtonBoxItem>
                <Button primary onClick={handleSubmit} disabled={isSubmitting}>
                  Add
                </Button>
              </ButtonBoxItem>
              <Button danger onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
            </ButtonBox>
          </div>
        </ModalContent>
      </div>
    </StyledPopup>
  );
};

export default AddProductPopup;
