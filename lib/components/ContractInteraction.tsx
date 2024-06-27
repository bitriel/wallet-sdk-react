/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import ContractReadLine from "./ContractReadLine";
import { Contract } from "ethers";

const ContractInteraction = ({
	abi,
	contract,
}: {
	abi: string;
	contract: Contract;
}) => {
	const parsed = useMemo(() => {
		try {
			return JSON.parse(abi);
		} catch (e) {
			console.log("parse error: ", e);
		}
	}, [abi]);

	if (!abi) {
		return "No ABI";
	}

	return (
		<div>
			<h2 className="my-8 text-xl font-bold divider divider-start">READ</h2>
			<div className="flex flex-col divide-y divide-base-content/30">
				{parsed
					.filter(
						(method: any) =>
							method.type === "function" && method.stateMutability === "view"
					)
					.map((method: any, index: number) => (
						<ContractReadLine key={index} method={method} contract={contract} />
					))}
			</div>

			<h2 className="my-8 text-xl font-bold divider divider-start">WRITE</h2>
			<div className="flex flex-col divide-y divide-base-content/30">
				{parsed
					?.filter(
						(method: any) =>
							method?.type === "function" && method?.stateMutability !== "view"
					)
					.map((method: any, index: number) => (
						<ContractReadLine key={index} method={method} contract={contract} />
					))}
			</div>
		</div>
	);
};

export default ContractInteraction;
