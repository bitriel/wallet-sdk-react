import React from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn";
import { usePortal } from "../hooks/portal";
import { useTheme } from "../hooks/theme";
import { FiChevronLeft } from "react-icons/fi";

export function Portal({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme();
	const { isOpen, togglePortal } = usePortal();
	return (
		<>
			{createPortal(children, document.body)}
			<button
				className={cn("btn btn-sm btn-circle fixed top-6 right-6 shadow z-50", {
					hidden: isOpen,
				})}
				onClick={togglePortal}
				data-theme={theme}
			>
				<FiChevronLeft size={20} />
			</button>
		</>
	);
}
