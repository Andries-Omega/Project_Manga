import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalStore {
  showFooter: boolean;
  darkMode: boolean;
  sideHeaderMouseHover: boolean;
  currentPage: string;
}

const initialState: GlobalStore = {
  showFooter: false,
  darkMode: false,
  sideHeaderMouseHover: false,
  currentPage: "/",
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
    setSideMouseHover: (state, action: PayloadAction<boolean>) => {
      state.sideHeaderMouseHover = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setDarkMode, setFooter, setCurrentPage, setSideMouseHover } =
  globalSlice.actions;

export default globalSlice.reducer;
