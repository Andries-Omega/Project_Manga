import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setSideMouseHover } from "../../GlobalStateStore/GlobaStore";

export default function SideRouting() {
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
    <div>
      {/* Desktop view*/}
      <div
        className={`${darkMode ? "bg-gray-800" : "bg-slate-200"}
        ${
          mouseHover ? "w-52" : "w-16"
        } float-left h-screen pt-5 ease-in duration-500 rounded-br-lg 
        ${mouseHover ? "opacity-[.94]" : ""} md:block hidden`}
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
          <div>
            <a
              className={`${
                currentPage === "/"
                  ? "text-blue-500 hover:text-blue-700"
                  : darkMode
                  ? "text-white hover:text-blue-500"
                  : "text-black hover:text-blue-500"
              } text-lg cursor-pointer`}
            >
              <span className={mouseHover ? "pl-4" : ""}>
                <i className="fa-solid fa-house "></i>
              </span>

              <span className={mouseHover ? " ml-5" : "hidden"}>Home</span>
            </a>
          </div>
          <div>
            <a
              className={`${
                currentPage === "create_manga"
                  ? "text-blue-500 hover:text-blue-700"
                  : darkMode
                  ? "text-white hover:text-blue-500"
                  : "text-black hover:text-blue-500"
              } text-lg cursor-pointer `}
            >
              <span className={mouseHover ? "pl-4" : ""}>
                <i className="fa-solid fa-gears"></i>
              </span>

              <span className={mouseHover ? "ml-5" : "hidden"}>
                Create Manga
              </span>
            </a>
          </div>
          <div>
            <a
              className={`${
                currentPage === "liked_mangas"
                  ? "text-blue-500 hover:text-blue-700"
                  : darkMode
                  ? "text-white hover:text-blue-500"
                  : "text-black hover:text-blue-500"
              } text-lg cursor-pointer  `}
            >
              <span className={mouseHover ? "pl-4" : ""}>
                <i className="fa-solid fa-heart"></i>
              </span>

              <span className={mouseHover ? "ml-5" : "hidden"}>
                Liked Manga
              </span>
            </a>
          </div>
          <div>
            <a
              className={`${
                currentPage === "read_manga"
                  ? "text-blue-500 hover:text-blue-700"
                  : darkMode
                  ? "text-white hover:text-blue-500"
                  : "text-black hover:text-blue-500"
              } text-lg cursor-pointer `}
            >
              <span className={mouseHover ? "pl-4" : ""}>
                <i className="fa-solid fa-book-open"></i>
              </span>

              <span className={mouseHover ? "ml-5" : "hidden"}>Read Manga</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
