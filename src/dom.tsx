import React, { useRef } from 'react';
import { BaseProps } from './components';
import useExtension from './hooks';

export function Div(props: BaseProps) {
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

export function Span(props: BaseProps) {
	const {
		extSelector,
		extension,
		children
	} = props;

	const rootRef = useRef<HTMLSpanElement | null>(null);
	const ext = useExtension<HTMLSpanElement | null>(
		rootRef.current,
		extSelector,
		extension
	)

	return <span ref={rootRef}>
		{ext}
		{children}
	</span>
}


