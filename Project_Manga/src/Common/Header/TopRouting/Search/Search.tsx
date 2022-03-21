/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from 'react';
import { createContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MangaDetails } from '../../../../Model/Globase_Types';
import { RootState } from '../../../../store';
import {
  setMobileSearch,
  setSearching,
} from '../../../GlobalStateStore/GlobaStore';
import SearchResults from './SearchResults';

export const SearchContext = React.createContext('');

export default function Search() {
  const mobileSearch = useSelector(
    (state: RootState) => state.globalState.mobileSearchOn
  );
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const searching = useSelector(
    (state: RootState) => state.globalState.searching
  );
  const dispatch = useDispatch();

  const searchTitleElMob = useRef<HTMLInputElement>(null);
  const searchTitleElDesk = useRef<HTMLInputElement>(null);
  const [searchTitle, setSearchTitle] = useState('');

  const doSearchMobile = () => {
    setSearchTitle(searchTitleElMob.current?.value || '');

    if (searchTitleElMob?.current?.value) {
      dispatch(setSearching(true));
    } else {
      dispatch(setSearching(false));
    }
  };

  const doSearchDesktop = () => {
    setSearchTitle(searchTitleElDesk.current?.value || '');

    if (searchTitleElDesk?.current?.value) {
      dispatch(setSearching(true));
    } else {
      dispatch(setSearching(false));
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden items-center md:flex ">
        <input
          type="search"
          className=" px-5 w-80 h-10 focus:border-y-2 focus:border-l-2 border-blue-500 outline-none focus:duration-300 focus:ease-in"
          placeholder="Search for manga..."
          ref={searchTitleElDesk}
          onChange={() => doSearchDesktop()}
          onClick={() => searchTitleElDesk.current?.focus()}
        />
        <button
          type="button"
          className={`bg-blue-500 w-10 h-10
                                    hover:bg-blue-700  text-white`}
        >
          <i className="text-lg fa-solid fa-magnifying-glass" />
        </button>
      </div>
      {/* Mobile View */}
      <div className="flex items-center md:hidden">
        {mobileSearch && (
          <input
            type="search"
            className={
              darkMode
                ? ' bg-gray-800 border-b-[1px] border-white w-52 pl-2 h-10 focus:outline-none text-white'
                : 'bg-slate-200 border-b-[1px] border-black w-52 pl-2 h-10 focus:outline-none'
            }
            placeholder="Search for manga..."
            ref={searchTitleElMob}
            onChange={() => doSearchMobile()}
          />
        )}
        <button
          type="button"
          className={
            darkMode
              ? 'bg-gray-800 w-10 h-10 text-white'
              : ' bg-slate-200 w-10 h-10 text-gray-800'
          }
          onClick={() => {
            mobileSearch ? doSearchMobile() : dispatch(setMobileSearch(true));
          }}
        >
          <i className="text-lg fa-solid fa-magnifying-glass" />
        </button>
      </div>
      {/* Making it absolute to avoid UI bugs when results come in */}
      <div className={`${searching ? 'absolute md:mt-20 mt-3' : 'hidden'}`}>
        <SearchContext.Provider value={searchTitle}>
          <SearchResults key={'SearchResultss'} />
        </SearchContext.Provider>
      </div>
    </>
  );
}
