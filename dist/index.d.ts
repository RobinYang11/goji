import React, { ReactNode, ReactElement } from 'react';

interface UploadFile {
    lastModified: number;
    name: string;
    size: number;
    type: string;
    response?: unknown;
    originFileObj: File;
}
interface IUploadProps {
    uploadUrl: string;
    children: React.ReactNode;
    onComplete?(data: Array<unknown>): void;
    beforeUpload?(files: FileList): Promise<unknown>;
    customList?(list: Array<unknown>): ReactNode;
    valueFilter?(file: UploadFile): unknown;
}
declare function Upload(props: IUploadProps): JSX.Element;

type ModalProps = {
    /**
     * css class name
     */
    className?: string;
    children: ReactElement;
    /**
     * visible control
     */
    visible?: boolean;
    /**
     * modal content width
     */
    width?: number;
    /**
     * callback of mask clicked
     */
    onClose?: Function;
    /**
     *
     */
    dontDestroyOnClose?: boolean;
    /**
     * inline style
     */
    style?: any;
    /**
     *  framer-motion configaration  please refer ## https://www.framer.com/motion/motion-config/
     * */
    motionConfig?: any;
};
declare function Modal(props: ModalProps): JSX.Element | null;

interface BaseProps {
    extension?: ReactNode;
    extSelector?: string;
    style?: any;
    className?: string;
    id?: string;
    children?: ReactNode;
    onClick?(e: Event): void;
}

type TabItem = {
    title: ReactNode;
    key: string;
    children: ReactNode;
    disabled?: boolean;
};
interface TabProps extends BaseProps {
    defaultActiveKey?: string;
    children?: ReactNode;
    items: Array<TabItem>;
    motionConfig?: any;
    className?: string;
    tabContentVisible?: boolean;
    onTabChange?(tab: TabItem): void;
    hiddenStyle?: any;
}
declare function Tab(props: TabProps): JSX.Element;

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    style?: any;
    className?: string;
    itemSpace?: number | string;
}
declare function Flex(props: FlexProps): JSX.Element;

interface FlexItemProps {
    children: ReactNode;
    className?: string;
    style?: any;
    perc?: null;
}
declare function FlexItem({ children, className, style, perc }: FlexItemProps): JSX.Element;

interface IColProps {
    key: string;
    title: string;
    render?(data: any): ReactElement;
}
interface ITableProps {
    className?: string;
    data: Array<any>;
    cols: Array<IColProps>;
}
declare function Table(props: ITableProps): JSX.Element;

export { BaseProps, Flex, FlexItem, Modal, Tab, Table, Upload };
