import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function NoChapter() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const openedVolume = useSelector(
    (state: RootState) => state.mangaReadingState.openedVolume
  );

  return (
    <div
      className={`${
        darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'
      } flex items-center justify-center h-[500px] px-5`}
    >
      <div className="grid place-items-center">
        <i className="text-[200px] text-center text-yellow-300 fa-solid fa-triangle-exclamation" />
        <h1 className=" text-lg text-red-500">
          No Chapter Has Been Selected{' '}
          {Object.keys(openedVolume).length
            ? ''
            : ' ,Start by selecting the volume please'}
        </h1>
      </div>
    </div>
  );
}
