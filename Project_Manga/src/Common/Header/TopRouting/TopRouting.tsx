import Search from "./Search/Search";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

export default function TopRouting() {
	return (
		<div className=" bg-slate-200 flex justify-around p-2 w-screen">
			<img src="./assets/images/TheLogo.png" className="w-16 h-16" />
			<Search />
			<div className="flex px-5 items-center justify-between">
				<div className="mr-5">
					<SignIn />
				</div>
				<div className="mr-5">
					<SignUp />
				</div>
			</div>
		</div>
	);
}
