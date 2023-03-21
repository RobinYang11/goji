
import React, { useEffect, useRef } from 'react';
import { useState, ReactNode } from "react"
import { motion } from 'framer-motion'
import styles from './tab.module.less';
import { BaseProps } from '../base_props';
import { Div } from '../../dom';

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

export default function _Tab(props: TabProps) {

	const {
		items,
		className,
		defaultActiveKey,
		motionConfig,
		extension,
		extSelector
	} = props;

	const [currentTab, setCurrentTab] = useState(0);
	return <Div extSelector={extSelector} extension={extension} className={`${styles.tab} ${className}`}>
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
	</Div>
}
