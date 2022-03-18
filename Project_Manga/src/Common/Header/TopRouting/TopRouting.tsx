import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { setMobileSearch } from "../../GlobalStateStore/GlobaStore";
import BurgerMenu from "./MobileBurger/BurgerMenu";
import Search from "./Search/Search";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import StateColorManaga from "./StateManage/StateColorManaga";

export default function TopRouting() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const mobileSearch = useSelector(
    (state: RootState) => state.globalState.mobileSearchOn
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      {/* Desktop View*/}
      <div
        className={
          darkMode
            ? "bg-gray-800 lg:flex justify-around p-2 w-full ease-in duration-500 hidden"
            : "bg-slate-200 lg:flex justify-around p-2 w-full ease-in duration-500 hidden"
        }
      >
        <img
          src={
            darkMode
              ? "assets/images/TheLogo_DarkMode.png"
              : "assets/images/TheLogo.png"
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
      {/* Mobile View*/}
      <div
        className={
          darkMode
            ? "bg-gray-800 md:hidden justify-between p-2 w-full ease-in duration-500 flex"
            : "bg-slate-200 md:hidden justify-between p-2 w-full ease-in duration-500 flex"
        }
      >
        {mobileSearch && (
          <button
            className={
              darkMode
                ? "bg-gray-800 w-10 h-10 text-white"
                : " bg-slate-200 w-10 h-10 text-gray-800"
            }
            onClick={() => {
              dispatch(setMobileSearch(false));
            }}
          >
            <i className="fa-solid fa-arrow-left-long"></i>
          </button>
        )}
        <img
          src={
            darkMode
              ? "./assets/images/TheLogo_DarkMode.png"
              : "./assets/images/TheLogo.png"
          }
          className={mobileSearch ? "hidden" : "w-12 h-12 ml-5"}
        />
        <div className="flex  items-center justify-between">
          <div>
            <Search />
          </div>
          <div>
            <BurgerMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
