import { createAllMangas, createRandomMangaData } from '../../CommonFunctions';
import { MangaDetails } from '../../Model/Globase_Types';

export const getRandomManga = async () =>
  fetch(`https://api.mangadex.org/manga/random`)
    .then((res) => res.json())
    .then((res) => createRandomMangaData(res))
    .catch((err) => {
      throw new Error(err);
    });

export const getListOfMangasIMGs = async (
  listOfMangas: MangaDetails[]
): Promise<MangaDetails[]> => {
  if (!listOfMangas) return [] as MangaDetails[];
  listOfMangas.map((manga) =>
    getRandomMangaCover(manga.mangaCover_ArtID).then((res) => {
      manga.mangaCover_IMG = `https://uploads.mangadex.org/covers/${manga.mangaID}/${res.mangaCover_IMG}`;
    })
  );

  return listOfMangas;
};
export const getRandomMangaCover = async (mangaCoverID: string): Promise<any> =>
  fetch(`https://api.mangadex.org/cover/${mangaCoverID}`)
    .then((res) => res.json())
    .then((res) => {
      const fileName = res.data.attributes.fileName || '';
      return { mangaCover_IMG: fileName };
    })
    .catch((err) => {
      throw new Error(err);
    });

export const getAllMangas = async (): Promise<MangaDetails[]> =>
  fetch(`https://api.mangadex.org/manga?limit=20`)
    .then((res) => res.json())
    .then((res) => createAllMangas(res))
    .catch((err) => {
      throw new Error(err);
    });
