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

/**
 * For list of mangas chapters
 */
export type MangaReadInfomation = {
  mangaID: string;
  manga: MangaDetails;
  mangaVolumes: MangaVolume[];
  mangaChapters: MangaChapter[];
  numberOfVolumes: number;
  numberOfChapters: number;
};

export type MangaVolume = {
  volume: string;
  count: number;
  chapters: MangaChapter[];
};

export type MangaChapter = {
  chapter: string;
  id: string;
  baseUrl: string;
  hash: string;
  pages: string[];
  pagesRead: string[];
  other: any[];
  count: number;
  volume: string;
};

export enum NetworkStatus {
  IDLING = 'Idling',
  PENDING = 'loading',
  FAILED = 'error',
  SUCCESS = 'Success',
}
