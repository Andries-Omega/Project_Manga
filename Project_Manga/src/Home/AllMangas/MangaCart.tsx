import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setOpenedChapter,
  setOpenedPage,
  setOpenedVolume,
} from '../../MangaReading/ReadingManga_Store/ReadingManga_Store';
import { MangaChapter, MangaVolume } from '../../Model/Globase_Types';
import { RootState } from '../../store';

export default function MangaCard(props: any) {
  /**
   * So i got a bug that i managed to fix by forcing react to re render after certain seconds. This to help the cover image show
   */
  const [, setState] = useState('');
  setTimeout(() => {
    setState('Just So The COmponent re renders');
  }, 2000);

  /**
   * Real code starts here:
   */
  const { manga: mangaDetails } = props;
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      {/* Desktop View */}
      <div
        className={`${
          darkMode
            ? 'bg-slate-700 border-gray-400 border-2 border-l-0'
            : 'bg-white'
        } md:grid grid-cols-1 md:grid-cols-2 gap-5 rounded-2xl shadow-2xl h-80 hidden`}
      >
        <div
          role="button"
          aria-hidden="true"
          className=" -mt-7 w-full h-56 bg-no-repeat bg-cover rounded-md shadow-2xl duration-500
        hover:scale-110  cursor-pointer md:h-96"
          style={{
            backgroundImage: `url('${
              mangaDetails.mangaCover_IMG
                ? mangaDetails.mangaCover_IMG
                : '../../assets/images/manga_cover_art.png'
            }')`,
          }}
          onClick={() => {
            // make sure the opened chapter and volume section is null before redirection
            dispatch(setOpenedVolume({} as MangaVolume));
            dispatch(setOpenedChapter({} as MangaChapter));
            dispatch(setOpenedPage(0));
            navigate(`/manga_read/${mangaDetails?.mangaID}`);
          }}
        />
        <div className={`pr-5 ${darkMode ? ' text-slate-50' : 'text-black'}`}>
          <h3 className="mt-2 h-16 text-lg font-bold">
            {mangaDetails.mangaTitle}
          </h3>

          <div className="overflow-y-auto mb-2 h-[173px]">
            <p className=" mr-3 break-all">{mangaDetails.mangaDescription}</p>
          </div>
          <button
            type="button"
            className="inset-x-0 bottom-0 z-10 mt-5 w-full h-10 text-white bg-blue-500 hover:bg-blue-800
                           rounded-sm duration-500 hover:scale-110"
            onClick={() => {
              // make sure the opened chapter and volume section is null before redirection
              dispatch(setOpenedVolume({} as MangaVolume));
              dispatch(setOpenedChapter({} as MangaChapter));
              dispatch(setOpenedPage(0));
              navigate(`/manga_read/${mangaDetails?.mangaID}`);
            }}
          >
            Read
          </button>
        </div>
      </div>
      {/* Mobile View */}
      <div
        className={`md:hidden grid gap-5 bg-${
          darkMode ? 'slate-700 border-gray-400 border-2 border-t-0' : 'white'
        }  rounded-2xl shadow-2xl mt-5`}
      >
        <div
          className="-mt-10 h-52 bg-no-repeat bg-cover rounded-md shadow-2xl duration-500
          scale-110 cursor-pointer md:h-96"
          style={{
            backgroundImage: `url('${
              mangaDetails.mangaCover_IMG
                ? mangaDetails.mangaCover_IMG
                : '../../assets/images/mobile_cover_art_not_available.png'
            }')`,
          }}
          onClick={() => {
            // make sure the opened chapter and volume section is null before redirection
            dispatch(setOpenedVolume({} as MangaVolume));
            dispatch(setOpenedChapter({} as MangaChapter));
            dispatch(setOpenedPage(0));
            navigate(`/manga_read/${mangaDetails?.mangaID}`);
          }}
        />
        <div className={`text-${darkMode ? 'white' : 'black'} pl-7 pr-3 pb-5`}>
          <h3 className="h-16 text-lg font-bold">{mangaDetails.mangaTitle}</h3>
          <div className=" overflow-y-auto h-40">
            <p className=" mr-3 break-all">{mangaDetails.mangaDescription}</p>
          </div>
          <button
            type="button"
            className="inset-x-0 bottom-0 z-10 mt-5 w-full h-10 text-white bg-blue-500 hover:bg-blue-800
                           rounded-sm duration-500 hover:scale-110"
            onClick={() => {
              // make sure the opened chapter and volume section is null before redirection
              dispatch(setOpenedVolume({} as MangaVolume));
              dispatch(setOpenedChapter({} as MangaChapter));
              dispatch(setOpenedPage(0));
              navigate(`/manga_read/${mangaDetails?.mangaID}`);
            }}
          >
            Read
          </button>
        </div>
      </div>
    </div>
  );
}
