import {
  MangaChapter,
  MangaDetails,
  MangaReadInfomation,
  MangaVolume,
} from "./Model/Globase_Types";

export const createRandomMangaData = (randomData: any): MangaDetails => ({
  mangaID: randomData.data.id || "",
  mangaRating: randomData.data.attributes.contentRating || "",
  mangaDescription: randomData.data.attributes.description.en || "",
  mangaLockStatus: randomData.data.attributes?.isLocked,
  mangaTitle: randomData.data.attributes.title.en || "",
  mangaAuther: randomData.data.relationships[0].id || "",
  mangaArtist: randomData.data.relationships[1].id || "",
  mangaCover_ArtID: randomData.data.relationships[2].id || "",
  mangaCover_IMG: "", // because we have to make another network request to get manga cover, we will set this explicitely
});

export const createAllMangas = (allMangas: any): MangaDetails[] => {
  const mangas: MangaDetails[] = [];
  allMangas.data.map((manga: any) =>
    mangas.push({
      mangaID: manga.id || "",
      mangaRating: manga.attributes.contentRating || "",
      mangaDescription: manga.attributes.description.en || "",
      mangaLockStatus: manga.attributes?.isLocked,
      mangaTitle: manga.attributes.title.en || "",
      mangaAuther: manga.relationships[0].id || "",
      mangaArtist: manga.relationships[1].id || "",
      mangaCover_ArtID: manga.relationships[2].id || "",
      mangaCover_IMG: "",
    })
  );

  return mangas;
};

export const createMangaInformation = (
  mangaInformation: any,
  mangaID: string
): MangaReadInfomation => {
  // Create variables
  let mangaI: MangaReadInfomation = {} as MangaReadInfomation;

  const mangaVolumes: MangaVolume[] = Object.values(mangaInformation.volumes);

  let mangaChapters: MangaChapter[] = [];

  mangaVolumes.forEach((mangaVolume, i) => {
    let volumeChapter: MangaChapter[] = Object.values(mangaVolume.chapters);
    volumeChapter = addVolume(volumeChapter, mangaVolume.volume);

    mangaChapters = mangaChapters.concat(volumeChapter);
    mangaVolumes[i].chapters = volumeChapter;
  });

  mangaI = {
    ...mangaI,
    mangaID,
    mangaVolumes,
    mangaChapters,
    numberOfVolumes: mangaVolumes.length,
    numberOfChapters: mangaChapters.length,
  };

  return mangaI;
};

function addVolume(
  volumeChapter: MangaChapter[],
  volume: string
): MangaChapter[] {
  for (let i = 0; i < volumeChapter.length; i += 1) {
    volumeChapter[i].volume = volume;
    volumeChapter[i].chapter =
      volumeChapter[i].chapter === "none" ? "0" : volumeChapter[i].chapter;
  }
  return volumeChapter;
}

export function createMangaPages(
  pages: any,
  mangaChapter: MangaChapter
): MangaChapter {
  const newMangaChapter = {
    ...mangaChapter,
    baseUrl: pages.baseUrl,
    hash: pages.chapter.hash,
    pages: pages.chapter.data,
  };

  return newMangaChapter;
}
