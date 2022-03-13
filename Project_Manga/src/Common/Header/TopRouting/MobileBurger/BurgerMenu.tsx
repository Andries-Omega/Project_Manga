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
  let borderColor = darkMode ? "border-white" : "border-black"; // change burger color depending on whether we on dark mode or not
  let backgroundColor = darkMode ? "bg-slate-700" : "bg-slate-100";
  return (
    <div
      className="grid gap-2 place-content-end w-10 overflow-x-hidden"
      onClick={() => {
        dispatch(setMobileBurger(!burgerOpen));
      }}
    >
      <div
        className={
          burgerOpen
            ? `border-[1px] ${borderColor} w-6 rotate-45 translate-y-1 duration-500`
            : `border-[1px] ${borderColor} w-7 duration-500`
        }
      ></div>
      <div
        className={
          burgerOpen
            ? `hidden`
            : `border-[1px] ${borderColor} w-6 ml-1 duration-500`
        }
      ></div>
      <div
        className={
          burgerOpen
            ? `border-[1px] ${borderColor} w-6 -rotate-45 -translate-y-1 duration-700`
            : `border-[1px] ${borderColor} w-7 duration-700`
        }
      ></div>
      <div
        className={
          burgerOpen
            ? `h-screen mt-10 w-80 ${backgroundColor} right-0 fixed duration-700 pt-5`
            : `h-screen mt-10 w-80 ${backgroundColor} -right-[400px] fixed duration-700 pt-5`
        }
      >
        <div
          className={
            darkMode
              ? "flex justify-around border-gray-500 border-x-0 border-[1px] h-[50px] items-center"
              : "flex justify-around border-gray-700 border-x-0 border-[1px] h-[50px] items-center"
          }
        >
          <h1
            className={
              darkMode ? "text-lg font-mono text-white" : "text-lg  font-mono"
            }
          >
            {darkMode ? "Dark Mode" : "Light Mode"}
          </h1>
          <StateColorManaga />
        </div>
        <div
          className={
            darkMode
              ? "flex justify-around border-gray-500 border-x-0 border-[1px] h-[50px] items-center mt-5"
              : "flex justify-around border-gray-700 border-x-0 border-[1px] h-[50px] items-center mt-5"
          }
        >
          <i
            className={
              darkMode
                ? "fa-solid fa-arrow-right-to-bracket text-white"
                : "fa-solid fa-arrow-right-to-bracket"
            }
          ></i>
          <h1
            className={
              darkMode ? "text-lg font-mono text-white" : "text-lg  font-mono"
            }
          >
            Sign In
          </h1>
        </div>
        <div
          className={
            darkMode
              ? "flex justify-around border-gray-500 border-x-0 border-[1px] h-[50px] items-center mt-5"
              : "flex justify-around border-gray-700 border-x-0 border-[1px] h-[50px] items-center mt-5"
          }
        >
          <i
            className={
              darkMode
                ? "fa-solid fa-user-plus text-white"
                : "fa-solid fa-user-plus"
            }
          ></i>
          <h1
            className={
              darkMode ? "text-lg font-mono text-white" : "text-lg  font-mono"
            }
          >
            Sign Up
          </h1>
        </div>
        <div className=" flex justify-center items-center h-96">
          <img
            src="./assets/images/favicon.png"
            className=" h-52 w-52 animate-spin"
          />
        </div>
      </div>
    </div>
  );
}
