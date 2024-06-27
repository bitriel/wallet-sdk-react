import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "../hooks/account";
import { ContractInfo, prettyBalance } from "wallet-sdk";
import { useNavigate } from "react-router-dom";

export default function ContractListItem({
	contract,
	info,
}: {
	contract: Contract;
	info: ContractInfo;
}) {
	const { account } = useAccount();
	const [balance, setBalace] = useState("0");
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const b = await contract.balanceOf(account?.wallet?.address);
			setBalace(b.toString());
		})();
	}, [account, contract]);
	return (
		<div
			className="flex gap-2 py-4 cursor-pointer place-items-center"
			onClick={() => navigate(`/contracts/${info.address}`)}
		>
			<div className="avatar placeholder">
				<div className="w-12 rounded-full bg-neutral text-neutral-content">
					<span>
						{info.symbol.length > 3 ? info.symbol.slice(0, 3) : info.symbol}
					</span>
				</div>
			</div>
			<p className="flex-grow text-lg font-bold title">{info.name}</p>{" "}
			<p className="text-lg font-bold">{prettyBalance(balance)}</p>
		</div>
	);
}
