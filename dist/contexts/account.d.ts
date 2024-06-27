import { WalletSDK, ContractInfo } from 'core-sdk';

export declare const WalletContext: import('react').Context<iWalletContext>;
export declare const AccountProvider: React.FC<Props>;
interface Props {
    children: React.ReactNode;
}
export interface Chain {
    name: string;
    url: string;
    symbol: string;
    logo: string;
}
export interface iWalletContext {
    account: ReturnType<typeof WalletSDK> | null;
    switchChain?: Function;
    switchWallet?: Function;
    loadContract?: Function;
    addContract?: Function;
    removeContract: (address: string) => void;
    editContract: (address: string, update: ContractInfo) => void;
    chains?: Chain[];
    chain: string | null;
    chainInfo?: Chain;
    contractsByChain: ContractInfo[];
}
export {};
