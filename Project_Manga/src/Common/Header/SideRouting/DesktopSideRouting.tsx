/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";
import { setSideMouseHover } from "../../GlobalStateStore/GlobaStore";

export default function DesktopSideRouting() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const mouseHover = useSelector(
    (state: RootState) => state.globalState.sideHeaderMouseHover
  );
  const currentPage = useSelector(
    (state: RootState) => state.globalState.currentPage
  );

  const dispatch = useDispatch();
  return (
    <div
      className={`${darkMode ? "bg-gray-800" : "bg-slate-200"}
  ${
    mouseHover ? "w-52" : "w-16"
  } float-left h-screen pt-5 ease-in duration-500 rounded-br-lg 
  ${mouseHover ? "opacity-[.94]" : ""}`}
      onMouseEnter={() => {
        dispatch(setSideMouseHover(true));
      }}
      onMouseLeave={() => {
        dispatch(setSideMouseHover(false));
      }}
    >
      <div
        className={`grid ${
          mouseHover ? "place-items-start" : " place-items-center"
        } gap-10`}
      >
        <Link
          to="/"
          className={`${chooseNavClass(
            currentPage,
            "/",
            darkMode
          )} text-lg cursor-pointer`}
        >
          <span className={mouseHover ? "pl-4" : ""}>
            <i className="fa-solid fa-house " />
          </span>

          <span className={mouseHover ? " ml-5" : "hidden"}>Home</span>
        </Link>

        <Link
          to="#"
          className={`${chooseNavClass(
            currentPage,
            "create_manga",
            darkMode
          )} text-lg cursor-pointer `}
        >
          <span className={mouseHover ? "pl-4" : ""}>
            <i className="fa-solid fa-gears" />
          </span>

          <span className={mouseHover ? "ml-5" : "hidden"}>Create Manga</span>
        </Link>

        <Link
          to="#"
          className={`${chooseNavClass(
            currentPage,
            "liked_mangas",
            darkMode
          )} text-lg cursor-pointer  `}
        >
          <span className={mouseHover ? "pl-4" : ""}>
            <i className="fa-solid fa-heart" />
          </span>

          <span className={mouseHover ? "ml-5" : "hidden"}>Liked Manga</span>
        </Link>
        <Link
          to="#"
          className={`${chooseNavClass(
            currentPage,
            "read_manga",
            darkMode
          )} text-lg cursor-pointer `}
        >
          <span className={mouseHover ? "pl-4" : ""}>
            <i className="fa-solid fa-book-open" />
          </span>

          <span className={mouseHover ? "ml-5" : "hidden"}>Read Manga</span>
        </Link>
      </div>
    </div>
  );
}

function chooseNavClass(
  currentPage: string,
  checkCurrent: string,
  darkMode: boolean
): string {
  let theClass = "";
  const isCurrentPage =
    currentPage === checkCurrent ? "text-blue-500 hover:text-blue-700" : "";
  if (!isCurrentPage) {
    theClass = darkMode
      ? "text-white hover:text-blue-500"
      : "text-black hover:text-blue-500";
  } else {
    theClass = isCurrentPage;
  }

  return theClass;
}
