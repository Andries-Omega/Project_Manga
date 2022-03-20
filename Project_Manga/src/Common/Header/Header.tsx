import SideRouting from './SideRouting/SideRouting';
import TopRouting from './TopRouting/TopRouting';

export default function Header() {
  return (
    <div className="sticky top-0 z-20 ">
      <TopRouting />
      <SideRouting />
    </div>
  );
}
