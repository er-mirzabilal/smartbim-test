import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeConfig: {},
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
