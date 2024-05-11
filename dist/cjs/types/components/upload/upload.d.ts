import React, { ReactNode } from "react";
export interface UploadFile {
    lastModified: number;
    name: string;
    size: number;
    type: string;
    response?: unknown;
    originFileObj: File;
}
export interface IUploadProps {
    uploadUrl: string;
    children: React.ReactNode;
    onComplete?(data: Array<unknown>): void;
    beforeUpload?(files: FileList): Promise<unknown>;
    customList?(list: Array<unknown>): ReactNode;
    valueFilter?(file: UploadFile): unknown;
    urlFilter(file: any): string;
}
export default function Upload(props: IUploadProps): JSX.Element;
