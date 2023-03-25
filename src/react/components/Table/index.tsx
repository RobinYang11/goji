import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'

import styles from './styles.module.less'
import TableFilterPopover from '../TableFilterPopover'
import Pagination from '../Pagination'

type Cols = {
	title: string
	dataIndex: string
	key: string
}

interface IProps {
	data: Record<string, any>[]
	cols: Cols[]
	children?: ReactNode
}

const Table: FC<IProps> = props => {
	const { data, cols } = props
	const curData = useRef<Record<string, any>[]>([])
	const allRawData = useRef<Record<string, any>[][]>([])
	const [dataSource, setDataSource] = useState<Record<string, any>[]>([])
	const [pageInfo, setPageInfo] = useState({ pageSize: 10, pageNo: 1 })

	const colList = cols.map((item, index) => (
		<th key={item.key} onClick={e => onSort(item.dataIndex)}>
			<div className={styles.filter}>
				<div>{item.title}</div>
				<TableFilterPopover
					onSearch={value => onSearch(item.dataIndex, value)}
					onRest={() => onRest()}>
					<div className={styles.icon}></div>
				</TableFilterPopover>
			</div>
		</th>
	))

	const trList = dataSource.map((item, index) => (
		<tr key={index}>
			{Object.entries(item).map(([key, value]) => (
				<th key={value}>{value}</th>
			))}
		</tr>
	))

	/* 初始化数据 */
	const setupData = (data: Record<string, any>[]) => {
		const newData: any[] = []
		let i = 1
		let total = 0
		while (total < data.length) {
			newData.push(data.slice(total, 10 * i))
			i++
			total += 10
		}
		curData.current = [...newData[0]]
		allRawData.current = newData
	}

	useEffect(() => {
		setupData(data)
	}, [data])

	useEffect(() => {
		curData.current = [...allRawData.current[pageInfo.pageNo - 1]]
		setDataSource(allRawData.current[pageInfo.pageNo - 1])
	}, [pageInfo])

	/* 随机排序 */
	const onSort = (dataIndex: string) => {
		const values = dataSource.map((item, index) => ({
			index,
			value: item[dataIndex]
		}))
		values.sort((a, b) => 0.5 - Math.random())
		setDataSource(values.map(item => dataSource[item.index]))
	}

	/* 模糊查询 */
	const onSearch = (dataIndex: string, searchvalue: string) => {
		const indexs: number[] = []
		const values = curData.current.map(item => item[dataIndex])
		for (let i = 0; i < values.length; i++) {
			if (String(values[i]).indexOf(searchvalue) >= 0) {
				indexs.push(i)
			}
		}
		setDataSource(indexs.map(index => curData.current[index]))
	}

	/* 重置 */
	const onRest = () => {
		setDataSource([...curData.current])
	}

	return (
		<div className={styles.wrap}>
			<table className={styles.table}>
				<thead className={styles.header}>
					<tr>{colList}</tr>
				</thead>
				<tbody className={styles.content}>{trList}</tbody>
			</table>

			<Pagination
				{...pageInfo}
				totalPage={allRawData.current.length}
				onChange={e => {
					console.log(e)
					setPageInfo({ ...pageInfo, pageNo: e })
				}}
			/>
		</div>
	)
}

export default memo(Table)
