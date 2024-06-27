import { ReactNode, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";

export function FooterItem({
	children,
	to,
}: {
	children: ReactNode;
	to: string;
}) {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const active = useMemo(() => {
		return pathname === to;
	}, [pathname, to]);

	const goto = () => {
		navigate(to);
	};

	return (
		<div
			className={cn(
				"flex flex-col w-full h-16 place-content-center place-items-center rounded-xl bg-base-200 gap-1 cursor-pointer [&>p]:text-xs",
				{ "bg-base-content text-base-100": active }
			)}
			onClick={goto}
		>
			{children}
		</div>
	);
}
