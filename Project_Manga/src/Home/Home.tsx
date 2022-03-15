import AllManga from "./AllMangas/AllMangas";
import HeadlineManga from "./HeadlineManga/HeadlineManga";

export default function Home() {
  return (
    <div>
      <HeadlineManga />
      <AllManga />
    </div>
  );
}
