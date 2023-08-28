import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.header.backgroundColor};
`;

const LogoImage = styled.img`
  max-width: 100px; // Adjust the size as needed
  height: auto;
`;

const Header = () => {
  const themeConfig = useSelector((state) => state.themeConfig.themeConfig);
  return (
    <HeaderContainer>
      <LogoImage
        src={`${process.env.REACT_APP_BACKEND_URL}/${themeConfig.logo}`}
        alt="Company Logo"
      />
    </HeaderContainer>
  );
};

export default Header;
