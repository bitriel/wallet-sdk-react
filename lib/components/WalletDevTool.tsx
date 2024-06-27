import { Portal } from "./Portal";
import "../main.css";
import { ThemeProvider } from "../contexts/theme";
import Layout from "./Layout";
import { ResizeProvider } from "../contexts/resize";
import { PortalProvider } from "../contexts/portal";
import Pages from "../pages";
import { MemoryRouter } from "react-router-dom";

export function WalletDevTool({ defaultOpen = true }) {
	return (
		<MemoryRouter>
			<ThemeProvider>
				<PortalProvider defaultOpen={defaultOpen}>
					<Portal>
						<ResizeProvider>
							<Layout>
								<Pages />
							</Layout>
						</ResizeProvider>
					</Portal>
				</PortalProvider>
			</ThemeProvider>
		</MemoryRouter>
	);
}
