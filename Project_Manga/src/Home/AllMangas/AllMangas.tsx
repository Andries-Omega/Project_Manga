import * as React from 'react';
import { useQuery } from 'react-query';
import { MangaDetails, NetworkStatus } from '../../Model/Globase_Types';

import {
  getAllMangas,
  getListOfMangasIMGs,
} from '../Network_Requests/HomeNetworks';

import MangaCard from './MangaCart';

export default function AllManga() {
  const { data: allManga, status: allMangaStatus } = useQuery(
    'all_mangaKey',
    () => getAllMangas(),
    { refetchOnWindowFocus: false }
  );

  const { data: allMangaCover, status: allMangaCoverStatus } = useQuery(
    ['all_manga_cover', allManga],
    () => getListOfMangasIMGs(allManga || []),
    {
      enabled: !!allManga,
      refetchOnWindowFocus: false,
    }
  );
  if (
    allMangaCoverStatus === NetworkStatus.PENDING ||
    allMangaStatus === NetworkStatus.PENDING
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
    allMangaCoverStatus === NetworkStatus.FAILED ||
    allMangaStatus === NetworkStatus.FAILED
  ) {
    return <h1>Failed</h1>;
  }

  return (
    <div className="container px-10 pt-56 md:pr-0 md:pl-11">
      <div className="grid grid-cols-1 gap-y-32 place-content-center pb-32 md:grid-cols-2">
        {allMangaCover &&
          allMangaCover?.map((manga: MangaDetails) => (
            <div className="md:pl-8" key={manga.mangaID}>
              <MangaCard manga={manga} key="AllMangaOnHome" />
            </div>
          ))}
      </div>
    </div>
  );
}
