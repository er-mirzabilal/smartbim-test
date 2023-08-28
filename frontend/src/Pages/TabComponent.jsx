import React, { useState } from "react";
import styled from "styled-components";

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
  font-family: ${(props) => props.theme.fontFamily};
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

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <TabsContainer>
        <Tab active={activeTab === 0} onClick={() => handleTabClick(0)}>
          Product Information
        </Tab>
        <Tab active={activeTab === 1} onClick={() => handleTabClick(1)}>
          Resourses
        </Tab>
        <Tab active={activeTab === 2} onClick={() => handleTabClick(2)}>
          Other
        </Tab>
      </TabsContainer>
      <ContentContainer>
        <Content active={activeTab === 0}>
          The SPB2 Pressure Booster Pump is a compact and efficient solution for
          enhancing water pressure in residential and light commercial
          applications. With a robust design and quiet operation, it delivers
          consistent water flow, making it ideal for improving shower
          experiences and overall water supply performance.The SPB2 Pressure
          Booster Pump is a compact and efficient solution for enhancing water
          pressure in residential and light commercial applications. With a
          robust design and quiet operation, it delivers consistent water flow,
          making it ideal for improving shower experiences and overall water
          supply performance.The SPB2 Pressure Booster Pump is a compact and
          efficient solution for enhancing water pressure in residential and
          light commercial applications. With a robust design and quiet
          operation, it delivers consistent water flow, making it ideal for
          improving shower experiences and overall water supply performance.
        </Content>
        <Content active={activeTab === 1}>Content for Tab 2</Content>
        <Content active={activeTab === 2}>Content for Tab 3</Content>
      </ContentContainer>
    </div>
  );
};

export default TabComponent;
