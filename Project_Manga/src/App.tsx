import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ScrollUp from './Common/ScrollUp/ScrollUp';
import Header from './Common/Header/Header';
import Home from './Home/Home';
import MangaReading from './MangaReading/MangaReading';
import { RootState } from './store';
import Authentications from './Authentication/Authentications';

export default function App() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const searching = useSelector(
    (state: RootState) => state.globalState.searching
  );

  return (
    <div>
      <Header />
      <div
        className={`${darkMode ? 'bg-slate-700' : 'bg-white'} ${
          searching ? 'hidden' : 'z-10 ease-in duration-500 md:pl-5'
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manga_read/:mangaID" element={<MangaReading />} />
          <Route path="/authentication/:type" element={<Authentications />} />
        </Routes>
      </div>

      <ScrollUp />
    </div>
  );
}

function routersClass(searching: boolean, darkMode: boolean): string {
  let rClass = searching ? 'hidden' : 'z-10 ease-in duration-500 md:pl-5';
  rClass += darkMode ? 'bg-slate-700' : 'bg-white';
  return rClass;
}
