export default function Search() {
	return (
		<>
			<div className="flex items-center">
				<input type="search" className="w-96 h-10" />
				<button
					className=" bg-blue-500 w-10 h-10
                                    hover:bg-blue-700"
				>
					<i className="fa-solid fa-magnifying-glass text-lg text-white"></i>
				</button>
			</div>
		</>
	);
}
