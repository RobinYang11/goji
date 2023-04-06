import React from "react";
import "./index.less";
import classnames from "classnames";

//如果继承 DOMAttributes

type type = "primary" | "link" | "dashed" | "text" | "disable";
type shape = "round" | "circle";
type iconPos = "left" | "right";

type IButton = {
  type?: type | undefined;
  style?: React.CSSProperties | undefined;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
  disable?: boolean | undefined;
  shape?: shape | undefined;
  icon?: React.ReactNode | undefined;
  iconPos?: iconPos | undefined;
  herf?: string | undefined;
  form?: string | undefined;
  value?: string | undefined;
  name?: string | string;
  onBtnClick?: () => void;
  onDoubleClick?: () => void;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseMove?: () => void;
  onMouseOut?: () => void;
  onMouseOutCapture?: () => void;
  onMouseOver?: () => void;
  onMouseUp?: () => void;
  onMouseUpCapture?: () => void;
};

const Button: React.FC<IButton> = ({
  type,
  style,
  className,
  children,
  disable,
  shape,
  icon,
  iconPos,
  form,
  value,
  name,
  onBtnClick,
  onDoubleClick,
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onMouseOut,
  onMouseOutCapture,
  onMouseOver,
  onMouseUp,
  onMouseUpCapture,
}) => {
  const getBtnClass = () => {
    switch (type) {
      case "primary":
        return "primaryButton gojiButton";
      case "dashed":
        return "dashedButton gojiButton";
      case "link":
        return "linkButton gojiButton";
      case "text":
        return "textButton gojiButton";
      case "disable":
        return "disable gojiButton";
      default:
        return "gojiButton";
    }
  };

  const shapes = () => {
    switch (shape) {
      case "circle":
        return "circle";
      case "round":
        return "round";
      default:
        break;
    }
  };

  return (
    <button
      className={classnames(`${getBtnClass()} ${shapes()} ${className}`, {
        disableButton: disable,
      })}
      onClick={
        onBtnClick ? onBtnClick : () => console.log("Nothing is happing")
      }
      onDoubleClick={
        onDoubleClick ? onDoubleClick : () => console.log("Nothing is happing")
      }
      onMouseDown={
        onMouseDown ? onMouseDown : () => console.log("Nothing is happing")
      }
      onMouseEnter={
        onMouseEnter ? onMouseEnter : () => console.log("Nothing is ...")
      }
      disabled={disable}
      style={style}
      form={form}
      value={value}
      name={name}
    >
      {icon && iconPos === "left"} {children ? children : "BUTTON"}
      {icon && iconPos === "right"}
    </button>
  );
};

export default Button;
