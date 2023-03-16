
import React, { useState } from 'react';
import ReactDom from 'react-dom'
import Modal from './components/modal/modal';
import Upload from './components/upload';

import d8 from './8d'

const _d8 = d8({
	locale: "zh"
})

function App() {
	const [visible, setVisible] = useState(false)
	return <_d8>
		<div>
			<h1>test</h1>
			<button
				onClick={() => {
					setVisible(true)
				}}
			>
				show modal
			</button>
			<Modal
				// dontDestroyOnClose={true}
				onClose={() => {
					setVisible(false)
				}}
				visible={visible}
			>
				<div>
					how to set default value for typescript interface field
					<input type="text" />
				</div>
			</Modal>
			<Upload url="abc" name="robin" onClick={() => { }} />
		</div>
	</_d8>
}

ReactDom.render(<App />, document.getElementById("app"))