import { ReactElement } from "react";
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
export default function Table(props: ITableProps): JSX.Element;
export {};
