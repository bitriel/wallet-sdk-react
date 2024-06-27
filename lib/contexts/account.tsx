/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { createContext, useMemo, useState } from "react";
import { WalletSDK, ContractInfo, chainList } from "core-sdk";
import { useLocalStorage } from "usehooks-ts";

export const WalletContext = createContext<iWalletContext>({
	account: null,
	chain: null,
	contractsByChain: [],
	removeContract: (_address: string) => {},
	editContract: (_address: string, _update: ContractInfo) => {},
});

export const AccountProvider: React.FC<Props> = ({ children }) => {
	const [wallet, setWallet] = useState<string>(
		"bean annual beach exotic round prepare certain tuna planet enlist unknown latin innocent umbrella liberty address trouble scorpion panel plastic swift then mad glide"
	);
	const [chains] = useLocalStorage<Chain[]>("chains", chainList);
	const [chain, setChain] = useLocalStorage<string | null>(
		"chain",
		"https://rpc0.selendra.org"
	);
	const [contracts, setContracts] = useLocalStorage<ContractInfo[]>(
		"contracts",
		[]
	);

	const contractsByChain = useMemo(
		() => contracts.filter((c) => c.chain === chain),
		[chain, contracts]
	);

	const account = useMemo(() => {
		if (wallet && chain) {
			return WalletSDK(wallet, chain, contractsByChain);
		}
		return null;
	}, [wallet, chain, contractsByChain]);

	const chainInfo = useMemo(() => {
		return chains.filter((ch) => ch.url === chain).at(0);
	}, [chains, chain]);

	// chain managment
	const switchChain = (_chain: string) => {
		setChain(_chain);
	};

	// wallet management
	const switchWallet = (mnemonic: string) => {
		setWallet(mnemonic);
	};

	// contracts management
	const loadContract = (_contracts: ContractInfo[]) => {
		setContracts(_contracts);
	};

	const addContract = (_contract: ContractInfo) => {
		setContracts([...contracts, _contract]);
	};

	const removeContract = (address: string) => {
		setContracts((prev) => prev.filter((c) => c.address !== address));
	};

	const editContract = (address: string, update: ContractInfo) => {
		setContracts((prev) =>
			prev.map((c) => {
				if (c.address === address) {
					return {
						...c,
						...update,
					};
				}
				return c;
			})
		);
	};

	// useEffect(() => {
	// 	console.log(account?.wallet.address);
	// 	console.log(account?.wallet.privateKey);
	// }, [account]);

	return (
		<WalletContext.Provider
			value={{
				account,
				switchChain,
				switchWallet,
				loadContract,
				addContract,
				removeContract,
				chains,
				chain,
				chainInfo,
				contractsByChain,
				editContract,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
};

interface Props {
	children: React.ReactNode;
}

export interface Chain {
	name: string;
	url: string;
	symbol: string;
	logo: string;
}

export interface iWalletContext {
	account: ReturnType<typeof WalletSDK> | null;
	switchChain?: Function;
	switchWallet?: Function;
	loadContract?: Function;
	addContract?: Function;
	removeContract: (address: string) => void;
	editContract: (address: string, update: ContractInfo) => void;
	chains?: Chain[];
	chain: string | null;
	chainInfo?: Chain;
	contractsByChain: ContractInfo[];
}
