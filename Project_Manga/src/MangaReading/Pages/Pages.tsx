import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setOpenedPage } from "../ReadingManga_Store/ReadingManga_Store";

export default function Pages() {
  const [listOfPages, setListOfPages] = useState(false);
  const openedChapter = useSelector(
    (state: RootState) => state.mangaReadingState.openedChapter
  );
  const openedPage = useSelector(
    (state: RootState) => state.mangaReadingState.openedPage
  );
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
  const dispatch = useDispatch();

  return (
    <div className="h-[600px] w-full grid pr-3">
      <button
        className="w-full bg-black text-white bg-opacity-50 hover:bg-opacity-100 duration-300 h-10 rounded-sm"
        onClick={() => setListOfPages(!listOfPages)}
      >
        {openedPage + 1} / {openedChapter.pages.length}
        <span className="icon">
          <i
            className={`fa-solid fa-caret-${
              listOfPages ? "up" : "down"
            } float-right mr-8 duration-200`}
          ></i>
        </span>
      </button>

      {/* place content in center */}
      <div className=" w-full  flex justify-around overflow-y-auto mb-3 items-center">
        <div
          className=" cursor-pointer hover:text-blue-500  duration-500 sticky "
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
            openedChapter.pages[openedPage]
          }
          className=" rounded-md "
        />
        <div
          className="cursor-pointer hover:text-blue-500  duration-500"
          onClick={() => dispatch(setOpenedPage(next()))}
        >
          <i className="fa-solid fa-chevron-right text-xl hover:scale-150 duration-500"></i>
        </div>
      </div>
    </div>
  );
}

function ListOfPages() {
  return <div>Pages</div>;
}
