import { default as React } from 'react';

export declare const ThemeContext: React.Context<{
    theme: string;
    toggleTheme: () => void;
}>;
export declare const ThemeProvider: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
