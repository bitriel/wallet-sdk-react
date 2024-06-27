import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "../hooks/account";
import { useEffect, useMemo } from "react";
// import ContractInteraction from "../components/ContractInteraction";
import ContractInteraction from "../components/ContractInteraction";
import { shortenEthAddress } from "wallet-sdk";
import { LuTrash2 } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";

export default function ContractId() {
	const navigate = useNavigate();
	const params = useParams();
	const { contractsByChain, account, removeContract } = useAccount();

	const thisContract = useMemo(() => {
		return contractsByChain.filter((c) => c.address === params.id).at(0);
	}, [contractsByChain, params]);

	useEffect(() => {
		JSON.stringify(thisContract?.abi);
	}, [thisContract?.abi]);

	if (!thisContract) {
		return "Contract not registered";
	}

	return (
		<div className="h-full p-4 pb-20 overflow-y-auto">
			<center>
				<div className="mb-4 avatar placeholder">
					<div className="w-24 rounded-full bg-neutral text-neutral-content">
						<span className="text-3xl">
							{thisContract.symbol.length > 3
								? thisContract.symbol.slice(0, 3)
								: thisContract.symbol}
						</span>
					</div>
				</div>
				<p>{thisContract.name}</p>
				<p>{shortenEthAddress(thisContract.address)}</p>
				<div className="flex gap-2 p-4 place-content-center place-items-center">
					<button
						className="border-none btn btn-circle btn-warning btn-sm bg-opacity-30"
						onClick={() => {
							navigate(`/contracts/edit/${thisContract.address}`);
						}}
					>
						<LuPencil size={20} />
					</button>
					<button
						className="border-none btn btn-circle btn-error btn-sm bg-opacity-30"
						onClick={() => {
							removeContract(thisContract.address);
							navigate("/");
						}}
					>
						<LuTrash2 size={20} />
					</button>
				</div>
			</center>
			<ContractInteraction
				abi={JSON.stringify(thisContract?.abi)}
				contract={account!.contracts.get(thisContract.symbol)!}
			/>
		</div>
	);
}
