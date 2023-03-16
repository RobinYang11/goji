/// <reference types="react" />
import { ReactElement } from 'react';

interface IUploadProps {
    url: string;
    name: string;
    onClick(): void;
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

export { Modal, Upload };
