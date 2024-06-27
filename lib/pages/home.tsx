import { useEffect, useState } from "react";
import { useAccount } from "../hooks/account";
import { prettyBalance } from "core-sdk";
import ContractListItem from "../components/ContractListItem";

export default function Home() {
	const [balance, setBalance] = useState<bigint>(BigInt(0));
	const { account, chainInfo, contractsByChain } = useAccount();

	useEffect(() => {
		if (account) {
			(async () => {
				const b = await account.balance();
				setBalance(b);
			})();
		}
	}, [account, balance]);

	return (
		<main className="flex flex-col flex-grow gap-4 p-4 overflow-auto no-bar">
			<h2 className="my-6 text-5xl text-center title">
				{prettyBalance(balance)} {chainInfo && chainInfo.symbol}
			</h2>

			<div className="flex flex-col divide-y divide-base-content/30">
				{contractsByChain.map((contract) => (
					<ContractListItem
						key={contract.address}
						contract={account!.contracts.get(contract.symbol)!}
						info={contract}
					/>
				))}
			</div>
		</main>
	);
}
