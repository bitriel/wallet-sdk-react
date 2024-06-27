import { Contract } from 'ethers';

declare const ContractInteraction: ({ abi, contract, }: {
    abi: string;
    contract: Contract;
}) => import("react/jsx-runtime").JSX.Element | "No ABI";
export default ContractInteraction;
