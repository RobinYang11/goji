import { ReactElement } from 'react';
interface FlexItemProps {
    children: ReactElement;
    className?: string;
    style?: any;
}
export default function FlexItem({ children, className, style }: FlexItemProps): JSX.Element;
export {};
