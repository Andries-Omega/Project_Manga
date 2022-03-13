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
      {/* Desktop View*/}
      <div className="hidden lg:flex items-center">
        <input
          type="search"
          className=" w-80 h-10 px-5 outline-none focus:border-b-2 focus:border-l-2 focus:border-t-2 border-blue-500 focus:ease-in focus:duration-300"
          placeholder="Search for manga..."
        />
        <button
          className=" bg-blue-500 w-10 h-10
                                    hover:bg-blue-700"
        >
          <i className="fa-solid fa-magnifying-glass text-lg text-white"></i>
        </button>
      </div>
      {/* Mobile View*/}
      <div className="flex lg:hidden items-center">
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
          className={
            darkMode
              ? "bg-gray-800 w-10 h-10 text-white"
              : " bg-slate-200 w-10 h-10 text-gray-800"
          }
          onClick={() => {
            mobileSearch
              ? console.log("Searching...")
              : dispatch(setMobileSearch(true));
          }}
        >
          <i className="fa-solid fa-magnifying-glass text-lg"></i>
        </button>
      </div>
    </>
  );
}
