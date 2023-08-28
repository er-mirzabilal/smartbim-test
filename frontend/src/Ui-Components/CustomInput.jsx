import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: inline-block;
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 97%;
`;

const CustomInput = ({ onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue); // Call the parent's onChange with the new value
  };

  return (
    <InputContainer>
      <StyledInput type="text" value={inputValue} onChange={handleChange} />
    </InputContainer>
  );
};

export default CustomInput;
