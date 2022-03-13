import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalStore {
  showFooter: boolean;
  darkMode: boolean;
}

const initialState: GlobalStore = {
  showFooter: false,
  darkMode: false,
};

export const globalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setFooter: (state, action: PayloadAction<boolean>) => {
      state.showFooter = action.payload;
    },
  },
});

export const { setDarkMode, setFooter } = globalSlice.actions;

export default globalSlice.reducer;
