import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { MangaChapter, NetworkStatus } from "../Model/Globase_Types";
import AboutManga from "./About_Manga/AboutManga";
import Chapters from "./Chapters/Chapters";
import {
  getMangaChapters,
  getMangaDetails,
  getMangaPages,
} from "./MangaReading_Networks/MangaReadingNetwork";
import Pages from "./Pages/Pages";
import { setPages } from "./ReadingManga_Store/ReadingManga_Store";
import Volumes from "./Volumes/Volumes";

export default function MangaReading() {
  const dispatch = useDispatch();
  const { mangaID } = useParams();
  const { data: reading_mangaData, status: reading_mangaStatus } = useQuery(
    "reading_manga",
    () => getMangaDetails(mangaID || ""),
    { refetchOnWindowFocus: false }
  );
  const { data: reading_MangaChapters, status: reading_MangaChaptersStatus } =
    useQuery(
      ["reading_manga_Chapters", mangaID],
      () => getMangaChapters(mangaID || ""),
      {
        enabled: !!mangaID,
        refetchOnWindowFocus: false,
      }
    );

  const { data: reading_MangaPages, status: reading_MangaPageStatus } =
    useQuery(
      ["reading_MangaPages", reading_MangaChapters?.mangaChapters[0]],
      () =>
        getMangaPages(reading_MangaChapters?.mangaChapters[0] as MangaChapter),
      {
        enabled: !!reading_MangaChapters?.mangaChapters[0],
        refetchOnWindowFocus: false,
      }
    );
  if (
    reading_mangaStatus === NetworkStatus.PENDING ||
    reading_MangaChaptersStatus === NetworkStatus.PENDING ||
    reading_MangaPageStatus === NetworkStatus.FAILED ||
    !reading_MangaPages
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

  if (reading_mangaStatus === NetworkStatus.FAILED) {
    return <h1>Failed</h1>;
  }

  console.log(reading_MangaChapters);

  dispatch(setPages(reading_MangaPages.pages));
  return (
    <div>
      <div className="grid md:grid-cols-3 p-5 gap-5">
        {/* Pages And About */}
        <div className="col-span-2">
          <Pages pages={reading_MangaPages.pages} />
          <AboutManga />
        </div>
        <div>
          <Volumes />
          <Chapters />
        </div>
      </div>
    </div>
  );
}
