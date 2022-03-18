import DesktopSideRouting from "./DesktopSideRouting";
import MobileSiteRouting from "./MobileSiteRouting";

export default function SideRouting() {
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
