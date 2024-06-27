import { Fragment, ReactNode } from "react";
// import { cn } from "../utils/cn";
// import { useTheme } from "../hooks/theme";
// import { FiChevronLeft } from "react-icons/fi";
// import { usePortal } from "../hooks/portal";
import Header from "./Header";
import Footer from "./Footer";
// import { Link } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Fragment>
			<Header />

			{children}
			<Footer />
		</Fragment>
	);
}
