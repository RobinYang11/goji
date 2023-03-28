
import React, { ReactElement, ReactNode } from 'react';
import { BaseProps } from '../base_props';
import styles from './flex.module.less';


interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	style?: any;
	className?: string,
	itemSpace?: number | string,
}

export default function Flex({
	children,
	style,
	className,
	itemSpace,
}: FlexProps) {

	return <div
		style={style}
		className={`${styles.flex} ${className}`}
	>
		{children}
	</div>
}
