import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setOpenedChapter,
  setOpenedVolume,
  setVolumeSelection,
} from "../ReadingManga_Store/ReadingManga_Store";

export default function Volumes() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const volumes = useSelector(
    (state: RootState) => state.mangaReadingState.volumes
  );
  const volumeSelection = useSelector(
    (state: RootState) => state.mangaReadingState.volumeSelection
  );
  const openedVolume = useSelector(
    (state: RootState) => state.mangaReadingState.openedVolume
  );
  const dispatch = useDispatch();

  return (
    <div className="w-full">
      <button
        className={`bg-blue-500 w-full h-10 rounded-md text-${
          darkMode ? "black" : "white"
        }`}
        onClick={() => dispatch(setVolumeSelection(!volumeSelection))}
      >
        Volume {openedVolume.volume}
        <span className="icon">
          <i
            className={`fa-solid fa-caret-${
              volumeSelection ? "up" : "down"
            } float-right mr-8 duration-200`}
          ></i>
        </span>
      </button>
      <div
        className={`pt-5 ${
          volumeSelection
            ? darkMode
              ? "bg-slate-800"
              : "bg-slate-200"
            : "hidden"
        } h-[550px] w-full mt-2 rounded-md overflow-y-auto overflow-x-hidden`}
      >
        {volumes.map((volume, i) => {
          return (
            <div
              className={`text-lg justify-center hover:scale-110 duration-500 ${
                darkMode ? " hover:bg-slate-500" : "hover:bg-slate-50"
              }
               mb-5 border-[1px] border-${
                 darkMode ? "white" : "black"
               } h-10 flex  items-center border-x-0 mr-2 ml-2 cursor-pointer`}
              onClick={() => {
                dispatch(setOpenedVolume(volumes[i]));
                dispatch(setOpenedChapter(volume.chapters[0]));
                dispatch(setVolumeSelection(false));
              }}
            >
              Volume {volume.volume}
            </div>
          );
        })}
      </div>
    </div>
  );
}
