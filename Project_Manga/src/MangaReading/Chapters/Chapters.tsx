import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

import { setOpenedChapter } from '../ReadingManga_Store/ReadingManga_Store';

export default function Chapters() {
  const openedChapter = useSelector(
    (state: RootState) => state.mangaReadingState.openedChapter
  );
  const chapters = useSelector(
    (state: RootState) => state.mangaReadingState.chapters
  );
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const volumeSelection = useSelector(
    (state: RootState) => state.mangaReadingState.volumeSelection
  );
  const openedVolume = useSelector(
    (state: RootState) => state.mangaReadingState.openedVolume
  );
  const filteredChapters = chapters.filter(
    (chapter) => chapter.volume === openedVolume.volume
  );

  const disptach = useDispatch();

  return (
    <div
      className={`pt-5 h-[550px] border-[1px] border-${
        darkMode ? 'white' : 'black'
      } rounded-md mt-2 ${
        volumeSelection ? 'hidden' : ''
      } overflow-y-auto overflow-x-hidden`}
    >
      {filteredChapters.map((chapter) => (
        <div
          role="button"
          aria-hidden="true"
          className={`text-lg justify-center ${
            chapter.id === openedChapter.id ? 'scale-110' : ''
          } hover:scale-110 duration-500 ${
            darkMode ? ' hover:bg-slate-500' : 'hover:bg-slate-50'
          }
         mb-5 border-[1px] border-${
           darkMode ? 'white' : 'black'
         } h-16  border-x-0 mr-4 ml-4 cursor-pointer text-center ${
            chapter.pages ? '' : 'items-center flex'
          }`}
          onClick={() => {
            disptach(setOpenedChapter(chapter));
          }}
          key={chapter.id}
        >
          <h1 className="text-lg">Chapter {chapter.chapter}</h1>
          {chapter.pages && (
            <p className=" text-sm">Has {chapter?.pages?.length} Pages</p>
          )}
        </div>
      ))}
    </div>
  );
}
