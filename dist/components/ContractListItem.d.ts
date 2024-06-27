import { Contract } from 'ethers';
import { ContractInfo } from 'wallet-sdk';

export default function ContractListItem({ contract, info, }: {
    contract: Contract;
    info: ContractInfo;
}): import("react/jsx-runtime").JSX.Element;
