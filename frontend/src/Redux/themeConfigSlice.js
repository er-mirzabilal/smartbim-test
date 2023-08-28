import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeConfig: {
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
      backgroundColor: "#1d3557",
      color: "white",
    },
    text: {
      color: "black",
    },
  },
};

const themeConfigSlice = createSlice({
  name: "themeConfig",
  initialState,
  reducers: {
    setThemeConfig: (state, action) => {
      state.themeConfig = action.payload;
    },
  },
});

export const { setThemeConfig } = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
