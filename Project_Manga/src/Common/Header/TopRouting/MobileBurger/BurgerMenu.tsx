import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { setMobileBurger } from "../../../GlobalStateStore/GlobaStore";
import StateColorManaga from "../StateManage/StateColorManaga";

export default function BurgerMenu() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const burgerOpen = useSelector(
    (state: RootState) => state.globalState.mobileBurgerOn
  );
  const dispatch = useDispatch();

  return (
    <div
      className="grid gap-2 place-content-end w-10 overflow-x-hidden"
      onClick={() => {
        dispatch(setMobileBurger(!burgerOpen));
      }}
    >
      <div
        className={`border-[1px] 
        ${darkMode ? "border-white" : "border-black"} ${
          burgerOpen ? "w-6 rotate-45 translate-y-1" : "w-7"
        }  duration-500`}
      ></div>
      <div
        className={`border-[1px] ${
          darkMode ? "border-white" : "border-black"
        } w-6 ml-1 duration-500 ${burgerOpen ? "hidden" : ""}`}
      ></div>
      <div
        className={
          burgerOpen
            ? `border-[1px] ${
                darkMode ? "border-white" : "border-black"
              } w-6 -rotate-45 -translate-y-1 duration-700`
            : `border-[1px] ${
                darkMode ? "border-white" : "border-black"
              } w-7 duration-700`
        }
      ></div>
      <div
        className={
          burgerOpen
            ? `h-screen mt-[38px] w-80 ${
                darkMode ? "bg-slate-700" : "bg-slate-100"
              } right-0 fixed duration-700 pt-5`
            : `h-screen mt-10 w-80 ${
                darkMode ? "bg-slate-700" : "bg-slate-100"
              } -right-[400px] fixed duration-700 pt-5`
        }
      >
        <div
          className={`flex justify-around ${
            darkMode ? "border-gray-500" : "border-gray-700"
          } border-x-0 border-[1px] h-[50px] items-center`}
        >
          <h1
            className={`
              ${darkMode ? "text-white" : ""} "text-lg  font-mono`}
          >
            {darkMode ? "Dark Mode" : "Light Mode"}
          </h1>
          <StateColorManaga />
        </div>
        <div
          className={`${
            darkMode ? "border-gray-500" : "border-gray-700"
          } flex justify-around border-x-0 border-[1px] h-[50px] items-center mt-5`}
        >
          <i
            className={`fa-solid fa-arrow-right-to-bracket text-${
              darkMode ? "white" : "black"
            }`}
          ></i>
          <h1
            className={`
               ${darkMode ? "text-white" : ""} "text-lg  font-mono`}
          >
            Sign In
          </h1>
        </div>
        <div
          className={`${
            darkMode ? "border-gray-500" : "border-gray-700"
          } flex justify-around border-x-0 border-[1px] h-[50px] items-center mt-5`}
        >
          <i
            className={`fa-solid fa-user-plus ${darkMode ? "text-white" : ""}`}
          ></i>
          <h1
            className={`
             ${darkMode ? "text-white" : ""} "text-lg  font-mono`}
          >
            Sign Up
          </h1>
        </div>
      </div>
    </div>
  );
}
