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
