import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  MangaDetails,
  NetworkStatus,
  setAllMangas,
  setMangaCoverIMG,
} from "../Mangas_Store/HomeManga";
import {
  getAllMangas,
  getRandomMangaCover,
} from "../Network_Requests/HomeNetworks";
import MangaCard from "./MangaCart";

export default function AllManga() {
  const randomMangaNetwork_Status = useSelector(
    (state: RootState) => state.homeMangas.randomMangaNetwork_Status
  );
  const allMangas = useSelector(
    (state: RootState) => state.homeMangas.allMangas
  );
  const dispatch = useDispatch();
  useEffect(() => {
    /**
     * So, the goal here is only to make a network request when the headline is over
     */
    setTimeout(() => {
      getAllMangas()
        .then((res) => {
          dispatch(setAllMangas(res));
          res.map((manga: MangaDetails, i) => {
            getRandomMangaCover(manga.mangaCover_ArtID)
              .then((results) => {
                dispatch(
                  setMangaCoverIMG({
                    index: i,
                    mangaCover_IMG:
                      "https://uploads.mangadex.org/covers/" +
                      manga.mangaID +
                      "/" +
                      results.data.attributes.fileName,
                  })
                );
              })
              .catch((err) => {
                console.error(err);
              });
          });
        })
        .catch((err) => console.error(err));
    }, 6000);
  }, []);

  return (
    <div className="container pt-56 pl-11 ">
      <div className="grid grid-cols-3 gap-10 place-content-center">
        {allMangas[allMangas.length - 1].mangaCover_IMG &&
          allMangas.map((manga: MangaDetails) => {
            return <MangaCard manga={manga} />;
          })}
      </div>
    </div>
  );
}
