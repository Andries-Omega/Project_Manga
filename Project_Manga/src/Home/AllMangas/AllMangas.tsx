import { useEffect } from "react";
import { useQueries, useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  MangaDetails,
  NetworkStatus,
  setAllMangas,
  setMangaCoverIMG,
} from "../Mangas_Store/HomeManga";

import {
  getAllMangas,
  getListOfMangasIMGs,
  getRandomMangaCover,
} from "../Network_Requests/HomeNetworks";

import MangaCard from "./MangaCart";

export default function AllManga() {
  const { data: all_manga, status: all_manga_status } = useQuery(
    "all_manga",
    getAllMangas,
    { refetchOnWindowFocus: false }
  );

  const { data: all_manga_cover, status: all_manga_cover_status } = useQuery(
    ["all_manga_cover", all_manga],
    () => getListOfMangasIMGs(all_manga || []),
    {
      enabled: !!all_manga,
      refetchOnWindowFocus: false,
    }
  );
  if (
    all_manga_cover_status === NetworkStatus.PENDING ||
    all_manga_status === NetworkStatus.PENDING
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
    all_manga_cover_status === NetworkStatus.FAILED ||
    all_manga_status === NetworkStatus.FAILED
  ) {
    return <h1>Failed</h1>;
  }

  return (
    <div className="container pt-56 md:pl-11 md:pr-0 pl-10 pr-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-32 place-content-center pb-32">
        {all_manga_cover &&
          all_manga_cover?.map((manga: MangaDetails) => (
            <div className="md:pl-8">
              <MangaCard key={manga.mangaID} manga={manga} />
            </div>
          ))}
      </div>
    </div>
  );
}
