import { ReactNode } from "react";
type TabItem = {
    title: ReactNode;
    key: string;
    children: ReactNode;
    disabled?: boolean;
};
type TabProps = {
    defaultActiveKey?: string;
    children?: ReactNode;
    items: Array<TabItem>;
    motionConfig?: any;
    className?: string;
};
export default function Tab(props: TabProps): JSX.Element;
export {};
