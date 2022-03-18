import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
  let filteredChapters = chapters.filter(
    (chapter) => chapter.volume == openedVolume.volume
  );

  return (
    <div
      className={`pt-5 h-[550px] border-[1px] border-${
        darkMode ? "white" : "black"
      } rounded-md mt-2 ${
        volumeSelection ? "hidden" : ""
      } overflow-y-auto overflow-x-hidden`}
    >
      {filteredChapters.map((chapter) => {
        return (
          <div
            className={`text-lg justify-center ${
              chapter.id === openedChapter.id ? "scale-110" : ""
            } hover:scale-110 duration-500 ${
              darkMode ? " hover:bg-slate-500" : "hover:bg-slate-50"
            }
         mb-5 border-[1px] border-${
           darkMode ? "white" : "black"
         } h-16  border-x-0 mr-4 ml-4 cursor-pointer text-center ${
              chapter.pages ? "" : "items-center flex"
            }`}
            onClick={() => {}}
          >
            <h1 className="text-lg">Chapter {chapter.chapter}</h1>
            {chapter.pages && (
              <p className=" text-sm">Has {chapter?.pages?.length} Pages</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
