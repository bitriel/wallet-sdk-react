import { useContext } from "react";
import { PortalContext } from "../contexts/portal";

export const usePortal = () => {
	const context = useContext(PortalContext);

	if (!context) {
		throw new Error("usePortal must be used within an PortalProvider");
	}

	return context;
};
