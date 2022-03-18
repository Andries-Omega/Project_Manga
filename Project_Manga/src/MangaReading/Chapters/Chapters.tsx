import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Chapters() {
  const openedChapter = useSelector(
    (state: RootState) => state.mangaReadingState.openedChapter
  );
  const chapters = useSelector(
    (state: RootState) => state.mangaReadingState.chapters
  );
  console.log(openedChapter);
  return <div>Chapters</div>;
}
