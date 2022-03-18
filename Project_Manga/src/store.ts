import { configureStore } from "@reduxjs/toolkit";
import globalStateReducer from "./Common/GlobalStateStore/GlobaStore";
import mangaReadingReducer from "./MangaReading/ReadingManga_Store/ReadingManga_Store";
export const store = configureStore({
  reducer: {
    globalState: globalStateReducer,
    mangaReadingState: mangaReadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
