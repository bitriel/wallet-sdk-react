import { useMemo, useState } from "react";
import { useAccount } from "../hooks/account";
import { cn } from "../utils/cn";
import ABIUploader from "../components/ABIUploader";
import { ContractInfo } from "wallet-sdk";
import { GENERIC_ABI } from "wallet-sdk";
import { useNavigate, useParams } from "react-router-dom";

// import ContractInteraction from "../components/ContractInteraction";

const ContractTypes = ["ERC20", "ERC721", "ERC1155", "CUSTOM"] as const;
type ContractType = (typeof ContractTypes)[number];

export default function ContractsEdit() {
	const navigate = useNavigate();
	const { contractAddress } = useParams();
	const { editContract, chain, contractsByChain } = useAccount();

	const contractExist = useMemo(() => {
		return contractsByChain.some((c) => c.address === contractAddress);
	}, [contractAddress, contractsByChain]);

	const thisContract = useMemo(() => {
		if (contractExist) {
			return contractsByChain
				.filter((c) => c.address === contractAddress)
				.at(0)!;
		}
		return null;
	}, [contractsByChain, contractAddress, contractExist]);

	const [decimals, setDecimals] = useState(thisContract?.decimal ?? 0);
	const [name, setName] = useState(thisContract?.name ?? "");
	const [symbol, setSymbol] = useState(thisContract?.symbol ?? "");
	const [contractType, setContractType] = useState<ContractType>(
		thisContract?.type as ContractType
	);

	const [customAbi, setCustomAbi] = useState<string | null>(
		thisContract?.abi ? JSON.stringify({ abi: thisContract?.abi }) : null
	);

	if (!contractExist) {
		return "Contract not found";
	}

	return (
		<div className="flex flex-col gap-2 p-4">
			<h2 className="my-6 text-3xl font-bold title">Edit contract</h2>

			<div>
				<div className="label">
					<span className="label-text">Contract Name</span>
				</div>
				<input
					className={cn("w-full input input-bordered")}
					placeholder=""
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>

			<div>
				<div className="label">
					<span className="label-text">Contract Symbol</span>
				</div>
				<input
					className={cn("w-full input input-bordered")}
					placeholder=""
					value={symbol}
					onChange={(e) => setSymbol(e.target.value)}
				/>
			</div>

			<div>
				<div className="label">
					<span className="label-text">Contract Decimals</span>
				</div>
				<input
					className={cn("w-full input input-bordered")}
					placeholder=""
					value={decimals}
					onChange={(e) => setDecimals(parseInt(e.target.value))}
				/>
			</div>

			<div>
				<div className="label">
					<span className="label-text">Contract type</span>
				</div>
				<select
					className="w-full select select-bordered"
					value={contractType}
					onChange={(e) => {
						setContractType(e.target.value as ContractType);
					}}
				>
					<option value="ERC20" selected>
						ERC20
					</option>
					<option value="ERC721">ERC721 (NFT)</option>
					<option value="ERC1155">ERC1155 (NFT)</option>
					<option value="CUSTOM">CUSTOM</option>
				</select>
			</div>

			{contractType !== "CUSTOM" ? null : (
				<div>
					<ABIUploader setABI={setCustomAbi} />
				</div>
			)}

			{contractType !== "CUSTOM" || (contractType === "CUSTOM" && customAbi) ? (
				<button
					className="my-6 btn btn-success btn-block"
					onClick={() => {
						const contract: ContractInfo = {
							abi:
								contractType === "CUSTOM"
									? JSON.parse(customAbi!).abi
									: GENERIC_ABI[contractType],
							name: name,
							symbol: symbol,
							address: contractAddress!,
							chain: chain!,
							type: contractType,
							decimal: decimals,
						};
						editContract(contractAddress!, contract);
						navigate(`/contracts/${contractAddress}`);
					}}
				>
					Update Contract
				</button>
			) : null}
		</div>
	);
}
