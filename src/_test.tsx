
import React, { useState } from 'react';
import ReactDom from 'react-dom'
import Modal from './components/modal/modal';
import Upload from './components/upload/upload';
import Tab from './components/tab/tab';
import { TestTable } from './testTable';

import * as GOJI from 'goji_ui'

function App() {
	const [visible, setVisible] = useState(false)
	const [ev, setEv] = useState(false)
	return <div>
		{/* <GOJI.Tab
			extSelector={'.tab'}
			extension={<div>这是扩展的内容</div>}
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
		/> */}

		<TestTable />

		<h1>test</h1>
		<button
			onClick={() => {
				setVisible(true)
			}}
		>
			show modal
		</button>
		<Tab
			onTabChange={() => {
				setEv(true)
			}}
			hiddenStyle={{
				height: '0px',
				overflow: 'hidden'
			}}
			tabContentVisible={ev}
			extSelector={'[aria-label="tab"]'}
			extension={<div onClick={() => { setEv(!ev) }} className="ext">这是扩展的内容</div>}
			items={[
				{
					title: "tab1",
					key: "tab1",
					children: <div>tab1</div>
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
			beforeUpload={(f) => {
				for (var i = 0; i < f.length; i++) {
					console.log(f[i].name)
				}
				return new Promise((r, j) => {
					setTimeout(() => {
						r(f)
					}, 1000);
				})
			}}

			valueFilter={({ response }) => {
				return (response as Record<string, Object>).url
			}}
			onComplete={(res: any[]) => {
				console.log(res)
			}}
		>
			请选择文件
		</Upload>
	</div >
}

ReactDom.render(<App />, document.getElementById("app"))
