import {
  createMangaInformation,
  createMangaPages,
  createRandomMangaData,
} from "../../CommonFunctions";
import {
  MangaChapter,
  MangaDetails,
  MangaReadInfomation,
} from "../../Model/Globase_Types";

export const getMangaDetails = async (mangaID: string): Promise<MangaDetails> =>
  fetch(`https://api.mangadex.org/manga/${mangaID}`)
    .then((res) => res.json())
    .then((res) => createRandomMangaData(res))
    .catch((err) => {
      throw new Error(err);
    });

export const getMangaChapters = async (
  mangaID: string
): Promise<MangaReadInfomation> =>
  fetch(`https://api.mangadex.org/manga/${mangaID}/aggregate`)
    .then((res) => res.json())
    .then((res) => createMangaInformation(res, mangaID))
    .catch((err) => {
      throw new Error(err);
    });

export const getMangaPages = async (
  mangaChapter: MangaChapter
): Promise<MangaChapter> =>
  fetch(`https://api.mangadex.org/at-home/server/${mangaChapter.id}`)
    .then((res) => res.json())
    .then((res) => createMangaPages(res, mangaChapter))
    .catch((err) => {
      throw new Error(err);
    });
