import { ReactNode, createContext, useState } from "react";

export const PortalContext = createContext({
	isOpen: true,
	togglePortal: () => {},
});

export const PortalProvider = ({
	defaultOpen = true,
	children,
}: {
	children: ReactNode;
	defaultOpen: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	const togglePortal = () => setIsOpen(!isOpen);

	return (
		<PortalContext.Provider
			value={{
				isOpen,
				togglePortal,
			}}
		>
			{children}
		</PortalContext.Provider>
	);
};
