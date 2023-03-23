import React, { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./dropDown.module.less";
import Model from "./model";

type trigger = "click" | "hover";
type position = "bottomRight" | "bottom" | "top" | "topRight";

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

  const fixedPosition = {
    bottomRight: {
      top: "30px",
    },
    bottom: {
      top: "30px",
    },
    top: {
      bottom: "30px",
    },
    topRight: {
      bottom: "30px",
    },
  };

  const modelClassName = {
    bottom: "modelCenter",
    bottomLeft: "modelLeft",
    top: "modelTopCenter",
    topRight: "modelTopRight",
  };

  return (
    <>
      {trigger === "hover" ? (
        <div
          id="dropDown"
          className={styles.dropDown}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <button disabled={disable} className={styles.dropDownButton}>
            {children}
          </button>
          {(show === true || visible === true) &&
            createPortal(
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
        </div>
      ) : (
        <div id="dropDown" className={styles.dropDown}>
          <button
            onClick={() => onChangeVisible()}
            disabled={disable}
            className={styles.dropDownButton}
          >
            {children}
          </button>
          {(show === true || visible === true) &&
            createPortal(
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
        </div>
      )}
    </>
  );
};

export default DropDown;
