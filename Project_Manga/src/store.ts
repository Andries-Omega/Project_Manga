import { configureStore } from "@reduxjs/toolkit";
import globalStateReducer from "./Common/GlobalStateStore/GlobaStore";
import homeMangasReducer from "./Home/Mangas_Store/HomeManga";

export const store = configureStore({
  reducer: {
    homeMangas: homeMangasReducer,
    globalState: globalStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
