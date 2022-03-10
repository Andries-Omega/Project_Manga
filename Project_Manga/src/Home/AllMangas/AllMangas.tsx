import { useEffect, useReducer } from "react";
import { IManga, NetworkStatus } from "../HeadlineManga/HeadlineManga";

interface IListMangas {
	AllMangas: IManga[];
	mangaCover_IMG: string[];
	networkStatus: NetworkStatus;
}

const listOfMangas: IListMangas = {
	AllMangas: [],
	mangaCover_IMG: [],
	networkStatus: NetworkStatus.IDLING,
};

const reducer = (
	state: IListMangas,
	action: { type: string; payload?: any }
) => {
	switch (action.type) {
		case "setStatus":
			return {
				...state,
				networkStatus: action.payload,
			};
		case "setMangas":
			return {
				...state,
				AllMangas: action.payload,
			};
		case "setMangaCovers":
			return {
				...state,
				mangaCover_IMG: action.payload,
			};
		default:
			return state;
	}
};
export default function AllManga() {
	const [state, dispatch] = useReducer(reducer, listOfMangas);

	useEffect(() => {
		getAllMangas()
			.then((res) => {
				dispatch({ type: "setMangas", payload: makeListOfMangas(res.data) });

				dispatch({
					type: "setMangaCovers",
					payload: getRandomMangaCovers(makeListOfMangas(res.data)),
				});
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="container pt-56 pl-11 ">
			<div className="grid grid-cols-3 gap-10 place-content-center">
				{state.AllMangas.map((manga: any, index: number) => {
					console.log(state.mangaCover_IMG[index]);
					return (
						<div className="bg-white rounded-2xl shadow-2xl">
							<div
								className=" bg-no-repeat bg-cover h-64 pt-3 pr-3 rounded-t-2xl"
								style={{
									backgroundImage: `url('"${state.mangaCover_IMG[index]}"')`,
								}}
							>
								<div className="bg-white opacity-75 w-32 float-right rounded-l-full rounded-r-full">
									<h3 className="text-base text-center">News</h3>
								</div>
							</div>
							<h3 className=" font-bold text-lg ml-10 mt-10">
								{manga.mangaTitle}
							</h3>
							<p className=" text-gray-800 mt-5 ml-10 mb-20">
								It is a long established fact that a<br /> reader will be
								disctracted by the
								<br /> readable content of a page when
								<br /> looking at its layout ...
							</p>
							<a className=" float-right bottom-0 mb-5 mr-5 cursor-pointer hover:text-blue-500">
								Read more
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}

const getAllMangas = async () => {
	return await fetch(`https://api.mangadex.org/manga?=20`)
		.then((res) => res.json())
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

function makeListOfMangas(mangas: any[]): IManga[] {
	let mangaList: IManga[] = [];
	mangas.map((manga) => {
		mangaList.push(createManga(manga));
	});
	return mangaList;
}

const createManga = (manga: any) => {
	return {
		mangaID: manga.id || "",
		mangaRating: manga.attributes.contentRating || "",
		mangaDescription: manga.attributes.description.en || "",
		mangaLockStatus: manga.attributes?.isLocked,
		mangaTitle: manga.attributes.title.en || "",
		mangaAuther: manga.relationships[0].id || "",
		mangaArtist: manga.relationships[1].id || "",
		mangaCover_ArtID: manga.relationships[2].id || "",
	};
};

const getRandomMangaCovers = (mangas: any[]) => {
	let mangaIMGs: string[] = [];
	mangas.map(async (manga) => {
		await fetch(`https://api.mangadex.org/cover/${manga.mangaCover_ArtID}`)
			.then((res) => res.json())
			.then((res) => {
				mangaIMGs.push(
					"https://uploads.mangadex.org/covers/" +
						manga.mangaID +
						"/" +
						res.data.attributes.fileName
				);
			})
			.catch((err) => {
				throw new Error(err);
			});
	});
	return mangaIMGs;
};
