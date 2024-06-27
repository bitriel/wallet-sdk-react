# WalletSDK for React

## Overview

This library provides a React context and provider to easily manage blockchain wallets, contracts, and chain information using the WalletSDK core library. It simplifies the integration of blockchain functionality into React applications.

## Features

- Wallet Management: Manage wallet state and mnemonic phrases.
- Chain Management: Easily switch between different blockchain networks.
- Contract Management: Load, add, remove, and edit contracts.
- Context Integration: Utilize React context for state management and easy access across components.

## Installation

To use the WalletSDK for React, install the necessary dependencies:

```bash
npm install bitriel/wallet-sdk-react
```

## Usage

Here's an example of how to use the AccountProvider and useAccount hook in your React application:

```javascript
import React from "react";
import { AccountProvider, useAccount } from "wallet-sdk-react";

const App = () => {
	return (
		<AccountProvider>
			<MyComponent />
		</AccountProvider>
	);
};

const MyComponent = () => {
	const { account, switchChain, switchWallet, addContract } = useAccount();

	return (
		<div>
			<button onClick={() => switchChain("https://another.chain.rpc")}>
				Switch Chain
			</button>
			<button onClick={() => switchWallet("new mnemonic phrase")}>
				Switch Wallet
			</button>
			<button
				onClick={() =>
					addContract({
						abi: yourContractAbi,
						address: "0xYourContractAddress",
						name: "YourContractName",
						symbol: "YCN",
						type: "ERC20",
						chain: "mainnet",
					})
				}
			>
				Add Contract
			</button>
			<div>Account Address: {account?.wallet?.address}</div>
		</div>
	);
};
```

## AccountContext Interfaces

The AccountContext and AccountProvider are used to manage and provide wallet-related state and functions throughout your React application.
This context expose the following features and interfaces:

```typescript
type ContractInfo = {
	abi: ethers$1.Interface | ethers$1.InterfaceAbi;
	address: string;
	decimal?: number;
	name: string;
	symbol: string;
	type: string;
	chain: string;
};

interface Chain {
	name: string;
	url: string;
	symbol: string;
	logo: string;
}

declare const WalletSDK: (
	mnemonic: string,
	chain: string,
	contracts?: ContractInfo[]
) => {
	balance: () => Promise<bigint>;
	balanceOf: (address: AddressLike) => Promise<bigint>;
	transfer: (
		to: AddressLike,
		amount: ethers$1.BigNumberish
	) => Promise<ethers$1.TransactionReceipt | null>;
	provider: ethers$1.JsonRpcProvider;
	wallet: ethers$1.HDNodeWallet;
	contracts: Map<string, Contract>;
};

interface iAccountContext {
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
```
