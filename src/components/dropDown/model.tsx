import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from "./dropDown.module.less";

interface IModel {
  modelContent: object[] | undefined;
  dropDown?: HTMLElement | undefined;
  width?: number | undefined;
  fixedPosition?: any;
  position?: string | undefined;
  className?: string | undefined;
  style?: React.CSSProperties;
}

const Model: React.FC<IModel> = ({
  modelContent,
  dropDown,
  width,
  fixedPosition,
  position,
  className,
  style,
}) => {
  return (
    <>
      {createPortal(
        <div
          className={`${styles.modelCenter} ${fixedPosition(
            position
          )} ${className}`}
          style={{ width: `${width}px`, ...style }}
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
