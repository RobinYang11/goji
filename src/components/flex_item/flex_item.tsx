
import React, { ReactNode } from 'react'

interface FlexItemProps {
	children: ReactNode
	className?: string
	style?: any
	perc?: null
}

export default function FlexItem({
	children,
	className,
	style,
	perc
}: FlexItemProps) {

	const percStyle = perc ? {
		flexBasis: (perc / 24) * 100
	} : {}

	return <div
		className={className}
		style={{
			...percStyle,
			...style,
		}}
	>
		{children}
	</div>
}