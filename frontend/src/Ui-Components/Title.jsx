import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  margin: 0px;
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "24px")};
  color: ${(props) => (props.color ? props.color : "black")};
  font-family: ${(props) => props.theme.fontFamily};
`;

export default function Title({ children, fontSize, color, className }) {
  return (
    <StyledTitle fontSize={fontSize} color={color} className={className}>
      {children}
    </StyledTitle>
  );
}
