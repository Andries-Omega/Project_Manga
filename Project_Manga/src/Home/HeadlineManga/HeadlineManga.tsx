import { useEffect, useReducer } from "react";

export enum NetworkStatus {
	IDLING = "Idling",
	PENDING = "Pending",
	FAILED = "Failed",
	SUCCESS = "Success",
}

export type IManga = {
	mangaID: string;
	mangaRating: string;
	mangaDescription: string;
	mangaLockStatus: boolean;
	mangaTitle: string;
	mangaAuther: string;
	mangaArtist: string;
	mangaCover_ArtID: string;
};
type IRandomManga = {
	mangaData: IManga;
	mangaCover_ArtIMG: string;
	networkStatus: string;
};

const randomManga: IRandomManga = {
	mangaData: {
		mangaID: "",
		mangaRating: "",
		mangaDescription: "",
		mangaLockStatus: true,
		mangaTitle: "",
		mangaAuther: "",
		mangaArtist: "",
		mangaCover_ArtID: "",
	},
	mangaCover_ArtIMG: "",
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
		case "setMangaCover":
			return {
				...state,
				mangaCover_ArtIMG: action.payload,
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
				dispatch({ type: "setManga", payload: res });
				console.log(res);
				getRandomMangaCover(res.mangaCover_ArtID)
					.then((resIMG) => {
						console.log(res);
						dispatch({
							type: "setMangaCover",
							payload:
								"https://uploads.mangadex.org/covers/" +
								res.mangaID +
								"/" +
								resIMG.data.attributes.fileName,
						});
					})
					.catch((err) => console.error(err));
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div>
			<div
				className="bg-cover bg-center bg-no-repeat h-96 w-full"
				style={{
					backgroundImage: `url('../../../assets/images/manga_headline.jpg')`,
				}}
			>
				<div className=" bg-white w-screen h-96 bg-opacity-50"></div>
				<div className=" flex  ">
					<img
						src={state.mangaCover_ArtIMG}
						className="-mt-32 w-52 h-64 mx-10"
					/>
					<div className="mt-5">
						<h1 className="text-2xl  font-mono	">
							{state.mangaData.mangaTitle}
						</h1>
						<button
							className=" bg-blue-500 text-white mt-8 w-20 h-10 rounded-md shadow-2xl
											hover:bg-blue-700 z-10"
							onClick={() => alert("Ayo")}
						>
							Read
						</button>
					</div>
				</div>
			</div>
		</div>
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
		mangaCover_ArtID: randomData.data.relationships[2].id || "",
	};
};

const getRandomMangaCover = async (mangaCoverID: string) => {
	return await fetch(`https://api.mangadex.org/cover/${mangaCoverID}`)
		.then((res) => res.json())
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw new Error(err);
		});
};
