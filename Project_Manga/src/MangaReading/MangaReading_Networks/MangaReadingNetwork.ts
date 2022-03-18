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

export const getMangaDetails = async (
  mangaID: string
): Promise<MangaDetails> => {
  return await fetch(`https://api.mangadex.org/manga/${mangaID}`)
    .then((res) => res.json())
    .then((res) => {
      return createRandomMangaData(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getMangaChapters = async (
  mangaID: string
): Promise<MangaReadInfomation> => {
  return await fetch(`https://api.mangadex.org/manga/${mangaID}/aggregate`)
    .then((res) => res.json())
    .then((res) => {
      return createMangaInformation(res, mangaID);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getMangaPages = async (
  mangaChapter: MangaChapter
): Promise<MangaChapter> => {
  return await fetch(
    `https://api.mangadex.org/at-home/server/${mangaChapter.id}`
  )
    .then((res) => res.json())
    .then((res) => {
      return createMangaPages(res, mangaChapter);
    })
    .catch((err) => {
      throw new Error(err);
    });
};
