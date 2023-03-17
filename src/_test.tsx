
import React, { useState } from 'react';
import ReactDom from 'react-dom'
import Modal from './components/modal/modal';
import Upload from './components/upload';
import Tab from './components/tab/tab';
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
			<Tab
				items={[
					{
						title: "tab1",
						key: "tab1",
						children: <div>test</div>
					},
					{
						title: "tab2",
						key: "tab2",
						children: <div>tab2</div>
					}
				]}
			/>

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