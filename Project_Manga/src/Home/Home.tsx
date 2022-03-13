import { useSelector } from "react-redux";
import SignUp from "../Common/Header/TopRouting/SignUp/SignUp";
import { RootState } from "../store";
import AllManga from "./AllMangas/AllMangas";
import HeadlineManga from "./HeadlineManga/HeadlineManga";

export default function Home() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  return (
    <div>
      <HeadlineManga />
      <AllManga />
    </div>
  );
}
