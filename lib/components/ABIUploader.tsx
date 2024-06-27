import { LuUpload } from "react-icons/lu";

const ABIUploader = ({
	setABI,
}: {
	setABI: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
	return (
		<label className="btn btn-block">
			<LuUpload size={20} />
			Upload ABI
			<input
				hidden
				className="w-full file-input file-input-bordered"
				type="file"
				accept=".json"
				onChange={(e) => {
					const reader = new FileReader();
					reader.onload = (event) => {
						setABI(event.target?.result?.toString() ?? "");
					};
					reader.readAsText(e.target.files![0]);
				}}
			/>
		</label>
	);
};

export default ABIUploader;
