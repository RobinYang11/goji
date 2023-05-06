import { ReactNode } from "react";
export interface BaseProps {
    extension?: ReactNode;
    extSelector?: string;
    style?: any;
    className?: string;
    id?: string;
    children?: ReactNode;
    onClick?(e: Event): void;
}
export interface IExtableProps {
    extension?: ReactNode;
    className?: string;
    extSelector?: string;
    children: ReactNode;
}
