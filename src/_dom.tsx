
import React, { useRef } from 'react';
import { BaseProps } from './components';
import useExtension from './hooks';

const goji: any = {}

goji.div = function div(props: BaseProps) {
	const {
		extSelector,
		extension,
		children
	} = props;

	const rootRef = useRef<HTMLDivElement | null>(null);
	const ext = useExtension<HTMLDivElement | null>(
		rootRef.current,
		extSelector,
		extension
	)
	return <div ref={rootRef}>
		{ext}
		{children}
	</div>
}

goji.p = function p(props: BaseProps) {
	const {
		extSelector,
		extension,
		children
	} = props;

	const rootRef = useRef<HTMLParagraphElement | null>(null);
	const ext = useExtension<HTMLParagraphElement | null>(
		rootRef.current,
		extSelector,
		extension
	)
	return <p ref={rootRef}>
		{ext}
		{children}
	</p>
}


export default goji;