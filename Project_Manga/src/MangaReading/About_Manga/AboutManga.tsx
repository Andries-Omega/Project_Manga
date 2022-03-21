import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function AboutManga() {
  const mangaDetails = useSelector(
    (state: RootState) => state.mangaReadingState.openedManga
  );

  return (
    <div className="grid md:grid-cols-3 gap-2 grid-cols-2">
      <img
        src={`https://uploads.mangadex.org/covers/${mangaDetails?.mangaID}/${mangaDetails?.mangaCover_IMG}`}
        className="mx-5 w-40 h-52 rounded-md duration-500 hover:scale-110 cursor-pointer md:mx-10 
                          md:w-52 md:h-64 col-span-1"
      />
      <h1 className=" font-bold text-2xl mb-3 block md:hidden col-span-1 ml-3">
        {mangaDetails.mangaTitle}
      </h1>
      <div className="py-5 col-span-2 h-64 overflow-y-auto">
        <h1 className=" font-bold text-2xl mb-3 hidden md:block">
          {mangaDetails.mangaTitle}
        </h1>
        <h3 className=" text-lg mb-3 sticky">Description: </h3>
        <p className=" text-base">{mangaDetails.mangaDescription}</p>
      </div>
    </div>
  );
}
