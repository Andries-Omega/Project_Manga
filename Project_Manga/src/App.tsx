import { Route, Routes } from "react-router-dom";
import Footer from "./Common/Footer/Footer";
import Header from "./Common/Header/Header";
import Home from "./Home/Home";

export default function App() {
	return (
		<div className=" overflow-x-none">
			<Header />

			<div className="pl-[65px]">
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</div>

			<Footer />
		</div>
	);
}
