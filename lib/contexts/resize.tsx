import {
	createContext,
	ReactNode,
	createRef,
	useEffect,
	useState,
} from "react";
import { cn } from "../utils/cn";
import { useTheme } from "../hooks/theme";
import { usePortal } from "../hooks/portal";
import { useLocalStorage } from "usehooks-ts";

const resizerRef = createRef<HTMLDivElement>();
export const ResizeContext = createContext({
	resizerRef,
	handleMouseDown: () => {},
	isResizing: false,
	width: 350,
});

export const ResizeProvider = ({ children }: { children: ReactNode }) => {
	const { isOpen } = usePortal();
	const { theme } = useTheme();
	const [width, setWidth] = useLocalStorage("width", 350);
	const [isResizing, setIsResizing] = useState(false);

	const handleMouseDown = () => {
		setIsResizing(true);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (isResizing && resizerRef.current) {
			const newWidth =
				resizerRef.current.getBoundingClientRect().right - e.clientX;
			if (newWidth >= 350) {
				setWidth(newWidth);
			}
		}
	};

	const handleMouseUp = () => {
		setIsResizing(false);
	};

	useEffect(() => {
		if (isResizing) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		} else {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isResizing]);

	return (
		<ResizeContext.Provider
			value={{ resizerRef, handleMouseDown, isResizing, width }}
		>
			<div
				className={cn(
					"h-[calc(100dvh-2rem)] bg-base-100 m-4 fixed top-0 right-0 rounded-xl shadow-lg flex flex-col overflow-hidden select-none",
					{
						"invisible -right-96 opacity-0": !isOpen,
						"transition-all": !isResizing,
					}
				)}
				data-theme={theme}
				style={{ width: width + "px" }}
				ref={resizerRef}
			>
				<div
					onMouseDown={handleMouseDown}
					className="absolute left-0 flex w-2 h-12 text-center rounded-r-lg bg-primary/20 hover:bg-primary/40 top-1/2 hover:cursor-col-resize place-items-center"
				>
					|
				</div>
				{children}
			</div>
		</ResizeContext.Provider>
	);
};
