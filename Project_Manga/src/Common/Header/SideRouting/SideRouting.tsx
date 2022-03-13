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

  let bgColor = darkMode ? "bg-gray-800" : "bg-slate-200"; // For BG Color to respond to darkmode or light mode
  return (
    <div
      className={
        mouseHover
          ? `${bgColor} w-52 float-left h-screen pt-5 ease-in duration-500 rounded-br-lg opacity-[.94]`
          : `${bgColor} w-16 float-left h-screen pt-5 ease-out duration-1000 rounded-br-lg`
      }
      onMouseEnter={() => {
        dispatch(setSideMouseHover(true));
      }}
      onMouseLeave={() => {
        dispatch(setSideMouseHover(false));
      }}
    >
      <div className="grid place-items-center ">
        <div>
          <a
            className={
              currentPage === "/"
                ? " text-blue-500 text-xl cursor-pointer hover:text-blue-700 font-mono"
                : "text-black text-xl cursor-pointer hover:text-blue-500 font-mono"
            }
          >
            <span className="mr-3">
              <i className="fa-solid fa-house "></i>
            </span>

            <span className={mouseHover ? "" : "hidden"}>Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}
