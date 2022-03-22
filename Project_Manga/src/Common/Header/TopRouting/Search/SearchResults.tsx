import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setOpenedChapter,
  setOpenedPage,
  setOpenedVolume,
} from '../../../../MangaReading/ReadingManga_Store/ReadingManga_Store';
import {
  MangaChapter,
  MangaVolume,
  NetworkStatus,
} from '../../../../Model/Globase_Types';
import { RootState } from '../../../../store';
import { getSearchMangas } from '../../../CommonNetwork/CommonNetwork';
import { setSearching } from '../../../GlobalStateStore/GlobaStore';
import { SearchContext } from './Search';

export default function SearchResults() {
  const searchTitle = useContext(SearchContext);

  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: searchedMangas, status: searchedMangasStatus } = useQuery(
    ['searchedMangasKey', searchTitle],
    () => getSearchMangas(searchTitle),
    {
      enabled: !!searchTitle,
      refetchOnWindowFocus: false,
    }
  );

  if (searchedMangasStatus === NetworkStatus.PENDING) {
    return (
      <div className=" flex justify-center items-center h-96">
        <img
          src="./assets/images/favicon.png"
          className=" w-52 h-52 animate-spin"
          alt="true"
        />
      </div>
    );
  }

  if (searchedMangasStatus === NetworkStatus.FAILED) {
    return (
      <div>
        <h1
          className={`text-red-${
            darkMode ? '500' : '600'
          } text-lg text-center mt-5 md:mt-32 text-red-500`}
        >
          Network Error
        </h1>
      </div>
    );
  }

  if (!searchedMangas?.length) {
    return (
      <h1
        className={`text-${
          darkMode ? 'white' : 'black'
        } text-lg text-center mt-5 md:mt-32`}
      >
        Manga Not Found
      </h1>
    );
  }

  return (
    <div className=" -ml-20 mr-3 md:w-[700px] h-[705px] overflow-y-auto">
      <div
        className={`bg-slate-${
          darkMode ? '800 text-white' : '200'
        } w-full grid pt-3 rounded-md   `}
      >
        {searchedMangas &&
          searchedMangas?.map((manga) => (
            <div
              role="button"
              aria-hidden="true"
              className={`text-lg hover:scale-110 duration-500 ${
                darkMode ? ' hover:bg-slate-500' : 'hover:bg-slate-50'
              }
               mb-5 border-[1px] border-${
                 darkMode ? 'white' : 'black'
               } h-fit grid place-items-start border-x-0 mr-2 ml-2 cursor-pointer px-6`}
              onClick={() => {
                dispatch(setSearching(false));
                // make sure the opened chapter and volume section is null before redirection
                dispatch(setOpenedVolume({} as MangaVolume));
                dispatch(setOpenedChapter({} as MangaChapter));
                dispatch(setOpenedPage(0));
                navigate(`manga_read/${manga.mangaID}`);
              }}
              key={`${manga.mangaID}`}
            >
              <h1 className=" text-xl mb-1">{manga.mangaTitle}</h1>
              <p className=" text-base mb-1">Rating: {manga.mangaRating}</p>
              <div className="flex justify-between w-full">
                <p className=" text-base mb-1">Status: {manga.mangaStatus}</p>
                <p
                  className={`${manga.mangaYear ? 'text-base mb-1' : 'hidden'}`}
                >
                  Release year: {manga.mangaYear}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
