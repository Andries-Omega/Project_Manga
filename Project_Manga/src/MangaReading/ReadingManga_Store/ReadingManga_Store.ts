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
  openedVolume: MangaVolume;
  chapters: MangaChapter[];
  openedChapter: MangaChapter;

  openedPage: number;
};

const initialState: OpenedMangaDetails = {
  openedManga: {} as MangaDetails,
  volumes: [] as MangaVolume[],
  openedVolume: {} as MangaVolume,
  chapters: [] as MangaChapter[],
  openedChapter: {} as MangaChapter,

  openedPage: 0,
};

export const readingMangaSlice = createSlice({
  name: "readingMangaState",
  initialState,
  reducers: {
    setOpenedManga: (state, action: PayloadAction<MangaDetails>) => {
      state.openedManga = action.payload;
    },
    setVolumes: (state, action: PayloadAction<MangaVolume[]>) => {
      state.volumes = action.payload;
    },
    setOpenedVolume: (state, action: PayloadAction<MangaVolume>) => {
      state.openedVolume = action.payload;
    },
    setChapters: (state, action: PayloadAction<MangaChapter[]>) => {
      state.chapters = action.payload;
    },
    setOpenedChapter: (state, action: PayloadAction<MangaChapter>) => {
      state.openedChapter = action.payload;
    },
    setOpenedPage: (state, action: PayloadAction<number>) => {
      state.openedPage = action.payload;
    },
  },
});

export const {
  setChapters,
  setOpenedChapter,
  setOpenedManga,
  setOpenedPage,
  setOpenedVolume,
  setVolumes,
} = readingMangaSlice.actions;
export default readingMangaSlice.reducer;
