import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setPages } from "../ReadingManga_Store/ReadingManga_Store";
export default function Pages(props: any) {
  const pages = useSelector(
    (state: RootState) => state.mangaReadingState.pages
  );
  const dispatch = useDispatch();

  return (
    <div className="h-96">
      <button className="w-full bg-black text-white bg-opacity-30">
        Page 1 / {pages.length}
      </button>
    </div>
  );
}
