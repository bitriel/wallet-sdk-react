/* eslint-disable @typescript-eslint/no-explicit-any */

import { Contract } from "ethers";
import { Fragment, useState } from "react";
import { cn } from "../utils/cn";
import Highlight from "react-highlight";
import { LuFileCode } from "react-icons/lu";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LuChevronDown } from "react-icons/lu";
import { LuZap } from "react-icons/lu";
import { LuSendHorizonal } from "react-icons/lu";

export default function ContractReadLine({
	contract,
	method,
}: {
	contract: Contract;
	method: any;
}) {
	const [collapse, setCollapse] = useState(false);
	const [loading, setLoading] = useState(false);
	const [copied, setCopied] = useState(false);
	const [showCode, setShowCode] = useState(false);
	const [output, setOutput] = useState("");
	const [data, setData] = useState(
		method.inputs.map((input: any) => ({
			...input,
			value: "",
		}))
	);

	const sourceCode = () => {
		if (method.stateMutability !== "view") {
			return `
${
	data.length > 0
		? data.map((d: any) => `const ${d.name} = "${d.value}";`).join("\n")
		: ""
}
const call = await contract["${method.name}"](${data
				.map((d: any) => d.name)
				.join(", ")});
const tx = await call.wait();`;
		}
		return `
${
	data.length > 0
		? data.map((d: any) => `const ${d.name} = "${d.value}";`).join("\n")
		: ""
}
const query = await contract["${method.name}"](${data
			.map((d: any) => d.name)
			.join(", ")});`;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		setLoading(true);
		if (data.length > 0) {
			const query = await contract[method.name](
				...data.map((d: any) => d.value)
			);
			if (method.stateMutability !== "view") {
				const tx = await query.wait();
				setOutput(tx.hash);
			} else {
				setOutput(query.toString());
			}
			setCollapse(true);
		} else {
			const query = await contract[method.name]();
			setOutput(query.toString());
			setCollapse(true);
		}
		setLoading(false);
	};

	return (
		<form className="flex flex-col w-full gap-2 py-4" onSubmit={handleSubmit}>
			<div className="flex place-items-center">
				<div className="flex flex-col flex-grow gap-1">
					<h3 className="capitalize">{method.name}</h3>
					{data.length === 0 ? null : (
						<div className="badge badge-accent badge-xs">
							{data.length} param(s)
						</div>
					)}
				</div>
				<div className="join">
					<button
						type="submit"
						className={cn("btn join-item", {
							"bg-warning/20": method.stateMutability !== "view",
							"bg-primary/20": method.stateMutability === "view",
						})}
					>
						{loading ? (
							<span className="loading loading-spinner"></span>
						) : method.stateMutability === "view" ? (
							<LuZap size={20} />
						) : (
							<LuSendHorizonal size={20} />
						)}{" "}
						{method.stateMutability === "view" ? "Exec" : "Send"}
					</button>
					<button
						type="button"
						className={cn("btn bg-secondary/20 join-item")}
						onClick={() => {
							setShowCode(!showCode);
						}}
					>
						<LuFileCode size={20} /> Code
					</button>

					{data.length === 0 ? null : (
						<button
							type="button"
							className="btn join-item bg-info/20"
							onClick={() => setCollapse(!collapse)}
						>
							<LuChevronDown
								size={20}
								className={cn("transition-all", {
									"rotate-90": collapse,
								})}
							/>
						</button>
					)}
				</div>
			</div>

			{!collapse ? null : (
				<Fragment>
					{data.length > 0 &&
						data.map((input: any, i: number) => (
							<div key={i} className="w-full">
								<input
									type="text"
									className="block w-full border-2 input input-bordered"
									placeholder={`${input.name} (${input.type})`}
									name={input.name}
									value={input.value}
									onChange={(e) => {
										setData((prev: any) =>
											prev.map((field: any) => {
												if (field.name === input.name) {
													field.value = e.target.value;
												}
												return field;
											})
										);
									}}
								/>
							</div>
						))}
				</Fragment>
			)}
			{output === "" ? null : (
				<textarea className="w-full textarea textarea-bordered">
					{output}
				</textarea>
			)}
			{!showCode ? null : (
				<Fragment>
					<Highlight className="select-text javascript">
						{sourceCode().trim()}
					</Highlight>
					<CopyToClipboard
						text={sourceCode().trim()}
						onCopy={() => setCopied(true)}
					>
						<button className="btn btn-block">
							{copied ? "Copied" : "Copy code"}
						</button>
					</CopyToClipboard>
				</Fragment>
			)}
		</form>
	);
}
