import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./dropDown.module.less";

type trigger = "click" | "hover";

interface IDropDown {
  // trigger?: ("click" | "hover")[];
  trigger: trigger;
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
  visible?: boolean;
  disable?: boolean;
  modelContent: ReactNode;
  width: number;
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
  onChangeVisible,
}) => {
  const [show, setShow] = useState(visible);
  const dropDown = document.getElementById('dropDown') as HTMLElement;

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
          <div className={styles.model} style={{ width: `${width}px` }}>
            {modelContent}
          </div>,
          dropDown
        )}
    </div>
  );
};

export default DropDown;
