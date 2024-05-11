import React, { ReactNode, ReactElement, CSSProperties } from 'react';

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
    urlFilter(file: any): string;
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
    style?: CSSProperties;
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
    alignItems?: string;
    justify?: string;
}
declare function Flex(props: FlexProps): JSX.Element;

interface FlexItemProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    /** flex item   */
    /** css flex-basis property */
    flex?: string | number;
}
declare function FlexItem({ children, className, style, flex, }: FlexItemProps): JSX.Element;

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

interface IButtonProps extends Partial<React.HTMLProps<HTMLButtonElement>> {
    className?: string;
    bgColor?: string;
    color?: string;
    children: ReactNode;
}
declare function Button(props: IButtonProps): JSX.Element;

export { BaseProps, Button, Flex, FlexItem, Button as Input, Modal, Tab, Table, Upload };
