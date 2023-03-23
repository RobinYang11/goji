import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./dropDown.module.less";

type trigger = "click" | "hover";
type position = "left" | "right" | "top" | "bottom";
interface IDropDown {
  // trigger?: ("click" | "hover")[];
  trigger: trigger;
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
  visible?: boolean;
  disable?: boolean;
  modelContent: object[];
  width?: number;
  position?: position;
  onChangeVisible: () => void;
}

const DropDown: React.FC<IDropDown> = ({
  trigger,
  style,
  width,
  className,
  children,
  visible,
  disable,
  modelContent,
  position,
  onChangeVisible,
}) => {
  const [show, setShow] = useState(visible);
  const dropDown = document.getElementById("dropDown") as HTMLElement;

  const fixedPositon = () => {
    switch (position) {
      case "left":
        return {
          bottom: 0,
          left: 0,
        };
      case "right":
        return {
          right: 0,
          top: 0,
        };
      case "top":
        return {
          bottom: 0,
          left: 0,
        };
      case "bottom":
        return {
          bottom: 0,
          left: 0,
        };
      default:
        break;
    }
  };

  return (
    <div id="dropDown" className={styles.dropDown}>
      {trigger === "click" ? (
        <button
          onClick={() => onChangeVisible()}
          disabled={disable}
          className={styles.dropDownButton}
        >
          {children}
        </button>
      ) : (
        <button
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          disabled={disable}
          className={styles.dropDownButton}
        >
          {children}
        </button>
      )}

      {(show === true || visible === true) &&
        createPortal(
          <div
            className={styles.model}
            style={{ width: `${width}px` }}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
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
            {/* {modelContent} */}
          </div>,
          dropDown
        )}
    </div>
  );
};

export default DropDown;
