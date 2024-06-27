import { useContext } from "react";
import { ResizeContext } from "../contexts/resize";

export const useResize = () => {
	const context = useContext(ResizeContext);

	if (!context) {
		throw new Error("useResize must be used within an ResizeProvider");
	}

	return context;
};
