import { ReactElement } from 'react';
interface FlexProps {
    children: ReactElement;
    style?: any;
    className?: string;
}
export default function Flex({ children, style, className, }: FlexProps): JSX.Element;
export {};
