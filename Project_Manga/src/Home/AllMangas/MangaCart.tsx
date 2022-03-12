import { MangaDetails } from "../Mangas_Store/HomeManga";

export default function MangaCard(props: any) {
  const mangaDetails: MangaDetails = props.manga;

  return (
    <div className="bg-white grid grid-cols-2 gap-5 rounded-2xl shadow-2xl h-80">
      <div
        className=" bg-no-repeat bg-cover h-96 w-full -mt-7 rounded-md shadow-2xl
        duration-500  hover:scale-110 cursor-pointer"
        style={{
          backgroundImage: `url('${mangaDetails.mangaCover_IMG}')`,
        }}
      ></div>
      <div className="pr-5">
        <h3 className="font-bold text-lg mt-2 h-16">
          {mangaDetails.mangaTitle}
        </h3>

        <div className="h-[173px] overflow-y-auto mb-2">
          <p>{mangaDetails.mangaDescription}</p>
        </div>
        <button
          className="w-full bg-blue-500 h-10 text-white bottom-0 inset-x-0 z-10 mt-5 rounded-sm
                           hover:bg-blue-800 hover:scale-110 duration-500"
        >
          Read
        </button>
      </div>
    </div>
  );
}
