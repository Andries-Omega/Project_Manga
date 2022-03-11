import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
	MangaDetails,
	NetworkStatus,
	setRandomManga,
	setRandomMangaCoverIMG,
	setRandomNetworkStatus,
} from "../Mangas_Store/HomeManga";
import {
	getRandomManga,
	getRandomMangaCover,
	solveCaptcha,
} from "../Network_Requests/HomeNetworks";

export default function HeadlineManga() {
	const randomManga = useSelector(
		(state: RootState) => state.homeMangas.randomManga
	);
	const randomMangaNetworkStatus = useSelector(
		(state: RootState) => state.homeMangas.randomMangaNetwork_Status
	);

	const dispatch = useDispatch();

	useEffect(() => {
		solveCaptcha();
		dispatch(setRandomNetworkStatus(NetworkStatus.PENDING));
		getRandomManga()
			.then((res: MangaDetails) => {
				dispatch(setRandomManga(res));
				getRandomMangaCover(res.mangaCover_ArtID)
					.then((resIMG) => {
						dispatch(setRandomNetworkStatus(NetworkStatus.SUCCESS)); //Only make the network status a success after we've recieved our feedback successfully
						dispatch(
							setRandomMangaCoverIMG(
								"https://uploads.mangadex.org/covers/" +
									res.mangaID +
									"/" +
									resIMG.data.attributes.fileName
							)
						);
					})
					.catch((err) => {
						dispatch(setRandomNetworkStatus(NetworkStatus.FAILED));
						console.error(err);
					});
			})
			.catch((err) => {
				dispatch(setRandomNetworkStatus(NetworkStatus.FAILED));
				console.log(err);
			});
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
						src={randomManga.mangaCover_IMG}
						className="-mt-32 w-52 h-64 mx-10"
					/>
					<div className="mt-5">
						<h1 className="text-2xl  font-mono	">{randomManga.mangaTitle}</h1>
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
