import React, { ReactElement, useMemo } from "react";

import styles from "./table.module.less";

interface IColProps {
  key: string;
  title: string;
  render?(data: any): ReactElement;
}

interface ITableProps {
  className?: string;
  data: Array<any>;
  cols: Array<IColProps>;
}

export default function Table(props: ITableProps) {
  const { data, cols, className } = props;

  const col = useMemo(() => {
    return cols?.map((c) => {
      return <td key={c?.key}>{c?.title}</td>;
    });
  }, [cols]);

  return (
    <table className={`${className} ${styles.table}`}>
      <thead>
        <tr>{col}</tr>
      </thead>
      <tbody>
        {data?.map((d) => {
          return (
            <tr key={d.id}>
              {cols?.map((c) => {
                if (c.render) {
                  return <td key={c.key}>{c.render(d)}</td>;
                }
                return <td key={c.key}>{d[c.key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
