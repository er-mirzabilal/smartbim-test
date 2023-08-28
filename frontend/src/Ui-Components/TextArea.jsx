import React, { useState } from "react";
import styled from "styled-components";

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const StyledTextArea = styled.textarea`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  width: 97%;
`;

const TextArea = ({ onChange }) => {
  const [value, setValue] = useState("");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <TextAreaContainer>
      <StyledTextArea
        rows="4"
        cols="90"
        value={value}
        onChange={handleInputChange}
      />
    </TextAreaContainer>
  );
};

export default TextArea;
