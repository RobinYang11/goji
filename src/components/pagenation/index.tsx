import React, { useMemo, useState } from "react";
import styles from "./index.module.less";
import classNames from "classnames";

interface IPageNation {
  /**
   * total:总数
   */
  total?: number | undefined;
  /**
   * pageSize:每页个数
   */
  pageSize: number | undefined;
  /**
   * 默认在第几页数
   */
  defaultCurrent: number | undefined;
  /**
   * dataSource:数据
   */
  dataSource: Array<any> | undefined;
  /**
   * onChange:通过onChange可以获取到当前页数
   */
  onChange?: (current: any) => void | undefined;
}

function Pagination(props: IPageNation) {
  const { total, pageSize, defaultCurrent, dataSource, onChange } = props;
  const [current, setCurrent] = useState<number>(defaultCurrent);
  let totalPage = Math.ceil(dataSource?.length / pageSize);

  function handlePrevPage() {
    if (current > 1) {
      setCurrent(current - 1);
    }
  }

  function handleNextPage() {
    if (current < totalPage) {
      setCurrent(current + 1);
    }
  }

  const pageCurrent = useMemo(() => {
    let temp: Array<number> = [];
    for (let i = 1; i < totalPage + 1; i++) {
      temp.push(i);
    }
    return temp;
  }, []);

  const handleAction = (cur: number) => {
    onChange(cur);
    setCurrent(cur);
  };

  return (
    <div className={styles.pageNation}>
      <ul className={styles.pageNationList}>
        <li className={styles.previousPage} onClick={handlePrevPage}>
          {"<"}
        </li>
        {dataSource && dataSource?.length >= 0 ? (
          pageCurrent?.map((cur: number) => {
            return (
              <li
                key={Math.random()}
                className={classNames(
                  `${styles.pageNationItem} ${
                    current === cur ? styles.currentPage : ""
                  }`
                )}
                onClick={() => handleAction(cur)}
              >
                {cur}
              </li>
            );
          })
        ) : (
          <>
            <li className={styles.pageNationItem}>1</li>
            <li className={styles.pageNationItem}>2</li>
            <li className={styles.pageNationItem}>3</li>
            <li className={styles.pageNationItem}>4</li>
            <li className={styles.pageNationItem}>5</li>
          </>
        )}
        <li className={styles.nextPage} onClick={handleNextPage}>
          {">"}
        </li>
      </ul>
      <span>
        当前页: {current} / 总页数: {total ? total : totalPage}
      </span>
    </div>
  );
}

export default Pagination;
