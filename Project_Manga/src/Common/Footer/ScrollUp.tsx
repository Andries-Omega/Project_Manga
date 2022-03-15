import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setScrollUp } from "../GlobalStateStore/GlobaStore";

export default function ScrollUp() {
  const showFooter = useSelector(
    (state: RootState) => state.globalState.showFooter
  );
  const dispatch = useDispatch();

  useEffect(() => {
    addEventListener("scroll", () => {
      scrollY > 600
        ? dispatch(setScrollUp(true))
        : dispatch(setScrollUp(false));
    });
  });
  return (
    <button
      className={
        showFooter
          ? "bg-blue-500 cursor-pointer fixed text-white rounded-lg h-12 px-5 shadow-2xl hover:bg-blue-800 bottom-0 w-12 right-0 mr-4 md:mr-6 mb-16 md:mb-10 hover:scale-110 duration-500"
          : "hidden"
      }
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}
