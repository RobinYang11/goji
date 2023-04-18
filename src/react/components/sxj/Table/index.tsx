import { useState, useEffect } from 'react'
import './iconfont.css'
import './index.less'

export interface ClosProps {
    dataIndex: string;
    title: string;
    cell?: (text: string | number | any, index: number, record: Record<string, any>) => React.ReactNode;
    // 本地排序函数
    sorter?: (next: any, pre: any) => number;
    // 多序排列的级别  排序以最高级别为准
    multipleLeave?: number;
    // 开启了多列排序才有效
    defaultSortOrder?: 'asc' | "desc" | null
}

export interface TabProps {
    data?: any[];
    // 列渲染函数
    cols?: ClosProps[];
    // 多列排序 以级别高的为准
    multipleSorter?: boolean;
    // 是否要服务端排序 true则不进行前端本地排序
    serviceSorter?: boolean
}


interface sorterFieIdTyPe {
    fileId: string;
    sorteStatus: 'asc' | "desc" | null;
    leave: number
}

const fn = (next: any, pre: any) => {
    return 1
}
export const Table = ({ data = [], cols = [], multipleSorter, serviceSorter = false }: TabProps) => {
    // 排序字段
    const [sorterFieId, setSorterFieId] = useState<sorterFieIdTyPe[]>([])

    // 排序函数
    const handleSorter = (itemData: any[], sorterList: sorterFieIdTyPe[]) => {
        const filterSorterList = sorterList.filter((v) => (v && v?.sorteStatus)).sort((next, pre) => (next?.leave - pre?.leave))
        const newDataSource = filterSorterList.reduce((all, item) => {
            const newAll = all.sort((next, pre) => {
                const sorterFn: (next: any, pre: any) => number = cols.filter((v) => (v?.dataIndex === item?.fileId))[0]?.sorter || fn;
                if (item?.sorteStatus === 'asc') {
                    return sorterFn && sorterFn(next, pre)
                }
                return sorterFn && sorterFn(next, pre) * -1
            })
            all = newAll
            return all
        }, itemData)
        return newDataSource
    }
    // 表格渲染值
    const [dataSource, setDataSource] = useState<any[]>([]);


    useEffect(() => {
        if (multipleSorter) {
            const colSorterArr: sorterFieIdTyPe[] = cols.map((v) => {
                if (v?.defaultSortOrder && v?.sorter) {
                    return {
                        fileId: v?.dataIndex,
                        sorteStatus: v?.defaultSortOrder,
                        leave: v?.multipleLeave || 1
                    }
                }
                return {
                    fileId: '',
                    sorteStatus: null,
                    leave: 1
                }
            }).filter((v) => (v && v?.fileId))
            setSorterFieId(colSorterArr)
        }
    }, [])

    // 将数据排序
    useEffect(() => {
        if (!serviceSorter) {
            const arr = [...handleSorter([...data], sorterFieId)]
            setDataSource(arr)
        }

    }, [sorterFieId, data])
    // cell渲染函数
    const cellRender = (item: ClosProps, itemData: Record<string, any>, index: number) => {
        if (item?.cell) {
            return item?.cell(itemData?.[item?.dataIndex], index, itemData)
        }
        return (
            itemData?.[item?.dataIndex] || ''
        )
    }

    // 排序按钮选中样式
    const isActionRender = (item: ClosProps, type: 'asc' | "desc"): Record<string, any> => {
        if (sorterFieId.some((v) => (v?.fileId === item?.dataIndex && v?.sorteStatus === type))) {
            return {
                color: "#1677ff"
            }
        }
        return {}
    }

    // 获取下一步为降序升序还是取消排序
    const sorterFlow = (item: ClosProps): 'asc' | "desc" | null => {
        const { dataIndex } = item;

        const getStatus = (): 'asc' | "desc" | null => {
            const status = sorterFieId?.filter((v) => (v?.fileId === dataIndex && v?.sorteStatus))[0]?.sorteStatus;
            if (status === 'asc') {
                return 'desc'
            }
            if (status === 'desc') {
                return null
            }
            return 'asc'
        }

        const itemStatus = sorterFieId?.some((v) => (v?.fileId === dataIndex && v?.sorteStatus)) ? getStatus() : 'asc';
        return itemStatus
    }

    // 点击排序Click
    const sorterClick = (item: ClosProps) => {
        // 下一步的状态
        const status = sorterFlow(item)
        if (multipleSorter) {
            const itemSorterFieId = sorterFieId.filter((v) => (v?.fileId === item?.dataIndex))
            const newSorterFieId: sorterFieIdTyPe[] = itemSorterFieId.length ? sorterFieId.map((v) => {
                if (v?.fileId === item?.dataIndex) {
                    return {
                        ...v,
                        sorteStatus: status,
                        leave: item?.multipleLeave || 1
                    }
                }
                return v
            }) : [...sorterFieId, {
                fileId: item?.dataIndex,
                sorteStatus: status,
                leave: item?.multipleLeave || 1
            }]

            setSorterFieId(newSorterFieId)
        } else {
            setSorterFieId([{ fileId: item?.dataIndex, sorteStatus: status, leave: 1 }])
        }

    }

    return (
        <table className='sxj-table-components-warp'>
            <thead className='sxj-table-components-thead'>
                {
                    cols.map((v) => (
                        <th
                            onClick={() => {
                                if (v?.sorter) {
                                    sorterClick(v)
                                }
                            }}
                            className={`sxj-table-components-th ${v?.sorter ? 'th-box-hover' : ''}`}>
                            <div className={`sxj-table-components-th-box`}>
                                <div className='th-main-box'>
                                    {v?.title}
                                </div>
                                {
                                    v?.sorter && (
                                        <div className='th-svg-warp'>
                                            <span style={isActionRender(v, 'asc')} className={`iconfont icon-shangxiazuoyouTriangle13 th-icon`} />
                                            <span style={isActionRender(v, 'desc')} className={`iconfont icon-shangxiazuoyouTriangle11 th-icon`} />
                                        </div>
                                    )
                                }
                            </div>
                        </th>
                    ))
                }
            </thead>
            {
                dataSource.map((v, index) => {
                    return (
                        <tr>
                            {
                                cols.map((item) => (
                                    <td className='sxj-table-components-td'>{cellRender(item, v, index)}</td>
                                ))
                            }
                        </tr>

                    )
                })
            }
        </table>
    )
} 