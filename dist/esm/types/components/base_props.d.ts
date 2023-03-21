import { ReactNode } from "react";
export interface BaseProps {
    extension?: ReactNode;
    extSelector?: string;
    style?: any;
    className?: string;
    id?: string;
    children?: ReactNode;
}
