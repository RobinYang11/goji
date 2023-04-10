import React from "react";
import "./index.less";
import classnames from "classnames";

//如何继承 DOMAttributes

type type = "primary" | "link" | "dashed" | "text" | "disable";
type shape = "round" | "circle";
type iconPos = "left" | "right";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  types?: type | undefined;
  style?: React.CSSProperties | undefined;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
  shape?: shape | undefined;
  icon?: React.ReactNode | undefined;
  iconPos?: iconPos | undefined;
  herf?: string | undefined;
  disabled?: boolean | undefined;
}

const Button = (props: IButton) => {
  const { types, style, className, children, shape, icon, iconPos, disabled } =
    props;

  const getBtnClass = () => {
    switch (types) {
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
      className={classnames(
        `${getBtnClass()} ${shapes()} ${className} ${
          disabled && "disableButton"
        }`
      )}
      style={{...style}}
      {...props}
    >
      {icon && iconPos === "left"} {children ? children : "BUTTON"}
      {icon && iconPos === "right"}
    </button>
  );
};

export default Button;
