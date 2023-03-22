
import React, { ReactElement, useMemo, useContext, useState, FormEvent } from 'react';

const TableContext = React.createContext<{
	cols: Array<IColProps>,
	data: Array<any>,
	renderData: Array<any>,
	setStore?(store: any): void
}>({
	cols: [],
	data: [],
	renderData: [],
});

export interface IColProps {
	key: string;
	title: string;
	render?(data: any): ReactElement;
	sort?: boolean;
	screening?: boolean;
}

interface ITableProps<RowType> {
	className?: string;
	data: Array<RowType>;
	cols: Array<IColProps>
}

export default function Table<RowType extends Record<string, any>>(props: ITableProps<RowType>) {
	const { data: OutData, cols: OutCols, className } = props;

	const [store, setStore] = useState({
		cols: OutCols,
		renderData: OutData.slice()
	})

	return (
		<TableContext.Provider value={{
			cols: OutCols,
			data: OutData,
			renderData: store.renderData,
			setStore
		}}>
			<table border={1} className={className}>
				<THead />
				<TBody />
			</table>
		</TableContext.Provider>
	)
}

function THead() {
	let { cols, data, setStore } = useContext(TableContext)
	const [show, setShow] = useState(false)
	const [searchInputs, setSearchInputs] = useState<Record<string, any>>({})

	const sort = (key: string) => {
		// 拷贝一份数据
		const newData = data.slice()

		// 过滤数据 简单排序
		setStore?.((store: any) => ({
			...store,
			renderData: newData.sort((pre, next) => {
				const a = pre[key]
				const b = next[key]
				if (typeof a === 'string' && typeof b === 'string') {
					// 如果两个元素都是字符串，则按照字母顺序排序
					return a.localeCompare(b);
				} else if (typeof a === 'number' && typeof b === 'number') {
					// 如果两个元素都是数字，则按照数值大小排序
					return a - b;
				} else {
					// 否则，将数字排在字符串的前面
					return typeof a === 'string' ? 1 : -1;
				}
			})
		}))
	}

	const screening = () => {
		setShow(!show)
	}

	const changeSearchValue = (v: FormEvent<HTMLInputElement>, key: string) => {
		const keyword = (v.target as HTMLInputElement).value
		// 拷贝一份数据
		const newData = data.slice()
		// 过滤数据 简单排序
		setStore?.((store: any) => ({
			...store,
			renderData: newData.filter((rowData) => {
				return rowData[key].indexOf(keyword) > -1
			})
		}))

		setSearchInputs(prevState => ({ ...prevState, [key]: (v.target as HTMLInputElement).value }))
	}

	// 等待性能优化
	const col = useMemo(() => {
		const renderSearchInput = (c: IColProps) => {
			if (!c.screening || !show) {
				return null
			}

			return (
				<input
					key={c.key}
					value={searchInputs[c.key] || ''}
					onInput={(e) => changeSearchValue(e, c.key)}
					placeholder="筛选"
				/>
			)
		}

		return cols?.map(c => {
			return <td key={c?.key}>
				{c?.title}
				{c?.sort && <button onClick={() => sort(c.key)}>排序</button>}
				{c?.screening && <button onClick={() => screening()}>{show ? "关闭筛选" : "筛选"}</button>}
				{renderSearchInput(c)}
			</td>
		})
	}, [cols, show, searchInputs])

	return (
		<thead>
			<tr>{col}</tr>
		</thead>
	)
}

function TBody<RowType extends Record<string, any>>() {
	const { renderData, cols } = useContext<{
		cols: Array<IColProps>,
		data: Array<RowType>,
		renderData: Array<RowType>,
	}>(TableContext)

	const renderTd = (col: IColProps, rowData: RowType) => {
		return <td key={col.key}>{
			col.render
				? col.render(rowData)
				: rowData[col.key]
		}</td>
	}

	return (
		<tbody>{
			renderData?.map(d => {
				return (
					<tr key={d.id}>
						{cols?.map(c => renderTd(c, d))}
					</tr>
				)
			})
		}</tbody>
	)
}
