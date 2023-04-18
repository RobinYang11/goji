import React, { CSSProperties, ReactElement } from 'react'
import { motion } from "framer-motion";
import styles from "./modal.module.less"

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
}

export default function Modal(props: ModalProps) {
	const {
		width = 800,
		children,
		dontDestroyOnClose = false,
		visible,
		onClose,
		style = {},
		motionConfig = {
			initial: {
				opacity: .1,
				y: 0,
				scale: 0.2
			},
			animate: {
				opacity: 1,
				y: 50,
				scale: 1
			}
		}
	} = props;


	const destoryStyle: any = {}

	if (dontDestroyOnClose) {
		if (!visible) {
			destoryStyle.display = "none"
		} else {
			destoryStyle.display = "block"
		}
	} else {
		if (!visible) return null;
	}

	return <div style={{ ...destoryStyle }} className={styles.modal}>
		<div
			onClick={() => {
				onClose?.();
			}}
			className={styles.mask}
		/>
		<motion.div
			{...motionConfig}
			style={{
				width: `${width}px`,
				...style
			}}
			className={styles.modalContent}
		>
			{children}
		</motion.div>
	</div>
}

