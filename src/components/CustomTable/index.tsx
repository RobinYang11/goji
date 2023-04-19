import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import styles from './index.module.less';

interface ColumnObject {
  title: string;
  dataIndex: string;
  key: string;
  width: number;
  sorter?: boolean, // 是否可排序
  filter?: boolean, // 是否参与筛选
  render?: (val: any) => HTMLElement
}

interface TableProps {
  data: Record<string, any>[];
  columns: ColumnObject[];
}

enum ORDER_LIST {
  NORMAL, // 原顺序
  ASC, // 升序
  DESC // 降序
}

const CustomTable: React.FC<TableProps> = (props) => {
    const { data, columns } = props;

    // 表格数据
    const [tableData, setTableData] = useState(data);
    // 排序标识
    const [order, setOrder] = useState(ORDER_LIST.NORMAL);
    // 是否需要筛选输入框
    const [isNeedFilter, setIsNeedFilter] = useState(false);

    // 原始数据
    const originalDataRef = useRef(data);
    // 筛选列
    const filterKeysRef = useRef([]);

    // 排序
    const handleSort = useCallback((key: string) => {
        let _data = originalDataRef.current;
        switch (order) {
            case 0:
                _data = [...tableData].sort((a, b) => {
                    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                        return a[key] - b[key];
                    } else if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                        return a[key].localeCompare(b[key]);
                    }
                });
                setOrder(ORDER_LIST.ASC);
                break;
            case 1:
                _data = [...tableData].sort((a, b) => {
                    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                        return b[key] - a[key];
                    } else if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                        return b[key].localeCompare(a[key]);
                    }
                });
                setOrder(ORDER_LIST.DESC);
                break;
            case 2:
                setOrder(ORDER_LIST.NORMAL);
                break;
            default:
                break;
        }
        setTableData(_data);
    }, [order, tableData]);

    // 指定列数据筛选（只考虑字符串数据筛选）
    const handleFileter = useCallback((val: string) => {
        if (!val) {
            setTableData(originalDataRef.current);
        }
        const _tableData: Record<string, any>[] = [];
        const codeList: string[] = [];
        originalDataRef.current.forEach(data => {
            filterKeysRef.current.forEach(key => {
                if (data[key].includes(val) && !codeList.includes(data.code)) {
                    _tableData.push(data);
                    codeList.push(data.code);
                }
            });
        });
        setTableData(_tableData);
    }, []);

    const debounceClick = debounce((val) => handleFileter(val), 1000);

    const columnList = useMemo(() => {
        return columns.map(col => (
            <th key={col.key}
                style={{ width: col.width }}
            >
                <div className={styles.th_wrap}>
                    <div>{col.title}</div>
                    {
                        col.sorter ?
                            <div className={styles.sorter_icon}
                                onClick={() => handleSort(col.key)}
                            >{ORDER_LIST[order]}</div>
                            : null
                    }
                </div>
            </th>
        ));
    }, [columns, order, handleSort]);

    const dataList = useMemo(() => {
        return tableData.length ? tableData.map(record => (
            <tr
                key={record.code}
            >
                {
                    columns.map(col => (
                        <td className={styles.td_wrap}
                            key={col.key}
                            style={{ width: col.width }}
                        >{col.render ? col.render(record[col.key]) : record[col.key]}</td>
                    ))
                }
            </tr>
        )) : <tr>
            <td className={styles.empty_text}
                colSpan={columns.length}
            >暂无数据</td>
        </tr>;
    }, [columns, tableData]);

    // 判断是否需要筛选
    const handelPreJudgment = useCallback(() => {
        columns.forEach(col => {
            if (col.filter) {
                (filterKeysRef.current as string[]).push(col.key);
                setIsNeedFilter(true);
            }
        });
    }, [columns]);

    useEffect(() => {
        handelPreJudgment();
    }, []); // eslint-disable-line

    return (
        <div className={styles.wrap}>
            {
                isNeedFilter ? (
                    <>
                        <span className={styles.filter_tips}>数据筛选：</span>
                        <input className={styles.filter_input}
                            onInput={(e) => debounceClick((e.target as HTMLInputElement).value)}
                            placeholder="请输入"
                        />
                    </>
                ) : null
            }
            <table border={1}>
                <thead>
                    <tr>{columnList}</tr>
                </thead>
                <tbody>{dataList}</tbody>
            </table>
        </div>
    );
};

export default CustomTable;
