/// <reference types="react" />
interface IUploadProps {
    url: string;
    name: string;
    onClick(): void;
}
export default function Upload(props: IUploadProps): JSX.Element;
export {};
