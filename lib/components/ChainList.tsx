import { FiChevronDown } from "react-icons/fi";
import { useAccount } from "../hooks/account";
import { Chain } from "../contexts/account";
import { useMemo, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { useOnClickOutside } from "usehooks-ts";
import { LuPackagePlus } from "react-icons/lu";

export default function ChainList() {
	const [dropDownOpen, setDropDownOpen] = useState(false);
	const { chains, switchChain, chain } = useAccount();
	const ref = useRef(null);

	useOnClickOutside(ref, () => setDropDownOpen(false));

	const _chain = useMemo(() => {
		return chains?.filter((ch) => ch.url === chain).at(0);
	}, [chains, chain]);

	const toggleDropDown = () => setDropDownOpen(!dropDownOpen);

	return (
		<div
			ref={ref}
			className={cn("dropdown dropdown-bottom", {
				"dropdown-open": dropDownOpen,
			})}
		>
			<div
				className="p-0 px-2 py-1 rounded-full btn btn-md"
				onClick={toggleDropDown}
			>
				<div
					className="w-8 h-8 bg-center bg-no-repeat bg-contain rounded-full"
					style={{
						backgroundImage: `url("${_chain?.logo}")`,
					}}
				></div>
				{_chain?.name}
				<FiChevronDown size={20} />
			</div>
			<ul className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-box w-64 outline outline-2 outline-base-300 mt-1 gap-1">
				{chains?.map((_chain: Chain) => (
					<li key={_chain.symbol}>
						<a
							onClick={(e) => {
								e.preventDefault();
								switchChain!(_chain.url);
								toggleDropDown();
							}}
							className={cn("text-base-content hover:text-base-content", {
								active: chain === _chain.url,
							})}
						>
							<div
								className="mr-2 bg-center bg-no-repeat bg-contain rounded-full w-9 h-9 bg-base-200"
								style={{
									backgroundImage: `url("${_chain?.logo}")`,
								}}
							/>
							{_chain.name}
						</a>
					</li>
				))}

				<li>
					<a
						onClick={(e) => {
							e.preventDefault();
							toggleDropDown();
						}}
						className={cn("text-base-content hover:text-base-content")}
					>
						<div className="flex mr-2 rounded-full w-9 h-9 place-content-center place-items-center bg-base-200">
							<LuPackagePlus size={24} />
						</div>
						Add Network
					</a>
				</li>
			</ul>
		</div>
	);
}
