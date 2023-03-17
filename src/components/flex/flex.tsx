
import React, { ReactElement } from 'react';
import styles from './flex.module.less';


interface FlexProps {
	children: ReactElement;
	style?: any;
	className?: string
}

export default function Flex({
	children,
	style,
	className,
}: FlexProps) {

	return <div
		style={style}
		className={`${styles.flex} ${className}`}
	>
		{children}
	</div>
}
