import { createAllMangas } from '../../CommonFunctions';
import { MangaDetails } from '../../Model/Globase_Types';

export const getSearchMangas = async (
  mangaTitle: string
): Promise<MangaDetails[]> =>
  fetch(`https://api.mangadex.org/manga?limit=25&title=${mangaTitle}`)
    .then((res) => res.json())
    .then((res) => createAllMangas(res))
    .catch((err) => {
      throw new Error(err);
    });
