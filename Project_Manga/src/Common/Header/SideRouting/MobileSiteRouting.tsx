import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function MobileSiteRouting() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );

  const currentPage = useSelector(
    (state: RootState) => state.globalState.currentPage
  );
  return (
    <div
      className={`fixed bottom-0 inset-x-0 flex justify-around items-center ${
        darkMode ? "bg-gray-800" : "bg-slate-200"
      } rounded-t-xl h-12`}
    >
      <div>
        <a
          className={`${
            currentPage === "/"
              ? "text-blue-500 "
              : darkMode
              ? "text-white "
              : "text-black "
          } text-xl cursor-pointer`}
        >
          <span>
            <i className="fa-solid fa-house "></i>
          </span>
        </a>
      </div>
      <div>
        <a
          className={`${
            currentPage === "create_manga"
              ? "text-blue-500"
              : darkMode
              ? "text-white "
              : "text-black "
          } text-xl cursor-pointer `}
        >
          <span>
            <i className="fa-solid fa-gears"></i>
          </span>
        </a>
      </div>
      <div>
        <a
          className={`${
            currentPage === "liked_mangas"
              ? "text-blue-500 "
              : darkMode
              ? "text-white "
              : "text-black "
          } text-xl cursor-pointer  `}
        >
          <span>
            <i className="fa-solid fa-heart"></i>
          </span>
        </a>
      </div>
      <div>
        <a
          className={`${
            currentPage === "read_manga"
              ? "text-blue-500 "
              : darkMode
              ? "text-white "
              : "text-black "
          } text-xl cursor-pointer `}
        >
          <span>
            <i className="fa-solid fa-book-open"></i>
          </span>
        </a>
      </div>
    </div>
  );
}
