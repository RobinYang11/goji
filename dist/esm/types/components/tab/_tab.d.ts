import { ReactNode } from "react";
import { BaseProps } from '../base_props';
type TabItem = {
    title: ReactNode;
    key: string;
    children: ReactNode;
    disabled?: boolean;
};
export interface TabProps extends BaseProps {
    defaultActiveKey?: string;
    children?: ReactNode;
    items: Array<TabItem>;
    motionConfig?: any;
    className?: string;
}
export default function _Tab(props: TabProps): JSX.Element;
export {};
