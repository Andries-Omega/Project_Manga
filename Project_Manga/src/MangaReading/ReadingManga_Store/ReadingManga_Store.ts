import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MangaChapter,
  MangaDetails,
  MangaVolume,
} from "../../Model/Globase_Types";

export type OpenedChapter = {
  chapterID: string;
  chapter: string;
};

export type OpenedPage = {
  page: string;
  pageNumber: number;
};
export type OpenedMangaDetails = {
  openedManga: MangaDetails;
  volumes: MangaVolume[];
  openedVolume: string;
  chapters: MangaChapter[];
  openedChapter: OpenedChapter;
  pages: string[];
  openedPage: OpenedPage;
};

const initialState: OpenedMangaDetails = {
  openedManga: {} as MangaDetails,
  volumes: [] as MangaVolume[],
  openedVolume: "",
  chapters: [] as MangaChapter[],
  openedChapter: {} as OpenedChapter,
  pages: [],
  openedPage: {} as OpenedPage,
};

export const readingMangaSlice = createSlice({
  name: "readingMangaState",
  initialState,
  reducers: {
    setPages: (state, action: PayloadAction<string[]>) => {
      state.pages = action.payload;
    },
  },
});

export const { setPages } = readingMangaSlice.actions;
export default readingMangaSlice.reducer;
