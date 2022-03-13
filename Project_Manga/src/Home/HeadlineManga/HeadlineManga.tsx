import { useQuery } from "react-query";
import { NetworkStatus } from "../Mangas_Store/HomeManga";
import {
  getRandomManga,
  getRandomMangaCover,
} from "../Network_Requests/HomeNetworks";

export default function HeadlineManga() {
  const { data: randomMangaData, status: rando_manga_Status } = useQuery(
    "random_manga",
    getRandomManga,
    { refetchOnWindowFocus: false }
  );

  const mangaCoverID = randomMangaData?.mangaCover_ArtID;

  const {
    isIdle,
    data: randomMangaCover,
    status: random_manga_cover_status,
  } = useQuery(
    ["random_manga_cover", mangaCoverID],
    () => getRandomMangaCover(mangaCoverID || ""),

    {
      enabled: !!mangaCoverID,
      refetchOnWindowFocus: false,
    }
  );

  if (
    rando_manga_Status === NetworkStatus.PENDING ||
    random_manga_cover_status === NetworkStatus.PENDING
  ) {
    return (
      <div>
        <h1 className=" text-lg text-black text-center mt-5">Pending...</h1>
      </div>
    );
  }

  if (
    rando_manga_Status === NetworkStatus.FAILED ||
    random_manga_cover_status === NetworkStatus.FAILED
  ) {
    return (
      <div>
        <h1 className=" text-lg text-red-600 text-center mt-5">
          Network Error
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat h-96 w-full
        "
        style={{
          backgroundImage: `url('../../../assets/images/manga_headline.jpg')`,
        }}
      >
        <div className=" bg-white w-screen h-96 bg-opacity-50"></div>
        <div className=" flex  ">
          <img
            src={
              "https://uploads.mangadex.org/covers/" +
              randomMangaData?.mangaID +
              "/" +
              randomMangaCover?.mangaCover_IMG
            }
            className="-mt-32 w-52 h-64 mx-10 rounded-md  duration-500  hover:scale-110 cursor-pointer"
          />
          <div className="mt-5">
            <h1 className="text-2xl  font-mono	">
              {randomMangaData?.mangaTitle}
            </h1>
            <button
              className=" bg-blue-500 text-white mt-8 w-20 h-10 rounded-md shadow-2xl
											hover:bg-blue-700 duration-500  hover:scale-110 cursor-pointer z-10"
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
