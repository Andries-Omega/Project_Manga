import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { setDarkMode } from '../../../GlobalStateStore/GlobaStore';

export default function StateColorManaga() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const dispatch = useDispatch();
  return (
    <div
      role="button"
      aria-hidden="true"
      className={`cursor-pointer rounded-full w-20 h-10 bg-slate-300 bg-opacity-50 grid content-center place-content-${
        darkMode ? 'end ease-in' : 'start ease-out'
      } duration-500`}
      onClick={() => {
        dispatch(setDarkMode(!darkMode));
      }}
    >
      <button
        type="button"
        className=" w-10 h-10 align-middle bg-blue-500 rounded-full"
        onClick={() => {
          dispatch(setDarkMode(!darkMode));
        }}
      >
        <i
          className={
            darkMode
              ? 'fa-solid fa-sun ease-in duration-500 text-white'
              : 'fa-solid fa-moon ease-in duration-500 '
          }
        />
      </button>
    </div>
  );
}
