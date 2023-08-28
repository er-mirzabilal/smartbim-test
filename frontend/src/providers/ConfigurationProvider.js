import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { getConfig } from "../api/configApi";
import axios from "axios";
import { setThemeConfig } from "../Redux/themeConfigSlice";
import { useDispatch } from "react-redux";
const SITE_ID = 1;

const DEFAULT_CONFIG = {
  fontFamily: "'Poppins', sans-serif",
  color: {
    defaultColor: "black",
    primaryColor: "#ED1C25",
    secondaryColor: "white",
  },
  fontSize: "16px",
  logo: "logo.png",
  companyName: "Smart Bim",
  button: {
    backgroundColor: "dodgerblue",
    color: "white",
  },
  header: {
    backgroundColor: "grey",
    color: "white",
  },
  text: {
    color: "black",
  },
};
function ConfigurationProvider({ children }) {
  const [themeConfigration, setThemeConfigration] = useState(DEFAULT_CONFIG);
  const dispatch = useDispatch();

  useEffect(() => {
    getConfig(SITE_ID).then((res) => {
      setThemeConfig(res.data);
      dispatch(setThemeConfig(res.data));
    });
  }, []);

  if (!themeConfigration) <div> loading theme...</div>;
  return <ThemeProvider theme={themeConfigration}>{children}</ThemeProvider>;
}

export default ConfigurationProvider;
