import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setSideMouseHover } from "../../GlobalStateStore/GlobaStore";
import DesktopSideRouting from "./DesktopSideRouting";
import MobileSiteRouting from "./MobileSiteRouting";

export default function SideRouting() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const mouseHover = useSelector(
    (state: RootState) => state.globalState.sideHeaderMouseHover
  );
  const currentPage = useSelector(
    (state: RootState) => state.globalState.currentPage
  );
  const dispatch = useDispatch();

  return (
    <div>
      {/* Desktop view*/}
      <div className="md:block hidden">
        <DesktopSideRouting />
      </div>
      <div className="md:hidden block">
        <MobileSiteRouting />
      </div>
    </div>
  );
}
