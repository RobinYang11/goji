
import React, { useEffect, useRef } from 'react';
import { useState, ReactNode } from "react"
import { motion } from 'framer-motion'
import styles from './tab.module.less';
import { BaseProps } from '../base_props';
import { createPortal } from 'react-dom';
import goji from '../../_dom';

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
}

export default function Tab(props: TabProps) {

	const {
		items,
		className,
		defaultActiveKey,
		motionConfig,
		extension,
		extSelector
	} = props;

	const [currentTab, setCurrentTab] = useState(0);
	return <goji.div className={`${styles.tab} ${className}`}>
		<motion.ul aria-label="tab" className={styles.title} >
			{items?.map((tab, index) => {
				return <motion.li
					aria-label="tab-title"
					onClick={() => { setCurrentTab(index) }}
					key={tab.key}>
					{tab.title}
				</motion.li>
			})}
		</motion.ul>
		<motion.div aria-label="tab-content" {...motionConfig} className={styles.tabContent}>
			{items?.[currentTab].children}
		</motion.div>
	</goji.div>
}
