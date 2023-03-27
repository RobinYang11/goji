import React, {} from 'react'
import Table, { IColProps } from "./components/table/table";

interface RowData {
  id: string,
  [K: string]: any
}

export function TestTable() {
  const cols: IColProps[] = [
    {
      title: "tab1",
      key: "tab1",
      screening: true,
    },
    {
      title: "tab2",
      key: "tab2",
      render: () => <div>tab2</div>
    },
    {
      title: "tab3",
      key: "tab3",
      sort: true,
    }
  ]
  const data: RowData[] = [
    {
      id: 'row1',
      tab1: 'vvvvvalue-row1',
      tab2: 'tab2',
      tab3: 1
    },
    {
      id: 'row2',
      tab1: 'qqqqwww-row2',
      tab2: 'tab22',
      tab3: 5_518
    },
    {
      id: 'row3',
      tab1: 'qqqqwww-row3',
      tab2: 'tab22',
      tab3: 888
    }
  ]

  return (
    <>
      <h1>------- Table --------</h1>
      <Table<RowData> cols={cols} data={data} />
      <h1>-----------------------</h1>
    </>
  )
}
