import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MangaDetails } from "../../Model/Globase_Types";
import { RootState } from "../../store";

export default function MangaCard(props: any) {
  /**
   * So i got a bug that i managed to fix by forcing react to re render after certain seconds. This to help the cover image show
   */
  const [state, setState] = useState("");
  setTimeout(() => {
    setState("Just So The COmponent re renders");
  }, 2000);

  /**
   * Real code starts here:
   */
  const mangaDetails: MangaDetails = props.manga;
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const navigate = useNavigate();

  return (
    <div>
      {/* Desktop View */}
      <div
        className={`${
          darkMode
            ? "bg-slate-700 border-gray-400 border-2 border-l-0"
            : "bg-white"
        } md:grid grid-cols-1 md:grid-cols-2 gap-5 rounded-2xl shadow-2xl h-80 hidden`}
      >
        <div
          className=" bg-no-repeat bg-cover h-56 md:h-96 w-full -mt-7 rounded-md shadow-2xl
        duration-500  hover:scale-110 cursor-pointer"
          style={{
            backgroundImage: `url('${
              mangaDetails.mangaCover_IMG
                ? mangaDetails.mangaCover_IMG
                : "../../assets/images/manga_cover_art.png"
            }')`,
          }}
          onClick={() => navigate(`/manga_read/${mangaDetails?.mangaID}`)}
        ></div>
        <div className={`pr-5 ${darkMode ? " text-slate-50" : "text-black"}`}>
          <h3 className="font-bold text-lg mt-2 h-16">
            {mangaDetails.mangaTitle}
          </h3>

          <div className="h-[173px] overflow-y-auto mb-2">
            <p className=" break-all mr-3">{mangaDetails.mangaDescription}</p>
          </div>
          <button
            className="w-full bg-blue-500 h-10 text-white bottom-0 inset-x-0 z-10 mt-5 rounded-sm
                           hover:bg-blue-800 hover:scale-110 duration-500"
          >
            Read
          </button>
        </div>
      </div>
      {/* Mobile View */}
      <div
        className={`md:hidden grid gap-5 bg-${
          darkMode ? "slate-700 border-gray-400 border-2 border-t-0" : "white"
        }  rounded-2xl shadow-2xl mt-5`}
      >
        <div
          className="bg-no-repeat bg-cover h-52 md:h-96 -mt-10 rounded-md shadow-2xl
          duration-500 scale-110 cursor-pointer"
          style={{
            backgroundImage: `url('${
              mangaDetails.mangaCover_IMG
                ? mangaDetails.mangaCover_IMG
                : "../../assets/images/mobile_cover_art_not_available.png"
            }')`,
          }}
        ></div>
        <div className={`text-${darkMode ? "white" : "black"} pl-7 pr-3 pb-5`}>
          <h3 className="font-bold text-lg h-16">{mangaDetails.mangaTitle}</h3>
          <div className=" h-40 overflow-y-auto">
            <p className=" break-all mr-3">{mangaDetails.mangaDescription}</p>
          </div>
          <button
            className="w-full bg-blue-500 h-10 text-white bottom-0 inset-x-0 z-10 mt-5 rounded-sm
                           hover:bg-blue-800 hover:scale-110 duration-500"
            onClick={() => navigate(`/manga_read/${mangaDetails?.mangaID}`)}
          >
            Read
          </button>
        </div>
      </div>
    </div>
  );
}
