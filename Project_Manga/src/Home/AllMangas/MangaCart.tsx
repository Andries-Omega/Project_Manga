import { MangaDetails } from "../Mangas_Store/HomeManga";

export default function MangaCard(props: any) {
  const mangaDetails: MangaDetails = props.manga;

  return (
    <div className="bg-white rounded-2xl shadow-2xl">
      <div
        className=" bg-no-repeat bg-cover h-64 pt-3 pr-3 rounded-t-2xl"
        style={{
          backgroundImage: `url('${mangaDetails.mangaCover_IMG}')`,
        }}
      ></div>
      <h3 className=" font-bold text-lg ml-10 mt-10">
        {mangaDetails.mangaTitle}
      </h3>
      <p className=" text-gray-800 mt-5 ml-10">
        {mangaDetails.mangaDescription}
      </p>
    </div>
  );
}
