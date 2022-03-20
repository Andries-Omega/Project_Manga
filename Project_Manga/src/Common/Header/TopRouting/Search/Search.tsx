/* eslint-disable tailwindcss/no-custom-classname */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { setMobileSearch } from "../../../GlobalStateStore/GlobaStore";

export default function Search() {
  const mobileSearch = useSelector(
    (state: RootState) => state.globalState.mobileSearchOn
  );
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const dispatch = useDispatch();

  return (
    <>
      {/* Desktop View */}
      <div className="hidden items-center lg:flex">
        <input
          type="search"
          className=" px-5 w-80 h-10 focus:border-y-2 focus:border-l-2 border-blue-500 outline-none focus:duration-300 focus:ease-in"
          placeholder="Search for manga..."
        />
        <button
          type="button"
          className={`bg-blue-500 w-10 h-10
                                    hover:bg-blue-700  text-${
                                      darkMode ? "slate-800" : "white"
                                    }`}
        >
          <i className="text-lg fa-solid fa-magnifying-glass" />
        </button>
      </div>
      {/* Mobile View */}
      <div className="flex items-center lg:hidden">
        {mobileSearch && (
          <input
            type="search"
            className={
              darkMode
                ? " bg-gray-800 border-b-[1px] border-white w-52 pl-2 h-10 focus:outline-none text-white"
                : "bg-slate-200 border-b-[1px] border-black w-52 pl-2 h-10 focus:outline-none"
            }
            placeholder="Search for manga..."
          />
        )}
        <button
          type="button"
          className={
            darkMode
              ? "bg-gray-800 w-10 h-10 text-white"
              : " bg-slate-200 w-10 h-10 text-gray-800"
          }
          onClick={() => {
            mobileSearch ? search("") : dispatch(setMobileSearch(true));
          }}
        >
          <i className="text-lg fa-solid fa-magnifying-glass" />
        </button>
      </div>
    </>
  );
}

function search(mangaTitle: string) {
  // empty
}
