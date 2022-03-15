import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NetworkStatus } from "../../Model/Globase_Types";
import { RootState } from "../../store";

import {
  getRandomManga,
  getRandomMangaCover,
} from "../Network_Requests/HomeNetworks";

export default function HeadlineManga() {
  const navigate = useNavigate();
  const { data: randomMangaData, status: rando_manga_Status } = useQuery(
    "random_manga",
    getRandomManga,
    { refetchOnWindowFocus: false }
  );
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
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
      <div className=" flex justify-center items-center h-96">
        <img
          src="./assets/images/favicon.png"
          className=" h-52 w-52 animate-spin"
        />
      </div>
    );
  }

  if (
    rando_manga_Status === NetworkStatus.FAILED ||
    random_manga_cover_status === NetworkStatus.FAILED
  ) {
    return (
      <div>
        <h1
          className={
            darkMode
              ? "text-lg text-red-500 text-center mt-5"
              : " text-lg text-red-600 text-center mt-5"
          }
        >
          Network Error
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat h-52 md:h-96 w-full
        "
        style={{
          backgroundImage: `url('../../../assets/images/manga_headline.png')`,
        }}
      >
        <div
          className={`bg-${
            darkMode ? "black" : "white"
          } w-full h-52 md:h-96 bg-opacity-50`}
        ></div>
        <div className=" flex  ">
          <img
            src={
              "https://uploads.mangadex.org/covers/" +
              randomMangaData?.mangaID +
              "/" +
              randomMangaCover?.mangaCover_IMG
            }
            className="-mt-20 md:-mt-32 w-40 md:w-52 h-52 md:h-64 mx-5 md:mx-10 rounded-md 
                        duration-500  hover:scale-110 cursor-pointer"
            onClick={() => navigate(`/manga_read/${randomMangaData?.mangaID}`)}
          />
          <div className="mt-5">
            <h1
              className={`text-${
                darkMode ? "white" : "black"
              } text-lg md:text-2xl font-mono mb-8`}
            >
              {randomMangaData?.mangaTitle}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
