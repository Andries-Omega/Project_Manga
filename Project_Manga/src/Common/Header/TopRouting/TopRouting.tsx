import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Search from "./Search/Search";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import StateColorManaga from "./StateManage/StateColorManaga";

export default function TopRouting() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  return (
    <div
      className={
        darkMode
          ? "bg-gray-800 flex justify-around p-2 w-full ease-in duration-500"
          : "bg-slate-200 flex justify-around p-2 w-full ease-in duration-500"
      }
    >
      <img
        src={
          darkMode
            ? "./assets/images/TheLogo_DarkMode.png"
            : "./assets/images/TheLogo.png"
        }
        className="w-16 h-16"
      />
      <Search />
      <div className="flex px-5 items-center justify-between">
        <div className="mr-5">
          <SignIn />
        </div>
        <div className="mr-5">
          <SignUp />
        </div>
        <div>
          <StateColorManaga />
        </div>
      </div>
    </div>
  );
}
