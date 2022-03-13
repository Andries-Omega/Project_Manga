import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalStore {
  showFooter: boolean;
  darkMode: boolean;
  sideHeaderMouseHover: boolean;
  currentPage: string;
  mobileBurgerOn: boolean;
  mobileSearchOn: boolean;
}

const initialState: GlobalStore = {
  showFooter: false,
  darkMode: false,
  sideHeaderMouseHover: false,
  currentPage: "/",
  mobileBurgerOn: false,
  mobileSearchOn: false,
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
    setMobileBurger: (state, action: PayloadAction<boolean>) => {
      state.mobileBurgerOn = action.payload;
    },
    setMobileSearch: (state, action: PayloadAction<boolean>) => {
      state.mobileSearchOn = action.payload;
    },
  },
});

export const {
  setDarkMode,
  setFooter,
  setCurrentPage,
  setSideMouseHover,
  setMobileBurger,
  setMobileSearch,
} = globalSlice.actions;

export default globalSlice.reducer;
