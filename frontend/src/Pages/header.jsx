import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Title from "../Ui-Components/Title";
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.header.backgroundColor};
  color: ${(props) => props.theme.header.color};
`;

const LogoImage = styled.img`
  max-width: 100px; // Adjust the size as needed
  height: auto;
  padding-right: 10px;
`;

const Header = () => {
  const themeConfig = useSelector((state) => state.themeConfig.themeConfig);
  console.log(themeConfig, "themeConfig");
  return (
    <HeaderContainer>
      <LogoImage
        src={`${process.env.REACT_APP_BACKEND_URL}/${themeConfig.logo}`}
        alt="Company Logo"
      />
      <Title color={themeConfig.header.color}>{themeConfig.companyName}</Title>
    </HeaderContainer>
  );
};

export default Header;
