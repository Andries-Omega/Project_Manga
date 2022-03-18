import { createAllMangas, createRandomMangaData } from "../../CommonFunctions";
import { MangaDetails } from "../../Model/Globase_Types";

type MangaCover = {
  mangaCoverIMG: string;
};
export const getRandomManga = async () => {
  return await fetch(`https://api.mangadex.org/manga/random`)
    .then((res) => res.json())
    .then((res) => {
      return createRandomMangaData(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const solveCaptcha = async (captchaResult: string) => {
  return await fetch("https://api.mangadex.org/captcha/solve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ captchaChallenge: captchaResult }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

export const getListOfMangasIMGs = async (
  listOfMangas: MangaDetails[]
): Promise<MangaDetails[]> => {
  if (!listOfMangas) return [] as MangaDetails[];
  listOfMangas.map((manga) => {
    getRandomMangaCover(manga.mangaCover_ArtID).then((res) => {
      manga.mangaCover_IMG =
        "https://uploads.mangadex.org/covers/" +
        manga.mangaID +
        "/" +
        res.mangaCover_IMG;
    });
  });

  return listOfMangas;
};
export const getRandomMangaCover = async (
  mangaCoverID: string
): Promise<any> => {
  return await fetch(`https://api.mangadex.org/cover/${mangaCoverID}`)
    .then((res) => res.json())
    .then((res) => {
      let fileName = res.data.attributes.fileName || "";
      return { mangaCover_IMG: fileName };
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getAllMangas = async (): Promise<MangaDetails[]> => {
  return await fetch(`https://api.mangadex.org/manga?limit=20`)
    .then((res) => res.json())
    .then((res) => {
      return createAllMangas(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
};
