import { Fragment, useEffect, useMemo, useState } from "react";
import { useAccount } from "../hooks/account";
import { ethers, isAddress } from "ethers";
import { cn } from "../utils/cn";
import ABIUploader from "../components/ABIUploader";
import { ContractInfo } from "wallet-sdk";
import { GENERIC_ABI } from "wallet-sdk";
import { useNavigate } from "react-router-dom";

// import ContractInteraction from "../components/ContractInteraction";

const contractStatus = [
	"Unchecked",
	"Checking address",
	"Address not found",
	"",
] as const;
type ContractStatus = (typeof contractStatus)[number];

const basicAbi = [
	"function name() view returns (string)",
	"function symbol() view returns (string)",
	"function decimals() view returns (uint8)",
];

const ContractTypes = ["ERC20", "ERC721", "ERC1155", "CUSTOM"] as const;
type ContractType = (typeof ContractTypes)[number];

export default function ContractsAdd() {
	const navigate = useNavigate();
	const [address, setAddress] = useState("");
	const [contractExist, setContractExist] =
		useState<ContractStatus>("Unchecked");
	const { account, addContract, chain, contractsByChain } = useAccount();

	const [decimals, setDecimals] = useState("Unknown");
	const [name, setName] = useState("Unknown");
	const [symbol, setSymbol] = useState("Unknown");
	const [contractType, setContractType] = useState<ContractType>("ERC20");

	const [customAbi, setCustomAbi] = useState<string | null>(null);

	const isValidAddress = useMemo(() => {
		return isAddress(address);
	}, [address]);

	const contractAlreadyExist = useMemo(() => {
		return contractsByChain.some((c) => c.address === address);
	}, [address, contractsByChain]);

	useEffect(() => {
		if (isValidAddress) {
			(async () => {
				setContractExist("Checking address");

				const result = await account?.provider?.getCode(address);
				if (result === "0x") {
					setContractExist("Address not found");
					return;
				}
				setContractExist("");
			})();
		}
	}, [isValidAddress, address, account]);

	useEffect(() => {
		if (contractExist === "") {
			const contract = new ethers.Contract(
				address,
				basicAbi,
				account?.provider
			);

			(async () => {
				setSymbol(await contract.symbol());
				setDecimals((await contract.decimals()).toString());
				setName((await contract.name()).toString());
			})();
		}
	}, [contractExist, address, account]);

	return (
		<div className="flex flex-col gap-2 p-4">
			<h2 className="my-6 text-3xl font-bold title">Add contract</h2>
			<div>
				<div className="label">
					<span className="label-text">Contract address</span>
				</div>
				<input
					className={cn("w-full input input-bordered", {
						"input-error": address !== "" && !isValidAddress,
					})}
					placeholder="0x0000000000000000000000000000000000000000"
					value={address}
					onChange={(e) => {
						setAddress(e.target.value);
						setContractExist("Unchecked");
					}}
				/>
			</div>

			{!isValidAddress ? null : contractExist !== "" ? (
				<p>{contractExist}</p>
			) : (
				<Fragment>
					{symbol === "Unknown" ? null : (
						<div>
							<div className="label">
								<span className="label-text">Contract Symbol</span>
							</div>
							<input
								className={cn("w-full input input-bordered")}
								placeholder=""
								value={symbol}
							/>
						</div>
					)}

					{decimals === "Unknowm" ? null : (
						<div>
							<div className="label">
								<span className="label-text">Contract Decimals</span>
							</div>
							<input
								className={cn("w-full input input-bordered")}
								placeholder=""
								value={decimals}
							/>
						</div>
					)}

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

					{contractType !== "CUSTOM" ||
					(contractType === "CUSTOM" && customAbi) ? (
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
									address: address,
									chain: chain!,
									type: contractType,
									decimal: parseInt(decimals),
								};
								addContract!(contract);
								navigate(`/contracts/${address}`);
							}}
							disabled={contractAlreadyExist}
						>
							{contractAlreadyExist
								? "Your already add this contract"
								: "Add Contract"}
						</button>
					) : null}
				</Fragment>
			)}
		</div>
	);
}
