import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { setDarkMode } from "../../../GlobalStateStore/GlobaStore";

export default function StateColorManaga() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const dispatch = useDispatch();
  return (
    <div
      className={
        darkMode
          ? " cursor-pointer rounded-full w-20 h-10 bg-slate-300 bg-opacity-50 grid content-center place-content-end ease-in duration-500"
          : " cursor-pointer rounded-full w-20 h-10 bg-slate-300 bg-opacity-50 grid content-center place-content-start ease-out duration-500"
      }
      onClick={() => {
        dispatch(setDarkMode(!darkMode));
      }}
    >
      <button
        className=" rounded-full h-10 w-10 bg-blue-500 align-middle"
        onClick={() => {
          dispatch(setDarkMode(!darkMode));
        }}
      >
        <i
          className={
            darkMode
              ? "fa-solid fa-sun ease-in duration-500 "
              : "fa-solid fa-moon ease-in duration-500 text-white"
          }
        ></i>
      </button>
    </div>
  );
}
