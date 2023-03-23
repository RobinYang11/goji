import React from "react";
import { createPortal } from "react-dom";
import styles from "./dropDown.less";

interface IModel {
  modelContent: object[];
  dropDown?: HTMLElement;
  width?: number;
  fixedPosition: any;
}

const Model: React.FC<IModel> = ({
  modelContent,
  dropDown,
  width,
  fixedPosition,
}) => {
  console.log('====',modelContent, dropDown, width, fixedPosition);

  return (
    <>
      {createPortal(
        <div
          className={styles.modelCenter}
          style={{ width: `${width}px`, ...fixedPosition[position] }}
        >
          <ul className={styles.modelList}>
            {modelContent?.map((item) => {
              return (
                <li key={item?.id} className={styles.modalListItem}>
                  {item?.label}
                </li>
              );
            })}
          </ul>
        </div>,
        dropDown
      )}
    </>
  );
};

export default Model;
