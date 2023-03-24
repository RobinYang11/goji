import React, { memo, ReactElement, useMemo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'

import styles from './styles.module.less'

interface IProps {
	children?: ReactNode
	pageNo: number
	pageSize: number
	totalPage: number
	onChange?: (curPage: number) => void
}

const Pagination: FC<IProps> = props => {
	const { totalPage, pageNo, pageSize, onChange } = props

	const [pageInfo, setPageInfo] = useState({ pageNo, pageSize })

	const isCan = (pageNo: number, totalPage: number) => {
		if (pageNo <= 0) return false
		if (pageNo > totalPage) return false
		return true
	}

	const onPreOrNextPage = (type: 'next' | 'pre' = 'next') => {
		const curPageNo = type === 'next' ? pageNo + 1 : pageNo - 1
		if (isCan(curPageNo, totalPage)) {
			setPageInfo({ ...pageInfo, pageNo: curPageNo })
			onChange && onChange(curPageNo)
		}
	}
	const onCurPageClick = (pageNo: number) => {
		if (isCan(pageNo, totalPage)) {
			setPageInfo({ ...pageInfo, pageNo })
			onChange && onChange(pageNo)
		}
	}

	const allPageEl = useMemo(() => {
		const nodes = []
		for (let i = 0; i < totalPage; i++) {
			const isActive = pageInfo.pageNo === i + 1
			const classnames = [
				styles.paginationItem,
				isActive ? styles.active : ''
			].join(' ')
			nodes.push(
				<div
					className={classnames}
					key={i}
					onClick={e => onCurPageClick(i + 1)}>
					{i + 1}
				</div>
			)
		}
		return nodes
	}, [totalPage, pageInfo])

	return (
		<div className={styles.pagination}>
			<div
				className={styles.paginationItem}
				onClick={e => onPreOrNextPage('pre')}>
				&lt;
			</div>
			<>{allPageEl}</>
			<div className={styles.paginationItem} onClick={e => onPreOrNextPage()}>
				&gt;
			</div>
		</div>
	)
}

export default memo(Pagination)
