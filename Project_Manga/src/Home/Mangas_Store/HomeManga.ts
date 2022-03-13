import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * For list of mangas
 */
export type MangaDetails = {
  mangaID: string;
  mangaRating: string;
  mangaDescription: string;
  mangaLockStatus: boolean;
  mangaTitle: string;
  mangaAuther: string;
  mangaArtist: string;
  mangaCover_ArtID: string;
  mangaCover_IMG: string;
};

export enum NetworkStatus {
  IDLING = "Idling",
  PENDING = "loading",
  FAILED = "error",
  SUCCESS = "Success",
}

interface IMangaDetails {
  randomManga: MangaDetails;
  allMangas: MangaDetails[];
  randomMangaNetwork_Status: NetworkStatus;
  allMangaNetwork_Status: NetworkStatus;
  coverIMG_NetworkStatus: NetworkStatus;
}
const initialState: IMangaDetails = {
  randomManga: {} as MangaDetails,
  allMangas: [{} as MangaDetails],
  randomMangaNetwork_Status: NetworkStatus.IDLING,
  allMangaNetwork_Status: NetworkStatus.IDLING,
  coverIMG_NetworkStatus: NetworkStatus.IDLING,
};

export const mangaSlice = createSlice({
  name: "homeMangas",
  initialState,
  reducers: {
    setRandomNetworkStatus: (state, action: PayloadAction<NetworkStatus>) => {
      state.randomMangaNetwork_Status = action.payload;
    },
    setAllMangaNetworkStatus: (state, action: PayloadAction<NetworkStatus>) => {
      state.allMangaNetwork_Status = action.payload;
    },
    setRandomManga: (
      state,
      action: PayloadAction<MangaDetails | undefined>
    ) => {
      state.randomManga = action.payload || state.randomManga;
    },
    setRandomMangaCoverIMG: (state, action: PayloadAction<string>) => {
      console.log("setting Image ", action.payload);
      state.randomManga.mangaCover_IMG = action.payload;
    },
    setMangaCoverIMG: (state, action: PayloadAction<any>) => {
      state.allMangas[action.payload.index].mangaCover_IMG =
        action.payload.mangaCover_IMG;
    },
    setAllMangas: (state, action: PayloadAction<MangaDetails[]>) => {
      state.allMangas = action.payload;
    },
  },
});

export const {
  setRandomNetworkStatus,
  setAllMangaNetworkStatus,
  setRandomManga,
  setMangaCoverIMG,
  setAllMangas,
  setRandomMangaCoverIMG,
} = mangaSlice.actions;

export default mangaSlice.reducer;
