export default function Search() {
	return (
		<>
			<div className="flex items-center">
				<input
					type="search"
					className="w-96 h-10 px-5 outline-none focus:border-b-2 focus:border-l-2 focus:border-t-2 border-blue-500 focus:ease-in focus:duration-300"
					placeholder="Search for manga..."
				/>
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
