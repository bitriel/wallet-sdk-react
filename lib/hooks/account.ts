import { useContext } from "react";
import { WalletContext } from "../contexts/account";

export const useAccount = () => {
	const context = useContext(WalletContext);

	if (!context) {
		throw new Error("useAccount must be used within an AccountProvider");
	}

	return context;
};
