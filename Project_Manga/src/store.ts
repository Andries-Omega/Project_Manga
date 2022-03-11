import { configureStore } from "@reduxjs/toolkit";
import homeMangasReducer from "./Home/Mangas_Store/HomeManga";

export const store = configureStore({
	reducer: {
		homeMangas: homeMangasReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
