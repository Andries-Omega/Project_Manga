import { useEffect, useReducer } from "react";

enum NetworkStatus {
	IDLING = "Idling",
	PENDING = "Pending",
	FAILED = "Failed",
	SUCCESS = "Success",
}

type IManga = {
	mangaID: string;
	mangaRating: string;
	mangaDescription: string;
	mangaLockStatus: boolean;
	mangaTitle: string;
	mangaAuther: string;
	mangaArtist: string;
	mangaCover_Art: string;
};
interface IRandomManga {
	mangaData: IManga;
	networkStatus: string;
}

const randomManga: IRandomManga = {
	mangaData: {
		mangaID: "",
		mangaRating: "",
		mangaDescription: "",
		mangaLockStatus: true,
		mangaTitle: "",
		mangaAuther: "",
		mangaArtist: "",
		mangaCover_Art: "",
	},
	networkStatus: NetworkStatus.IDLING,
};

const reduce = (
	state: IRandomManga,
	action: {
		type: string;
		payload?: any;
	}
) => {
	switch (action.type) {
		case "setState":
			return {
				...state,
				networkStatus: action.payload,
			};
		case "setManga":
			return {
				...state,
				mangaData: action.payload,
			};
		default:
			return state;
	}
};
export default function HeadlineManga() {
	const [state, dispatch] = useReducer(reduce, randomManga);

	useEffect(() => {
		getRandomManga()
			.then((res) => {
				console.log(res);
				//dispatch({ type: "setManga", payload: res });
			})
			.catch((err) => console.log(err));
	});
	return (
		<>
			<h1 className="text-3xl text-black">Hey {state.mangaData?.mangaID}</h1>
		</>
	);
}
const getRandomManga = async () => {
	return await fetch(`https://api.mangadex.org/manga/random`)
		.then((res) => res.json())
		.then((res) => {
			return createRandomMangaData(res);
		})
		.catch((err) => {
			throw new Error(err);
		});
};

const createRandomMangaData = (randomData: any): IManga => {
	return {
		mangaID: randomData.data.id || "",
		mangaRating: randomData.data.attributes.contentRating || "",
		mangaDescription: randomData.data.attributes.description.en || "",
		mangaLockStatus: randomData.data.attributes?.isLocked,
		mangaTitle: randomData.data.attributes.title.en || "",
		mangaAuther: randomData.data.relationships[0].id || "",
		mangaArtist: randomData.data.relationships[1].id || "",
		mangaCover_Art: randomData.data.relationships[2].id || "",
	};
};
