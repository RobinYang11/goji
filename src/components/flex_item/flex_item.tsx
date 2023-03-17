
import React, { ReactElement } from 'react'

interface FlexItemProps {
	children: ReactElement
	className?: string
	style?: any
}

export default function FlexItem(
	{
		children,
		className,
		style
	}: FlexItemProps
) {

	return <div className={className} style={style} >
		{children}
	</div>
}