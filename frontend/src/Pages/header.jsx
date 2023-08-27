import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.header.backgroundColor};;
`;

const LogoImage = styled.img`
  max-width: 100px; // Adjust the size as needed
  height: auto;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoImage src="/image/" alt="Company Logo" />
    </HeaderContainer>
  );
};

export default Header;
