import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NetworkStatus } from '../../Model/Globase_Types';
import { RootState } from '../../store';

import {
  getRandomManga,
  getRandomMangaCover,
} from '../Network_Requests/HomeNetworks';

export default function HeadlineManga() {
  const navigate = useNavigate();
  const { data: randomMangaData, status: randoMangaStatus } = useQuery(
    'random_manga',
    getRandomManga,
    { refetchOnWindowFocus: false }
  );
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const mangaCoverID = randomMangaData?.mangaCover_ArtID;

  const { data: randomMangaCover, status: randomMangaCoverStatus } = useQuery(
    ['random_manga_cover', mangaCoverID],
    () => getRandomMangaCover(mangaCoverID || ''),

    {
      enabled: !!mangaCoverID,
      refetchOnWindowFocus: false,
    }
  );

  if (
    randoMangaStatus === NetworkStatus.PENDING ||
    randomMangaCoverStatus === NetworkStatus.PENDING
  ) {
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

  if (
    randoMangaStatus === NetworkStatus.FAILED ||
    randomMangaCoverStatus === NetworkStatus.FAILED
  ) {
    return (
      <div>
        <h1
          className={`text-red-${
            darkMode ? '500' : '600'
          } text-lg text-center mt-5`}
        >
          Network Error
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div
        className="w-full h-52 bg-center bg-no-repeat bg-cover md:h-96
        "
        style={{
          backgroundImage: `url('../../../assets/images/manga_headline.png')`,
        }}
      >
        <div
          className={`bg-${
            darkMode ? 'black' : 'white'
          } w-full h-52 md:h-96 bg-opacity-50`}
        />
        <div className=" flex  ">
          <img
            aria-hidden="true"
            alt=""
            src={`${
              randomMangaCover
                ? `https://uploads.mangadex.org/covers/${randomMangaData?.mangaID}/${randomMangaCover}`
                : '../../assets/images/mobile_cover_art_not_available.png'
            }`}
            className="mx-5 -mt-20 w-40 h-52 rounded-md duration-500 hover:scale-110 cursor-pointer md:mx-10 
                        md:-mt-32  md:w-52 md:h-64"
            onClick={() => navigate(`/manga_read/${randomMangaData?.mangaID}`)}
          />
          <div className="mt-5">
            <h1
              className={`text-${
                darkMode ? 'white' : 'black'
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
