import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'

import Table from './components/Table'
import Popover from './components/Popover'

interface IProps {
	children?: ReactNode
}

const hobby = ['乒乓球', '篮球', '足球', '羽毛球', '网球']
const address = ['福州', '杭州', '江苏', '厦门', '深圳']

const data = () => {
	return new Array<Record<string, any>>(72).fill({}).map((_, index) => ({
		name: `姓名${index + 1}`,
		age: Math.floor(Math.random() * 100),
		hobby: hobby[Math.floor(Math.random() * 5)],
		address: address[Math.floor(Math.random() * 5)]
	}))
}

const cols = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: '年龄',
		dataIndex: 'age',
		key: 'age'
	},
	{
		title: '爱好',
		dataIndex: 'hobby',
		key: 'hobby'
	},
	{
		title: '住址',
		dataIndex: 'address',
		key: 'address'
	}
]

const App: FC<IProps> = () => {
	return (
		<div style={{ marginTop: '100px' }}>
			<div style={{ display: 'flex', gap: '50px' }}>
				<Popover title='hover' placement='top'>
					<button>hover</button>
				</Popover>

				<Popover title='click' trigger='click' placement='bottom'>
					<button>click</button>
				</Popover>
			</div>

			<br />

			<div style={{ marginTop: '100px' }}>
				<h2>Table组件</h2>
				<h4>点击title栏进行排序(随机排序)</h4>
				<h4>点击白色方块进行筛选</h4>
				<h4>底部分页栏</h4>

				<Table data={data()} cols={cols} />
			</div>
		</div>
	)
}

export default memo(App)
