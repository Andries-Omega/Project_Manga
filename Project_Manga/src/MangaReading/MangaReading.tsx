import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AllManga from '../Home/AllMangas/AllMangas';
import { getRandomMangaCover } from '../Home/Network_Requests/HomeNetworks';
import {
  MangaChapter,
  MangaDetails,
  NetworkStatus,
} from '../Model/Globase_Types';
import { RootState } from '../store';
import AboutManga from './About_Manga/AboutManga';
import Chapters from './Chapters/Chapters';
import {
  getMangaChapters,
  getMangaDetails,
  getMangaPages,
} from './MangaReading_Networks/MangaReadingNetwork';
import Pages from './Pages/Pages';
import {
  setChapters,
  setOpenedChapter,
  setOpenedManga,
  setVolumes,
} from './ReadingManga_Store/ReadingManga_Store';
import Volumes from './Volumes/Volumes';

export default function MangaReading() {
  const { mangaID } = useParams();

  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );

  const dispatch = useDispatch();

  const openedChapter = useSelector(
    (state: RootState) => state.mangaReadingState.openedChapter
  );

  const { data: readingMangaData, status: readingMangaStatus } = useQuery(
    ['reading_manga', mangaID],
    () => getMangaDetails(mangaID || ''),
    { refetchOnWindowFocus: false }
  );

  const { data: readingMangaChapters, status: readingMangaChaptersStatus } =
    useQuery(
      ['reading_manga_Chapters', mangaID],
      () => getMangaChapters(mangaID || ''),
      {
        enabled: !!readingMangaData,
        refetchOnWindowFocus: false,
      }
    );

  const mangaCoverID = readingMangaData?.mangaCover_ArtID;

  const { status: readingMangaCoverStatus } = useQuery(
    ['reading_manga_cover', mangaCoverID],
    () =>
      getRandomMangaCover(mangaCoverID || '')
        .then((res) =>
          dispatch(
            setOpenedManga({
              ...readingMangaData,
              mangaCover_IMG: res || '',
            } as MangaDetails)
          )
        )
        .catch((err) => {
          console.clear(); // the 404 error is being resolved below, so there's no need to to show it on
          dispatch(
            setOpenedManga({
              ...readingMangaData,
              mangaCover_IMG: '',
            } as MangaDetails)
          );
        }),
    {
      enabled: !!readingMangaChapters && !!mangaCoverID,
      refetchOnWindowFocus: false,
    }
  );

  const { refetch: mangaPagesRefetch } = useQuery(
    ['mangaPages', openedChapter],
    () => getMangaPages(openedChapter),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  useEffect(() => {
    if (Object.keys(openedChapter).length && !openedChapter.pages) {
      mangaPagesRefetch().then((res) =>
        dispatch(setOpenedChapter(res.data as MangaChapter))
      );
    }
  }, [dispatch, mangaPagesRefetch, openedChapter]);

  if (
    readingMangaStatus === NetworkStatus.PENDING ||
    readingMangaChaptersStatus === NetworkStatus.PENDING ||
    readingMangaCoverStatus === NetworkStatus.PENDING
  ) {
    return (
      <div className=" flex justify-center items-center h-96">
        <img
          src="./assets/images/favicon.png"
          className=" w-52 h-52 animate-spin"
          alt=""
        />
      </div>
    );
  }

  if (
    readingMangaStatus === NetworkStatus.FAILED ||
    readingMangaCoverStatus === NetworkStatus.FAILED ||
    readingMangaChaptersStatus === NetworkStatus.FAILED
  ) {
    return <h1>Failed</h1>;
  }

  if (readingMangaData && readingMangaChapters) {
    dispatch(setVolumes(readingMangaChapters?.mangaVolumes));
    dispatch(setChapters(readingMangaChapters?.mangaChapters));
  }

  return (
    <div>
      <div
        className={`grid md:grid-cols-3 p-5 gap-5 pb-12 text-${
          darkMode ? 'white' : 'black'
        }`}
      >
        {/* Pages And About */}
        <div className=" col-span-3 md:col-span-2">
          <Pages key="TheMangaPages" />
        </div>
        <div className="col-span-3 md:col-span-1">
          <Volumes key="TheMangaVolumes" />
          <Chapters key="TheMangaChapters" />
        </div>
        <div className="col-span-3">
          <AboutManga key="TheMangaAbout" />
        </div>
        <div className="col-span-3">
          <AllManga key="AllMangaOnReading" />
        </div>
      </div>
    </div>
  );
}
