import React, { useEffect, useState } from "react";
import styles from "./index.less";
export default ({
  pageSize,
  onChange,
  total,
}: {
  pageSize: number;
  onChange: (pageSize: number, pageNo: number) => void;
  total: number;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    onChange && onChange(pageSize, activeIndex + 1);
  }, []);
  const handleChange = (i: number) => {
    setActiveIndex(i);
    onChange(pageSize, i + 1);
  };
  return (
    <ui className={styles.pagination}>
      <li className={activeIndex === 0 ? styles.disable : undefined}>{"<"}</li>
      {new Array(total).fill("").map((el, i) => {
        return (
          <li
            className={i === activeIndex ? styles.active : undefined}
            onClick={() => handleChange(i)}
            key={i}
          >
            {i + 1}
          </li>
        );
      })}
      <li className={activeIndex === total - 1 ? styles.disable : undefined}>
        {">"}
      </li>
    </ui>
  );
};
