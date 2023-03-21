import { ReactNode } from 'react';
interface FlexItemProps {
    children: ReactNode;
    className?: string;
    style?: any;
    perc?: null;
}
export default function FlexItem({ children, className, style, perc }: FlexItemProps): JSX.Element;
export {};
