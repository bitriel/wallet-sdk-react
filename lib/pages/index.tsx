import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Contracts from "./contracts";
import ContractsAdd from "./contractsAdd";
import ContractId from "./contractId";
import ContractsEdit from "./contractsEdit";

export default function Pages() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/contracts" element={<Contracts />} />
			<Route path="/contracts/add" element={<ContractsAdd />} />
			<Route path="/contracts/:id" element={<ContractId />} />
			<Route
				path="/contracts/edit/:contractAddress"
				element={<ContractsEdit />}
			/>
		</Routes>
	);
}
