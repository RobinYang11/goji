import React from "react";
import "./index.less";
import classnames from "classnames";

type type = "primary" | "link" | "dashed" | "text" | "disable";
type shape = "round" | "circle";
type iconPos = "left" | "right";

interface IButton {
  type?: type | undefined;
  style?: React.CSSProperties | undefined;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
  disable?: boolean | undefined;
  shape?: shape | undefined;
  icon?: React.ReactNode | undefined;
  iconPos?: iconPos | undefined;
  herf?: string | undefined;
  onBtnClick?: () => void;
}

const Button: React.FC<IButton> = ({
  type,
  style,
  className,
  children,
  disable,
  shape,
  icon,
  iconPos,
  onBtnClick,
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
      disabled={disable}
      style={style}
    >
      {icon && iconPos === "left"} {children ? children : "BUTTON"}
      {icon && iconPos === "right"}
    </button>
  );
};

export default Button;
