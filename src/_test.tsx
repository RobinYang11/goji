
import React, { useState } from 'react';
import ReactDom from 'react-dom'
import Modal from './components/modal/modal';
import Upload from './components/upload/upload';
import Tab from './components/tab/tab';

function App() {
	const [visible, setVisible] = useState(false)
	return <div>
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
		<Upload
			uploadUrl='/api/video-service/upload'
			onComplete={(res: any[]) => {
				console.log(res[0].url)
			}}
		>
			请选择文件
		</Upload>
	</div>
}

ReactDom.render(<App />, document.getElementById("app"))