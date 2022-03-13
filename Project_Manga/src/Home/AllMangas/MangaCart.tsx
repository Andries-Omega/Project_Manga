import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MangaDetails } from "../Mangas_Store/HomeManga";

export default function MangaCard(props: any) {
  const mangaDetails: MangaDetails = props.manga;
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  return (
    <div
      className={
        darkMode
          ? " bg-slate-700 border-gray-400 border-2 grid grid-cols-2 gap-5 rounded-2xl shadow-2xl h-80"
          : "bg-white grid grid-cols-2 gap-5 rounded-2xl shadow-2xl h-80"
      }
    >
      <div
        className=" bg-no-repeat bg-cover h-96 w-full -mt-7 rounded-md shadow-2xl
        duration-500  hover:scale-110 cursor-pointer"
        style={{
          backgroundImage: `url('${
            mangaDetails.mangaCover_IMG
              ? mangaDetails.mangaCover_IMG
              : "../../assets/images/manga_cover_art.png"
          }')`,
        }}
      ></div>
      <div className={darkMode ? "pr-5 text-slate-50" : "pr-5 text-black"}>
        <h3 className="font-bold text-lg mt-2 h-16">
          {mangaDetails.mangaTitle}
        </h3>

        <div className="h-[173px] overflow-y-auto mb-2">
          <p className={darkMode ? "" : ""}>{mangaDetails.mangaDescription}</p>
        </div>
        <button
          className="w-full bg-blue-500 h-10 text-white bottom-0 inset-x-0 z-10 mt-5 rounded-sm
                           hover:bg-blue-800 hover:scale-110 duration-500"
        >
          Read
        </button>
      </div>
    </div>
  );
}
