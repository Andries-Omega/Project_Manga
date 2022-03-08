import SideRouting from "./SideRouting/SideRouting";
import TopRouting from "./TopRouting/TopRouting";

export default function Header() {
	return (
		<div className="fixed">
			<TopRouting />
			<SideRouting />
		</div>
	);
}
