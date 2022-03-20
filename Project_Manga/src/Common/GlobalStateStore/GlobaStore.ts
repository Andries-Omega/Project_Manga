import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  currentPage: '/',
  mobileBurgerOn: false,
  mobileSearchOn: false,
};

export const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setScrollUp: (state, action: PayloadAction<boolean>) => {
      state.showFooter = action.payload;
    },
    setSideMouseHover: (state, action: PayloadAction<boolean>) => {
      state.sideHeaderMouseHover = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setMobileBurger: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.mobileSearchOn = false;
      }
      // just to make sure they don't search while nav bar open
      state.mobileBurgerOn = action.payload;
    },
    setMobileSearch: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.mobileBurgerOn = false;
      }
      // just to make sure they don't search while nav bar open
      state.mobileSearchOn = action.payload;
    },
  },
});

export const {
  setDarkMode,
  setScrollUp,
  setCurrentPage,
  setSideMouseHover,
  setMobileBurger,
  setMobileSearch,
} = globalSlice.actions;

export default globalSlice.reducer;
