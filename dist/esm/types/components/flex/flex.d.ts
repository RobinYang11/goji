import React, { ReactNode } from 'react';
interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    style?: any;
    className?: string;
    itemSpace?: number | string;
}
export default function Flex(props: FlexProps): JSX.Element;
export {};
