import { ReactNode } from 'react';

export declare const PortalContext: import('react').Context<{
    isOpen: boolean;
    togglePortal: () => void;
}>;
export declare const PortalProvider: ({ defaultOpen, children, }: {
    children: ReactNode;
    defaultOpen: boolean;
}) => import("react/jsx-runtime").JSX.Element;
