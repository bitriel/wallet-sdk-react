import { FooterItem } from "./FooterItem";
import { LuWallet } from "react-icons/lu";
import { LuFileJson } from "react-icons/lu";

export default function Footer() {
	return (
		<div className="absolute bottom-0 left-0 grid w-full h-20 grid-cols-4 gap-2 p-2 backdrop-blur-lg bg-neutral/20 place-content-center place-items-center">
			<FooterItem to="/">
				<LuWallet size={20} />
				<p>Wallet</p>
			</FooterItem>
			<FooterItem to="/contracts">
				<LuFileJson size={20} />
				<p>Contracts</p>
			</FooterItem>
		</div>
	);
}
