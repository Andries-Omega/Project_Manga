import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setOpenedChapter,
  setOpenedVolume,
  setVolumeSelection,
} from "../ReadingManga_Store/ReadingManga_Store";

export default function Volumes() {
  const volumes = useSelector(
    (state: RootState) => state.mangaReadingState.volumes
  );
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
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
        type="button"
        className={`bg-blue-500 w-full h-10 rounded-md text-${
          darkMode ? "black" : "white"
        }`}
        onClick={() => dispatch(setVolumeSelection(!volumeSelection))}
      >
        Volume{" "}
        {openedVolume.volume
          ? openedVolume.volume + " / " + volumes.length
          : "?"}
        <span>
          <i
            className={`fa-solid fa-caret-${
              volumeSelection ? "up" : "down"
            } float-right mr-8 duration-200`}
          />
        </span>
      </button>
      <div className={`${listOfVolumesClass(volumeSelection, darkMode)}`}>
        {volumes.map((volume, i) => (
          <div
            role="button"
            aria-hidden="true"
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
            key={`${volume.volume} - ${volume.volume}`}
          >
            Volume {volume.volume}
          </div>
        ))}
      </div>
    </div>
  );
}

function listOfVolumesClass(
  volumeSelection: boolean,
  darkMode: boolean
): string {
  let lovClass = volumeSelection
    ? " pt-5 h-[550px] w-full mt-2 rounded-md overflow-y-auto overflow-x-hidden "
    : "hidden ";
  lovClass += darkMode ? "bg-slate-800" : "bg-slate-200";
  return lovClass;
}
