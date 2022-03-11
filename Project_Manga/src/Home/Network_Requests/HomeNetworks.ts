import { MangaDetails } from "../Mangas_Store/HomeManga";

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

export const solveCaptcha = async () => {
	return await fetch("https://api.mangadex.org/captcha/solve", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	})
		.then((res) => res.json())
		.then((res) => console.log(res))
		.catch((err) => console.error(err));
};

export const getRandomMangaCover = async (mangaCoverID: string) => {
	return await fetch(`https://api.mangadex.org/cover/${mangaCoverID}`)
		.then((res) => res.json())
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

const createRandomMangaData = (randomData: any): MangaDetails => {
	return {
		mangaID: randomData.data.id || "",
		mangaRating: randomData.data.attributes.contentRating || "",
		mangaDescription: randomData.data.attributes.description.en || "",
		mangaLockStatus: randomData.data.attributes?.isLocked,
		mangaTitle: randomData.data.attributes.title.en || "",
		mangaAuther: randomData.data.relationships[0].id || "",
		mangaArtist: randomData.data.relationships[1].id || "",
		mangaCover_ArtID: randomData.data.relationships[2].id || "",
		mangaCover_IMG: "", //because we have to make another network request to get manga cover, we will set this explicitely
	};
};
