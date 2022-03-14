import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ScrollUp from "./Common/Footer/ScrollUp";
import Header from "./Common/Header/Header";
import Home from "./Home/Home";
import { RootState } from "./store";

export default function App() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  return (
    <div>
      <Header />
      <div
        className={
          darkMode
            ? "z-10 bg-slate-700 ease-in duration-500 pl-5"
            : "z-10 bg-white ease-in duration-500 pl-5"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      <ScrollUp />
    </div>
  );
}
