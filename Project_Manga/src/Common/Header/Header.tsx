import SideRouting from "./SideRouting/SideRouting";
import TopRouting from "./TopRouting/TopRouting";

export default function Header() {
	return (
		<div className="sticky top-0">
			<TopRouting />
			<SideRouting />
		</div>
	);
}
