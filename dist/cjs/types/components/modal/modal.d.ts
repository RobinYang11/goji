import { CSSProperties, ReactElement } from 'react';
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
export default function Modal(props: ModalProps): JSX.Element | null;
export {};
