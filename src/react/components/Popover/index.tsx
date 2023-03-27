import React, { CSSProperties, memo, useCallback, useState } from 'react'

import type { FC, ReactNode } from 'react'

import styles from './styles.module.less'

interface IProps {
	children?: ReactNode // 默认元素
	content?: ReactNode // 展示内容元素
	title?: string | ReactNode // 标题
	action?: string | ReactNode // 底部操作栏
	// position?: number // popover 偏移位置
	trigger?: 'hover' | 'click' // 如何触发
	placement?: 'top' | 'bottom' // popover 出现位置
}

/**
 * TODO
 * 1. 只能作用在行内元素，如果多个popover层叠排版会显示在最上层
 * 2. 如果元素设置了偏移，显示位置不对
 */

const Popover: FC<IProps> = props => {
	const {
		children,
		content,
		title,
		// position = 0,
		trigger = 'hover',
		placement = 'bottom'
	} = props
	const [show, setShow] = useState(false)
	const [modalStyle, setModalStyle] = useState<CSSProperties>({})
	const childrenRef = useCallback((node: HTMLDivElement) => {
		if (node !== null) {
			let rect = node.getBoundingClientRect()
			if (node.children[0]) {
				rect = node.children[0].getBoundingClientRect()
			}
			setModalStyle(setupModalStyle(rect))
		}
	}, [])

	const setupModalStyle = (rect: DOMRect) => {
		const position: Record<'top' | 'bottom', CSSProperties> = {
			top: {
				transform: `translate(${0}px, ${-rect.bottom + 60}px)`
			},
			bottom: {
				transform: `translate(${0}px, ${16}px)`
			}
		}
		return position[placement]
	}

	/* 三角形位置 */
	const triangleClassNames = [
		styles.triangle,
		placement === 'top' ? styles.triangleTop : styles.triangleBottom
	].join(' ')

	/* 事件处理 */
	const onMouseEnter = () => {
		if (show) return
		trigger == 'hover' && setShow(true)
	}
	const onMouseLeave = () => trigger === 'hover' && setShow(false)

	const onMouseClick = () => trigger === 'click' && setShow(!show)

	return (
		<div className={styles.popover} onClick={e => e.stopPropagation()}>
			<div
				ref={childrenRef}
				className={styles.children}
				onMouseEnter={e => {
					e.stopPropagation()
					onMouseEnter()
				}}
				onMouseLeave={e => {
					e.stopPropagation()
					onMouseLeave()
				}}
				onClick={e => {
					e.stopPropagation()
					onMouseClick()
				}}>
				{children}
			</div>
			<div
				className={styles.modal}
				style={{ ...modalStyle, display: show ? 'block' : 'none' }}>
				<div className={triangleClassNames}></div>
				{title && (
					<div className={[styles.title, styles.layout].join(' ')}>{title}</div>
				)}
				{content && (
					<div className={[styles.content, styles.layout].join(' ')}>
						{content}
					</div>
				)}
				<div className={styles.action}></div>
			</div>
		</div>
	)
}

export default memo(Popover)
