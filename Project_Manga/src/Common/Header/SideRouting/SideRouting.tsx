import { useReducer } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface IViewState {
  mouseEntered: boolean;
  currentPage: string;
}

const viewState: IViewState = {
  mouseEntered: false,
  currentPage: "/",
};

const reducer = (
  state: IViewState,
  action: {
    type: string;
    payload?: any;
  }
) => {
  switch (action.type) {
    case "mouseEntered":
      return {
        ...state,
        mouseEntered: action.payload,
      };
    case "mouseLeft":
      return {
        ...state,
        mouseEntered: action.payload,
      };
    case "navigate":
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};
export default function SideRouting() {
  const [state, dispatch] = useReducer(reducer, viewState);
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );

  let bgColor = darkMode ? "bg-gray-800" : "bg-slate-200"; // For BG Color to respond to darkmode or light mode
  return (
    <div
      className={
        state.mouseEntered
          ? `${bgColor} w-52 float-left h-screen pt-5 ease-in duration-500 rounded-br-lg opacity-[.94]`
          : `${bgColor} w-16 float-left h-screen pt-5 ease-out duration-1000 rounded-br-lg`
      }
      onMouseEnter={() => {
        dispatch({ type: "mouseEntered", payload: true });
      }}
      onMouseLeave={() => {
        dispatch({ type: "mouseLeft", payload: false });
      }}
    >
      <div className="grid place-items-center ">
        <div>
          <a
            className={
              state.currentPage === "/"
                ? " text-blue-500 text-xl cursor-pointer hover:text-blue-700 font-mono"
                : "text-black text-xl cursor-pointer hover:text-blue-500 font-mono"
            }
          >
            <span className="mr-3">
              <i className="fa-solid fa-house "></i>
            </span>

            <span className={state.mouseEntered ? "" : "hidden"}>Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}
