import React, { ReactElement, ReactNode, useMemo, useState } from "react";
import styles from "./table.less";
import Pop from "../pop";
import ListSelect from "../list_select/list_select";
import Pagination from "../pagination";

interface IColProps {
  key: string;
  title: string;
  render?(data: any): ReactElement | ReactNode;
  name: string;
  sort?(a: any, b: any): number;
  filters?: { label: string; value: string }[];
}

interface ITableProps {
  className?: string;
  data: Array<any>;
  cols: Array<IColProps>;
  [x: string]: any;
}

export default function Table(props: ITableProps) {
  const { data, cols, className, ...remain } = props;
  const [customData, setCustomData] = useState<any[]>(data);
  const { width, pagination } = remain || {};
  console.log(pagination);
  /**
   * @description 过滤函数
   * @param value{选中的值}
   * @returns
   */
  const filterFn = (value: any) => {
    if (!value.length) {
      setCustomData(data);
      return;
    }
    let a = value.reduce((pre: any[], cur: any) => {
      console.log(
        pre,
        customData.filter((el: any) => el.id === cur),
        customData,
        "asdasd"
      );
      return [...pre, ...data.filter((el: any) => el.id === cur)];
    }, []);
    setCustomData(a);
  };
  /**
   * @description 排序函数
   * @param mode {'desc' | 'asc'}
   * @param cb (a:any,b:any)=>number
   */
  const sortFn = (mode: "desc" | "asc", cb?: (a: any, b: any) => number) => {
    if (mode === "asc") {
      cb &&
        setCustomData((v) => {
          const sortArr = v.sort(cb);
          return [...sortArr];
        });
    } else {
      cb &&
        setCustomData((v) => {
          return [...v.sort(cb).reverse()];
        });
    }
  };
  const col = useMemo(() => {
    return cols?.map((c) => {
      return (
        <th key={c?.key}>
          {c?.title}
          <span className={styles.lv}>
            {!!c?.filters?.length && (
              <Pop
                title={"选择一项进行筛选"}
                content={
                  <ListSelect
                    items={c.filters}
                    mode="multiple"
                    onChange={filterFn}
                  />
                }
              >
                <a className={styles.littleFn}>滤</a>
              </Pop>
            )}
            {!!c.sort && (
              <>
                <a
                  className={styles.littleFn}
                  onClick={() => sortFn("asc", c.sort)}
                >
                  升
                </a>
                <a
                  className={styles.littleFn}
                  onClick={() => sortFn("desc", c.sort)}
                >
                  降
                </a>
              </>
            )}
          </span>
          {/* {
					<div >
						1:<input type={'checkbox'} value={'1'} ></input>
						2:<input type={'checkbox'} value={'2'}></input>
					</div>
				} */}
        </th>
      );
    });
  }, [cols, customData]);
  return (
    <table
      className={
        className ? styles?.tableStyle.join(className, " ") : styles?.tableStyle
      }
      style={{ width: width }}
      {...remain}
    >
      <thead>
        <tr>{col}</tr>
      </thead>
      <tbody>
        {customData?.map((d) => {
          return (
            <tr key={d.id}>
              {cols?.map((c) => {
                if (c.render) {
                  if (c.key === "options") {
                    return (
                      <td
                        key={c.key}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        {c.render(d)}
                      </td>
                    );
                  }
                  return <td key={c.key}>{c.render(d)}</td>;
                }
                return <td key={c.key}>{d?.[c.name]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      {pagination && (
        <tfoot>
          {/* 假设表格前端进行分页管理，数据一开始全请求到。 */}
          <Pagination
            pageSize={pagination?.pageSize}
            onChange={(pageSize, PageNo) => {
              setCustomData((v) =>
                data.slice(
                  (PageNo - 1) * pageSize,
                  (PageNo - 1) * pageSize + pageSize
                )
              );
            }}
            total={Math.ceil(data.length / pagination.pageSize)}
          ></Pagination>
        </tfoot>
      )}
    </table>
  );
}
