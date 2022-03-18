import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getMangaPages } from "../MangaReading_Networks/MangaReadingNetwork";
import { setOpenedPage } from "../ReadingManga_Store/ReadingManga_Store";

export default function Pages() {
  const [listOfPages, setListOfPages] = useState(false);
  const openedChapter = useSelector(
    (state: RootState) => state.mangaReadingState.openedChapter
  );
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const openedPage = useSelector(
    (state: RootState) => state.mangaReadingState.openedPage
  );
  const dispatch = useDispatch();
  if (!openedChapter.pages || openedChapter.pages.length <= 0) {
    const { data: reading_Manga_Pages, status: readingMangaPagesStatus } =
      useQuery("readingMangaPage", () => getMangaPages(openedChapter));
    if (reading_Manga_Pages) {
      console.log("ON Reading ", reading_Manga_Pages);
      //dispatch(setOpenedPage(0));
    }
  }
  const next = () => {
    let theNext = openedPage + 1;
    if (theNext >= openedChapter.pages.length) {
      return openedChapter.pages.length - 1;
    } else {
      return theNext;
    }
  };

  const previous = () => {
    let thePrevious = openedPage - 1;
    if (thePrevious < 0) {
      return 0;
    } else {
      return thePrevious;
    }
  };

  return (
    <div className={`h-[610px] w-full grid pr-3`}>
      <button
        className={`w-full bg-blue-500  duration-300 h-10 rounded-md text-${
          darkMode ? "black" : "white"
        }`}
        onClick={() => setListOfPages(!listOfPages)}
      >
        Page {openedPage + 1} / {openedChapter?.pages?.length}
        <span className="icon">
          <i
            className={`fa-solid fa-caret-${
              listOfPages ? "up" : "down"
            } float-right mr-8 duration-200`}
          ></i>
        </span>
      </button>
      <div
        className={` ${
          listOfPages ? (darkMode ? "bg-slate-800" : "bg-slate-200") : "hidden"
        } h-[550px] w-full mt-2 rounded-md overflow-y-auto border-[1px] border-${
          darkMode ? "white" : "black"
        } overflow-x-hidden`}
      >
        {openedChapter?.pages?.map((page, i) => {
          return (
            <div
              className={`text-lg justify-center hover:scale-110 duration-500 ${
                darkMode ? " hover:bg-slate-500" : "hover:bg-slate-50"
              }
               mb-5 border-[1px] border-${
                 darkMode ? "white" : "black"
               } h-10 flex items-center border-x-0 mr-2 ml-2 cursor-pointer`}
              onClick={() => {
                dispatch(setOpenedPage(i));
                setListOfPages(false);
              }}
            >
              Page {i + 1}
            </div>
          );
        })}
      </div>
      {/* place content in center */}
      <div
        className={`mt-2 ${
          listOfPages
            ? "hidden"
            : " w-full  flex justify-around mb-3  items-center overflow-y-auto "
        }  border-[1px] border-${darkMode ? "white" : "black"} rounded-md`}
      >
        <div
          className=" cursor-pointer hover:text-blue-500  duration-500 sticky"
          onClick={() => dispatch(setOpenedPage(previous()))}
        >
          <i className="fa-solid fa-angle-left text-xl hover:scale-150 duration-500"></i>
        </div>

        <img
          src={
            openedChapter.baseUrl +
            "/data/" +
            openedChapter.hash +
            "/" +
            openedChapter?.pages[openedPage]
          }
          className=" rounded-md w-72 md:w-[450px]"
        />
        <div
          className="cursor-pointer hover:text-blue-500  duration-500"
          onClick={() => dispatch(setOpenedPage(next()))}
        >
          <i className="fa-solid fa-chevron-right text-xl hover:scale-150 duration-500 "></i>
        </div>
      </div>
    </div>
  );
}

function ListOfPages() {
  return <div>Pages</div>;
}
