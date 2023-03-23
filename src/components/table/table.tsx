import React from "react";
import styles from "./table.module.less";
interface Column {
  title: string;
  dataIndex: string;
}

interface Props {
  data: any[];
  columns: Column[];
}

enum SortOrder {
  Ascending = "ascend",
  Descending = "descend",
  None = "none",
}

interface State {
  sortOrder: SortOrder;
  sortColumn: string;
  filteredData: any[];
  filterValues: { [key: string]: any };
}

export default class Table extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sortOrder: SortOrder.None,
      sortColumn: "",
      filteredData: props.data,
      filterValues: {},
    };
  }

  handleSort = (column: Column) => {
    const { dataIndex } = column;
    const { sortOrder, sortColumn } = this.state;

    let newSortOrder: SortOrder = SortOrder.Ascending;
    if (sortColumn === dataIndex) {
      newSortOrder =
        sortOrder === SortOrder.Ascending
          ? SortOrder.Descending
          : SortOrder.Ascending;
    }

    let newData = [...this.state.filteredData];
    if (newSortOrder !== SortOrder.None) {
      newData = newData.sort((a, b) =>
        newSortOrder === SortOrder.Ascending
          ? a[dataIndex] - b[dataIndex]
          : b[dataIndex] - a[dataIndex]
      );
    }

    this.setState({
      sortOrder: newSortOrder,
      sortColumn: dataIndex,
      filteredData: newData,
    });
  };

  handleFilter = (column: Column, value: any) => {
    const { dataIndex } = column;
    const { filterValues } = this.state;

    const newFilterValues = { ...filterValues, [dataIndex]: value };

    let newData = [...this.props.data];
    Object.keys(newFilterValues).forEach((key) => {
      const filterValue = newFilterValues[key];
      if (filterValue !== null && filterValue !== undefined) {
        newData = newData.filter(
          (item) => item[key].toString() === filterValue.toString()
        );
      }
    });

    this.setState({
      filteredData: newData,
      filterValues: newFilterValues,
    });
  };

  render() {
    const { columns } = this.props;
    const { sortOrder, sortColumn, filteredData, filterValues } = this.state;

    return (
      <div className={styles.content}>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.dataIndex}>
                  {column.title}
                  <button
                    onClick={() => this.handleSort(column)}
                    disabled={sortOrder === SortOrder.None}
                  >
                    {sortColumn === column.dataIndex &&
                    sortOrder === SortOrder.Ascending
                      ? "↑"
                      : "↓"}
                  </button>
                  <select
                    value={filterValues[column.dataIndex] || ""}
                    onChange={(e) => this.handleFilter(column, e.target.value)}
                  >
                    <option value="">All</option>
                    {filteredData
                      .map((item) => item[column.dataIndex])
                      .filter(
                        (value, index, self) => self.indexOf(value) === index
                      )
                      .map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                  </select>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.dataIndex}>{item[column.dataIndex]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
