/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';

import { setOpenedPage } from '../ReadingManga_Store/ReadingManga_Store';
import NoChapter from './NoChapter';

export default function Pages() {
  const [listOfPages, setListOfPages] = useState(false);
  const openedChapter = useSelector(
    (state: RootState) => state.mangaReadingState.openedChapter
  );
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const openedPage = useSelector(
    (state: RootState) => state.mangaReadingState.openedPage
  );
  const dispatch = useDispatch();
  if (!Object.keys(openedChapter).length) {
    return <NoChapter key="NoChapter" />;
  }

  if (!openedChapter.pages) {
    return (
      <div className=" flex justify-center items-center h-96">
        <div className="grid place-content-center">
          <img
            src="./assets/images/favicon.png"
            className=" w-52 h-52 animate-spin"
            alt=""
          />
          <h1>Fetching Pages...</h1>
        </div>
      </div>
    );
  }

  const next = () => {
    const theNext = openedPage + 1;
    if (openedChapter && theNext >= openedChapter?.pages?.length) {
      return openedChapter.pages.length - 1;
    }
    return theNext;
  };

  const previous = () => {
    const thePrevious = openedPage - 1;
    if (thePrevious < 0) {
      return 0;
    }
    return thePrevious;
  };

  return (
    <div className="grid pr-3 w-full h-[610px]">
      <button
        type="button"
        className={`w-full bg-blue-500  duration-300 h-10 rounded-md text-${
          darkMode ? 'black' : 'white'
        }`}
        onClick={() => {
          setListOfPages(!listOfPages);
        }}
      >
        Page {openedPage + 1} / {openedChapter?.pages?.length}
        <span>
          <i
            className={`fa-solid fa-caret-${
              listOfPages ? 'up' : 'down'
            } float-right mr-8 duration-200`}
          />
        </span>
      </button>
      <div className={`${listOfPagesClass(listOfPages, darkMode)}`}>
        {openedChapter?.pages?.map((page, i) => (
          <div
            role="button"
            aria-hidden="true"
            className={`text-lg justify-center hover:scale-110 duration-500 ${
              darkMode ? ' hover:bg-slate-500' : 'hover:bg-slate-50'
            }
               mb-5 border-[1px] border-${
                 darkMode ? 'white' : 'black'
               } h-10 flex items-center border-x-0 mr-2 ml-2 cursor-pointer`}
            onClick={() => {
              dispatch(setOpenedPage(i));
              setListOfPages(false);
            }}
            key={`${openedChapter.id} - ${page}`}
          >
            Page {i + 1}
          </div>
        ))}
      </div>
      {/* place content in center */}
      <div
        className={`mt-2 ${
          listOfPages
            ? 'hidden'
            : ' w-full  flex justify-around mb-3  items-center overflow-y-auto '
        }  border-[1px] border-${darkMode ? 'white' : 'black'} rounded-md`}
      >
        <div
          role="button"
          aria-hidden="true"
          className=" sticky hover:text-blue-500  duration-500 cursor-pointer"
          onClick={() => {
            dispatch(setOpenedPage(previous()));
          }}
        >
          <i className="text-xl duration-500 hover:scale-150 fa-solid fa-angle-left" />
        </div>

        <img
          alt=""
          src={`${openedChapter?.baseUrl}/data/${openedChapter?.hash}/${openedChapter?.pages[openedPage]}`}
          className=" w-72 rounded-md md:w-[450px]"
        />
        <div
          role="button"
          aria-hidden="true"
          className="hover:text-blue-500 duration-500  cursor-pointer"
          onClick={() => dispatch(setOpenedPage(next()))}
        >
          <i className="text-xl duration-500 hover:scale-150 fa-solid fa-chevron-right " />
        </div>
      </div>
    </div>
  );
}

function listOfPagesClass(listOfPages: boolean, darkMode: boolean): string {
  let lopClass = listOfPages
    ? 'h-[550px] w-full mt-2 rounded-md overflow-y-auto border-[1px] overflow-x-hidden '
    : 'hidden ';
  lopClass += darkMode
    ? 'border-white bg-slate-800'
    : 'border-black bg-slate-200';

  return lopClass;
}
