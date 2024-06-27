// import { useState } from "react";

import { Link } from "react-router-dom";

export default function Contracts() {
	return (
		<main className="flex-grow p-4 overflow-auto no-bar">
			<Link to="/contracts/add" className="btn btn-primary">
				Add Contract
			</Link>
		</main>
	);
}
