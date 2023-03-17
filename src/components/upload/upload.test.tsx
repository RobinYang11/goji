import React from 'react';
import { render } from '@testing-library/react';
import Upload from './upload';

describe("Upload Test:", () => {
	test("Test 1: test upload:", () => {
		const { getByTitle } = render(<Upload url='robin' name="robin" onClick={() => { console.log("robin") }} />)
		var div = getByTitle('robin')
		expect(div.title).toEqual('robin')
	})
})