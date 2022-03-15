import React from "react";
import { useParams } from "react-router-dom";

export default function MangaReading() {
  const { mangaID } = useParams();
  return (
    <div>
      <h1 className=" text-xl">{mangaID}</h1>
    </div>
  );
}
