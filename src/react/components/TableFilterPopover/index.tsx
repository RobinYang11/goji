import React, { memo, useState } from 'react'

import type { FC, ReactNode, MouseEvent } from 'react'

import styles from './styles.module.less'
import Popover from '../Popover'

type FilterProps = {
	children: ReactNode
	onSearch?: (value: string) => void
	onRest?: () => void
}

const TableFilterPopover: FC<FilterProps> = props => {
	const { children, onSearch, onRest } = props

	const [value, setValue] = useState('')
	const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		onSearch && onSearch(value)
	}

	const handleRest = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		onRest && onRest()
	}

	return (
		<Popover
			placement='bottom'
			trigger='click'
			title={
				<input
					className={styles.input}
					value={value}
					onChange={e => {
						e.stopPropagation()
						setValue(e.target.value)
					}}
					placeholder='请输入搜索内容'
				/>
			}
			content={
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<button className={styles.searchBtn} onClick={e => handleSearch(e)}>
						Search
					</button>
					<button
						className={styles.restBtn}
						onClick={e => {
							handleRest(e)
							setValue('')
						}}>
						Rest
					</button>
				</div>
			}>
			{children}
		</Popover>
	)
}

export default memo(TableFilterPopover)
