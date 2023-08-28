import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) =>
    props.danger ? props.theme.color.primaryColor : "#007bff"};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.danger ? "#b30000" : "#0056b3")};
  }

  ${(props) =>
    props.primary &&
    css`
      background-color: blue;
      &:hover {
        background-color: #004080;
      }
    `}
`;

const Button = ({ children, onClick, primary, danger }) => {
  return (
    <StyledButton
      onClick={onClick}
      primary={primary ? "true" : undefined}
      danger={danger ? "true" : undefined}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
