import { ReactNode } from 'react';

export declare const ResizeContext: import('react').Context<{
    resizerRef: import('react').RefObject<HTMLDivElement>;
    handleMouseDown: () => void;
    isResizing: boolean;
    width: number;
}>;
export declare const ResizeProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
