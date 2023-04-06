import React, { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import "./dropDown.less";
import { v4 as uuidv4 } from "uuid";
type trigger = "click" | "hover";
type position = "bottomRight" | "bottom" | "top" | "topRight";

type IDropDown = {
  trigger: trigger;
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
  visible?: boolean;
  setVisible?: any;
  modelContent?: ReactNode;
  width?: number;
  position?: position;
  onChangeVisible: () => void;
  icons: ReactNode[];
};

const DropDown: React.FC<IDropDown> = ({
  trigger,
  style,
  width,
  className,
  children,
  visible,
  modelContent,
  position,
  icons,
  setVisible,
  onChangeVisible,
}) => {
  // const dropDown = document.getElementById("dropDown") as HTMLElement;

  const [optionValue, setOptionValue] = useState(children);

  const fixedPosition = (position: position) => {
    switch (position) {
      case "bottom":
        return "PositionBottom";
      case "bottomRight":
        return "PositionBottomRight";
      case "top":
        return "PositionTop";
      case "topRight":
        return "PositionTopRight";
      default:
        break;
    }
  };

  const handleSelected = (option: ReactNode) => {
    setOptionValue(option);
    setVisible(false);
  };

  return (
    <>
      {trigger === "click" ? (
        <div
          className="dropDown"
          onClick={() => onChangeVisible()}
          style={{ width: `${width}px`, ...style }}
        >
          {optionValue}
          {visible ? icons[0] : icons[1]}
          {visible && (
            <div className={`dropDownOption ${fixedPosition(position)}`}>
              {modelContent}
            </div>
          )}
        </div>
      ) : (
        <div
          className="dropDown"
          style={{ width: `${width}px`, ...style }}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          {optionValue}
          {visible ? icons[0] : icons[1]}
          {visible && (
            <div className={`dropDownOption ${fixedPosition(position)}`}>
              {modelContent}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DropDown;
