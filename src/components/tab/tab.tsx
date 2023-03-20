
import React from 'react';
import { useState, ReactNode } from "react"
import { motion } from 'framer-motion'
import styles from './tab.module.less';

type TabItem = {
	title: ReactNode;
	key: string;
	children: ReactNode
	disabled?: boolean
}

type TabProps = {
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
		motionConfig
	} = props;

	const [currentTab, setCurrentTab] = useState(0);

	return <div className={`${styles.tab} ${className}`}>
		<motion.ul aria-invalid className={styles.title} >
			{items?.map((tab, index) => {
				return <motion.li
					aria-label="tab"
					onClick={() => { setCurrentTab(index) }}
					key={tab.key}>
					{tab.title}
				</motion.li>
			})}
		</motion.ul>
		<motion.div aria-label="tab-content" {...motionConfig} className={styles.body}>
			{items?.[currentTab].children}
		</motion.div>
	</div>
}
