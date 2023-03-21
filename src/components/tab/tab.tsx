import React, { useEffect, useRef } from 'react';
import { useState, ReactNode } from "react"
import { motion } from 'framer-motion'
import styles from './tab.module.less';
import { BaseProps } from '../base_props';
import { createPortal } from 'react-dom';

type TabItem = {
	title: ReactNode;
	key: string;
	children: ReactNode
	disabled?: boolean
}

export interface TabProps extends BaseProps {
	defaultActiveKey?: string;
	children?: ReactNode;
	items: Array<TabItem>;
	motionConfig?: any;
	className?: string
	tabContentVisible?: boolean,
	onTabChange?(tab: TabItem): void,
	hiddenStyle?: any
}

export default function Tab(props: TabProps) {

	const {
		items,
		className,
		defaultActiveKey,
		motionConfig,
		extension,
		extSelector,
		tabContentVisible = true,
		onTabChange,
		hiddenStyle = { display: 'none' }
	} = props;

	const [currentTab, setCurrentTab] = useState(0);

	const [portalContainer, setPortalContainer] = useState<HTMLElement>()
	const rootRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {

		if (!rootRef) return;
		if (!extension) return;
		if (!extSelector) {
			throw new Error("'extSelector' not provide!");
		}

		const container: unknown = rootRef.current?.querySelector(extSelector)
		if (container) {
			setPortalContainer(container as HTMLElement);
		}

	}, [rootRef.current])


	return <div ref={rootRef} className={`${styles.tab} ${className}`}>
		{portalContainer ? createPortal(extension, portalContainer as HTMLElement) : null}
		<motion.ul aria-label="tab" className={styles.title} >
			{items?.map((tab, index) => {
				return <motion.li
					aria-label="tab-title"
					onClick={() => {
						setCurrentTab(index);
						onTabChange?.(tab);
					}}
					key={tab.key}>
					{tab.title}
				</motion.li>
			})}
		</motion.ul>

		{/* <motion.div
			style={tabContentVisible ? hiddenStyle : null}
			aria-label="tab-content" {...motionConfig} className={styles.tabContent}>
			{items?.[currentTab].children}
		</motion.div> */}

		{
			tabContentVisible ? <motion.div aria-label="tab-content" {...motionConfig} className={styles.tabContent}>
				{items?.[currentTab].children}
			</motion.div> : null
		}
	</div>
}
