const fs = require('fs')
const os = require('os')

const elements = {
	'div': 'HTMLDivElement',
	'p': 'HTMLParagraphElement'
}

let dom = `
import React, { useRef } from 'react';
import { BaseProps } from './components';
import useExtension from './components/hooks';
`;
var EOL = (process.platform === 'win32' ? '\r\n' : '\n')

for (let ele in elements) {

	eleName = elements[ele];
	// dom += EOL;
	dom += `
	
export function ${ele}(props: BaseProps) {
	const {
		extSelector,
		extension,
		children
	} = props;

	const rootRef = useRef<${eleName} | null>(null);
	const ext = useExtension<${eleName}| null>(
		rootRef.current,
		extSelector,
		extension
	)
	return <${ele} ref={rootRef}>
		{ext}
		{children}
	</${ele}>
}

`;
}


fs.writeFileSync('./src/_dom.tsx', dom.toString())
