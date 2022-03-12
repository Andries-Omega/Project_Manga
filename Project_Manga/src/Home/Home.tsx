import SignUp from "../Common/Header/TopRouting/SignUp/SignUp";
import AllManga from "./AllMangas/AllMangas";
import HeadlineManga from "./HeadlineManga/HeadlineManga";

export default function Home() {
  return (
    <div className="z-10">
      <HeadlineManga />
      <AllManga />
    </div>
  );
}
