import DesktopSideRouting from "./DesktopSideRouting";
import MobileSiteRouting from "./MobileSiteRouting";

export default function SideRouting() {
  return (
    <div>
      {/* Desktop view */}
      <div className="hidden md:block">
        <DesktopSideRouting />
      </div>
      <div className="block md:hidden">
        <MobileSiteRouting />
      </div>
    </div>
  );
}
