import ChainList from "./ChainList";
import { useTheme } from "../hooks/theme";
import { FiChevronRight, FiMoon, FiSun } from "react-icons/fi";
import { usePortal } from "../hooks/portal";

export default function Header() {
	const { toggleTheme, theme } = useTheme();
	const { togglePortal } = usePortal();
	return (
		<div className="flex p-2 border-b-2 place-items-center border-base-content/30">
			<ChainList />
			<div className="flex-grow" />
			<button
				onClick={toggleTheme}
				className="outline-none btn btn-ghost btn-sm btn-circle"
			>
				{theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
			</button>
			<button
				className="outline-none btn btn-ghost btn-sm btn-circle"
				onClick={togglePortal}
			>
				<FiChevronRight size={20} />
			</button>
		</div>
	);
}
